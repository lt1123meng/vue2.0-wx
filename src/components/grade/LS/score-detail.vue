<template>
  <div class="grade-wrapper grade-score-detail-wrapper">
    <swiper-my ref="swiper" class="grade-swiper-wrapper" @slide-change-start="swiperChange">
      <div class="slider-wrapper first-slider">
        <grade-header name="成绩概览" :baseInfo="baseInfo" @navClick="sliderTo" :active="active"></grade-header>
        <div class="slider-content">
          <div class="first-table-wrapper">
            <div class="title-wrapper">
              <div class="box">班级人数：{{ffTable.count}}</div>
            </div>
            <div class="table-wrapper">
              <table class="table subject-grade-table">
                <tr>
                  <th>科目</th>
                  <th>平均分</th>
                  <th>优秀率</th>
                  <th>及格率</th>
                  <th>考试人数</th>
                </tr>
                <tr v-for="item in ffTable.data">
                  <td v-html="item.subject_name"></td>
                  <td v-html="item.avg_score"></td>
                  <td v-html="item.good_percent"></td>
                  <td v-html="item.pass_percent"></td>
                  <td v-html="item.examusernum"></td>
                </tr>
              </table>
            </div>
          </div>
          <div class="second-table-wrapper">
            <div class="title-wrapper">
              <div class="box">
                <span class="text">是否开启年级排名数据</span>
                <mt-switch class="switch-wrapper" v-model="gradeRank"></mt-switch>
              </div>
            </div>
            <div class="legend-outer-wrapper">
              <div class="title-wrapper">考试科目(最多可选<span class="tag">4</span>科)</div>
              <div class="legend-wrapper">
                <div class="box-wrapper" v-for="(value,key,index) in fsTable.legend">
                  <div class="box" :class="{'active':value.active,'main':value.main}" @click="fsLengthChoose(key)">
                    <div class="content">
                      <div class="name" v-html="value.name"></div>
                      <div class="sub" v-html="value.subTitle"></div>
                    </div>
                    <span class="tag" v-show="value.active">✔</span>
                  </div>
                </div>
              </div>
            </div>
            <table class="table student-grade-table">
              <thead>
              <tr>
                <th @click="sortGrade('name')">
                  <div class="text">姓名</div>
                  <div class="exchange">↑↓</div>
                </th>
                <th v-for="(value,key,index) in fsTable.legend"
                    @click="sortGrade(value.id)"
                    v-if="value.active">
                  <div class="text">
                    <div class="name" v-html="value.name"></div>
                    <div class="sub" v-html="value.subTitle"></div>
                  </div>
                  <div class="exchange">↑↓</div>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="list in fsTable.data">
                <td ng-click="linkTostu(list.stu_id,list.name)">
                  <p>{{list.name}}</p>
                  <div class="sea-wrapper">查看</div>
                </td>
                <td v-for="li in list.content" v-if="fsTable.legend[li.subject_id].active">
                  <div class="score">
                    {{li.score}}
                  </div>
                  <div v-if="li.score!=='N/A'">
                    <span class="ranking">{{li.mingci}}</span>
                    <span class="icon up" v-if="li.level>0">↑</span>
                    <span class="icon down" v-if="li.level<0">↓</span>
                    <span class="icon minus" v-if="li.level==0">-</span>
                    <span v-html="Math.abs(li.g_level)"
                          class="level"
                          :class="{'up':li.level>0,'down':li.level<0,'minus':li.level==0}"
                    >
                  </span>
                  </div>
                  <div v-if="li.score!=='N/A'&&gradeRank">
                    <span class="ranking">{{li.mingci}}</span>
                    <span class="icon up" v-if="li.g_level>0">↑</span>
                    <span class="icon down" v-if="li.g_level<0">↓</span>
                    <span class="icon minus" v-if="li.g_level==0">-</span>
                    <span v-html="Math.abs(li.g_level)"
                          class="level"
                          :class="{'up':li.g_level>0,'down':li.g_level<0,'minus':li.g_level==0}"
                    ></span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="slider-wrapper second-slider">
        <grade-header name="分数段分布图" :baseInfo="baseInfo" @navClick="sliderTo" :active="active"></grade-header>
        <div class="slider-content">
          <echarts :data="secondChart" height="1.1"></echarts>
        </div>
      </div>
      <div class="slider-wrapper third-slider">
        <grade-header name="班级比较" :baseInfo="baseInfo" @navClick="sliderTo" :active="active"></grade-header>
        <div class="slider-content">
          <yd-select
            :data="thirdSubjectList"
            :selected="thirdSubject"
            title="选择班级"
            @onchange="subjectChange">
          </yd-select>
          <echarts :data="thirdChart" height="1.1"></echarts>
        </div>
      </div>
    </swiper-my>
  </div>
</template>
<script>
  import echarts from 'base/echart/echart'
  import YdSelect from 'base/select/YDSelect'
  import GradeHeader from '../header'
  import SwiperMy from 'base/swiper/swiper'
  import {FormatLegendData, ScortData} from '../grade'
  import {LSfirstTable, LSsecondBarScore, LSthirdSUbject, LSthirdClass, LSthirdBarChart} from 'api/grade'

  export default {
    name: 'score-detail',
    data() {
      return {
        active: '1',
        baseInfo: {},
        ffTable: '',
        fsTable: '',
        gradeRank: false,
        secondChart: {},
        thirdClassList: [],
        thirdSubjectList: [],
        thirdChart: '',
        thirdSubject: {}
      }
    },
    created() {
      this.initDetail = {
        first: false,
        second: false,
        third: false
      }
      this.soreSubject = ''
      this.httpParams = {}
      this.fsActiveCount = 4
      this._firstChartInit()
    },
    deactivated() {
      this.$destroy()
    },
    methods: {
      swiperChange(index) {
        switch (index) {
          case 1:
            this._firstChartInit()
            break
          case 2:
            this._secondChartInit()
            break
          case 3:
            this._thirdChartInit()
            break
        }
      },
      sliderTo(index) {
        this.active = index
        this.$refs.swiper.sliderTo(parseInt(index))
      },
      fsLengthChoose(id) {
        if (this.fsTable.legend[id].active) {
          this.fsTable.legend[id].active = false
          this.fsActiveCount--
        } else {
          if (this.fsActiveCount === 4) {
            this.$root.Dialog.alert({
              title: '系统消息',
              content: '最对只能选择4科',
              ok() {
              },
              cancel() {
              }
            })
          } else {
            this.fsActiveCount++
            this.fsTable.legend[id].active = true
          }
        }
      },
      sortGrade(subject) {
        this.fsTable.data = ScortData(this.fsTable.data, subject, this.soreSubject)
        if (this.soreSubject === '' || this.soreSubject !== subject) {
          this.soreSubject = subject
        } else {
          this.soreSubject = ''
        }
      },
      subjectChange(item) {
        this.thirdSubject = item
      },
      _firstChartInit() {
        if (this.initDetail.first) return
        this.initDetail.first = true
        this.httpParams = {
          ...this.$route.params,
          atnow: this.$route.query.atnow
        }
        LSfirstTable(this.httpParams)
          .then((res) => {
            res = JSON.parse(res.data)
            this.baseInfo = {
              name: res.term,
              className: res.className,
              ...this.$route.query
            }
            this.ffTable = {
              count: res.count,
              data: res.subjectData
            }
            this.fsTable = FormatLegendData(res.data)
            this.fsActiveCount = this.fsTable.data.length
          })
      },
      _secondChartInit() {
        if (this.initDetail.second) return
        this.initDetail.second = true
        LSsecondBarScore(this.httpParams)
          .then((res) => {
            res = res.data
            let data = JSON.parse(res)
            let scoreoption = {
              title: {
                text: '分数段分布图'
              },
              series: [],
              legend: {
                data: data.name
              },
              yAxis: [
                {
                  name: '人数(人)',
                  type: 'value'
                }
              ],
              xAxis: [
                {
                  name: '科目',
                  data: data.object
                }
              ]
            }
            for (var i = 0; i < data.name.length; i++) {
              scoreoption.series.push({
                name: data.name[i],
                type: 'bar',
                stack: '总量',
                itemStyle: {normal: {barBorderRadius: 8}},
                data: data.value[i]
              })
            }
            this.secondChart = scoreoption
          })
      },
      _thirdChartInit() {
        if (this.initDetail.third) return
        this.initDetail.third = true
        LSthirdClass(this.httpParams).then((res) => {
          res = res.data
          this.thirdClassList = JSON.parse(res)
        })
        LSthirdSUbject(this.httpParams).then((res) => {
          res = JSON.parse(res.data)
          if (res.length > 0) {
            for (let i = 0; i < res.length; i++) {
              [res[i].name, res[i].value] = [res[i].value, res[i].name]
            }
            this.thirdSubject = res[0]
            this.thirdSubjectList = res
          }
        })
        LSthirdBarChart(this.httpParams).then((res) => {
          res = JSON.parse(res.data)
          var options = {
            legend: {
              data: res.legend
            },
            xAxis: [{
              data: ['优秀率', '及格率']
            }],
            yAxis: [{
              type: 'value'
            }],
            series: []
          }
          for (var i = 0; i < res.legend.length; i++) {
            options.series.push({
              name: res.legend[i],
              type: 'bar',
              itemStyle: {normal: {barBorderRadius: 8}},
              data: res.seriesData[i]
            })
          }
          this.thirdChart = options
        })
      }
    },
    components: {
      GradeHeader,
      SwiperMy,
      echarts,
      YdSelect
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../grade';
  @import '../../../common/less/variable';
  @import '../../../common/less/mixin';

  .grade-score-detail-wrapper {
    position: absolute;
    top: 0;
    bottom: 0px;
    padding-bottom: 50px;
    width: 100%;
    .grade-swiper-wrapper, slider-wrapper {
      position: relative;
      height: 100%;
      overflow-y: scroll;
    }
    .first-table-wrapper {
      margin-top: 8px;
      background-color: #fff;
      .title-wrapper {
        padding: 8px 0 8px 8px;
        .box {
          padding-right: 8px;
          line-height: 38px;
          text-align: right;
          font-weight: bold;
          .border-1px()
        }
      }
    }
    .second-table-wrapper {
      margin-top: 8px;
      background-color: #fff;
      .title-wrapper {
        .first-table-wrapper .title-wrapper();
        .switch-wrapper {
          display: inline-block;
          vertical-align: top;
        }
      }
      .legend-outer-wrapper {
        .title-wrapper{
          padding: 0 12px;
          box-sizing: border-box;
          line-height: 30px;
          .tag{
            color: @red-color;
          }
        }
        .legend-wrapper {
          display: flex;
          flex-wrap: wrap;
          .box-wrapper {
            flex: 0 0 auto;
            padding: 8px;
            min-width: 25%;
            max-width: 100%;
            box-sizing: border-box;
            word-break: keep-all;
            white-space: nowrap;
            .box {
              position: relative;
              height: 50px;
              padding: 0 6px 0 6px;
              line-height: 20px;
              box-sizing: border-box;
              background-color: lighten(@orange-color, 40%);
              text-align: center;
              box-sizing: border-box;
              box-shadow: 0 0 8px 0 rgba(7, 17, 27, 0.2);
              &.active {
                border: 1px solid @blue-color;
              }
              &.main {
                background-color: lighten(@orange-color, 30%);
              }
              .content {
                position: relative;
                z-index: 1;
                .no-wrap();
                .sub {
                  font-size: @font-size-small;
                  color: @light-grey;
                }
              }
              .tag {
                position: absolute;
                bottom: 0;
                right: 0;
                height: 16px;
                line-height: 16px;
                width: 22px;
                background-color: @blue-color;
                color: #fff;
              }
            }
          }
        }
      }
      .student-grade-table {
        .score {
          font-weight: bold;
        }
        .up {
          color: @green-color;
        }
        .down {
          color: @red-color;
        }
        .minus {
          color: @orange-color;
        }
      }
    }
  }

</style>
