<template>
  <div class="grade-wrapper grade-score-detail-wrapper">
    <swiper-My class="swiper-box">
      <div class="inner">
      </div>
      <div class="inner">
      </div>
    </swiper-My>
    <swiper-my class="grade-swiper-wrapper">
      <div class="slider-wrapper first-slider">
        <div class="header-description">
          <div class="header-wrapper">
            <div class="info-wrapper">
              <p class="name">
                <span>成绩概览</span>
              </p>
              <p class="class-name">
                <span>{{baseInfo.className}} </span>
              </p>
            </div>
            <div class="quick-nav">
              <span class="text">
                快速导航
              </span>
              <span class="icon">></span>
            </div>
          </div>
          <div class="description-wrapper">
            <p class="title">
              {{baseInfo.name}}
            </p>
            <p class="description">
              {{baseInfo.description}}
            </p>
            <p class="time">
              {{parseInt(baseInfo.time)|date('yyyy-MM-dd hh:mm:ss')}}
            </p>
          </div>
        </div>
        <div class="first-table-wrapper">
          <div class="title-wrapper">
            <div class="box">班级人数：{{ffTable.count}}</div>
          </div>
          <div class="table-wrapper">
            <table class="table">
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
              <span>是否开启年级排名数据</span>
              <!--<mt-switch v-model="value"></mt-switch>-->
            </div>
          </div>
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
          <table class="table student-grade-table">
            <thead>
            <tr>
              <th ng-click="sortGrade('name')">姓名 <span class="icon-exchange"></span></th>
              <th v-for="(value,key,index) in fsTable.legend" v-if="value.active">
                <div class="name" v-html="value.name"></div>
                <div class="sub" v-html="value.subTitle"></div>
                <span>
                  <span class="icon-exchange"></span>
                </span>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="list in fsTable.data">
              <td ng-click="linkTostu(list.stu_id,list.name)">
                {{list.name}}
                <div class="gostu-wrapper">查看</div>
              </td>
              <td v-for="li in list.content" v-if="fsTable.legend[li.subject_id].active">
                <div>
                  {{li.score}}
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="slider-wrapper second-slider">22222222222</div>
      <div class="slider-wrapper third-slider">3333333333</div>
    </swiper-my>
  </div>
</template>

<script>
  import GradeHeader from '../header'
  import SwiperMy from 'base/swiper/swiper'
  import {firstTable} from 'api/grade'

  export default {
    name: 'score-detail',
    data() {
      return {
        baseInfo: {},
        ffTable: '',
        fsTable: ''
      }
    },
    created() {
      this.initDetail = {
        first: false,
        second: false,
        third: false
      }
      this.fsActiveCount = 4
      this._firstChartInit()
    },
    deactivated() {
      this.$destroy()
    },
    methods: {
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
      _firstChartInit() {
        this.initDetail.first = true
        console.log(this.$route)
        let param = {
          ...this.$route.params,
          atnow: this.$route.query.atnow
        }
        firstTable(param)
          .then((res) => {
            res = JSON.parse(res.data)
            console.log(res)
            this.baseInfo = {
              name: res.term,
              className: res.className,
              ...this.$route.query
            }
            this.ffTable = {
              count: res.count,
              data: res.subjectData
            }
            let fsData = res.data
            let fsScoreData = []
            let fsLegend = {}
            for (var i = 0; i < fsData.length; i++) {
              var student = {}
              student.name = fsData[i].name
              student.stu_id = fsData[i].stu_id
              student.content = []
              for (let j = 0; j < fsData[i].content.length; j++) {
                let pGrade = fsData[i].content[j]
                if (pGrade.subject_pid === '0') {
                  student.content.push(pGrade)
                  for (let k = 0; k < fsData[i].content.length; k++) {
                    if (fsData[i].content[k].subject_pid === pGrade.subject_id) {
                      let thisGrade = fsData[i].content[k]
                      thisGrade.subTitle = thisGrade.object
                      thisGrade.object = pGrade.object
                      thisGrade.class = true
                      student.content.push(thisGrade)
                    }
                  }
                }
                if (pGrade.subject_pid === '') {
                  student.content.push(pGrade)
                }
              }
              fsScoreData.push(student)
            }
            for (let i = 0; i < fsScoreData[0].content.length; i++) {
              fsLegend[fsScoreData[0].content[i].subject_id] = {
                name: fsScoreData[0].content[i].object,
                subTitle: '',
                active: false,
                main: false
              }
              if (i < 4) {
                fsLegend[fsScoreData[0].content[i].subject_id].active = true
              }
              if (fsScoreData[0].content[i].subject_pid === '0' || fsScoreData[0].content[i].subject_id === '') {
                fsLegend[fsScoreData[0].content[i].subject_id].main = true
              } else {
                fsLegend[fsScoreData[0].content[i].subject_id].subTitle = fsScoreData[0].content[i].subTitle
              }
            }
            this.fsTable = {
              legend: fsLegend,
              data: fsScoreData
            }
            console.log(this.fsTable)
          })
      }
    },
    components: {
      GradeHeader,
      SwiperMy
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../common/less/variable';
  @import '../../../common/less/mixin';

  .grade-score-detail-wrapper {
    position: absolute;
    top: 0;
    bottom: 50px;
    width: 100%;
    .grade-swiper-wrapper, slider-wrapper {
      height: 100%;
      overflow-y: scroll;
    }
    .header-description {
      .header-wrapper {
        display: flex;
        background-color: @blue-color;
        color: #fff;
        padding: 8px;
        box-sizing: border-box;
        .info-wrapper {
          flex: 1;
          line-height: 24px;
          .name {
            font-size: @font-size-medium-x;
            font-weight: bold;
          }
        }
        .quick-nav {
          flex: 0 0 86px;
          line-height: 48px;
          text-align: center;
          font-size: 0;
          .text {
            display: inline-block;
            margin-right: 4px;
            vertical-align: middle;
            font-size: @font-size-medium;
          }
          .icon {
            display: inline-block;
            font-size: 18px;
            vertical-align: middle;
            transform: rotate(90deg);
          }
        }
      }
      .description-wrapper {
        padding: 8px;
        background-color: #fff;
        text-indent: 2em;
        line-height: 1.6;
        .title {
          font-weight: bold;
        }
        .description {
          margin: 4px 0;
        }
        .time {
          color: @light-grey;
          text-align: right;
        }
      }
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
      .legend-wrapper {
        display: flex;
        flex-wrap: wrap;
        .box-wrapper {
          flex: 0 0 auto;
          padding: 8px;
          min-width: 25%;
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
    .table {
      border-collapse: collapse;
      border: 1px solid lavender;
      width: 100%;
      height: auto;
      background-color: white;
      table-layout: fixed;
      word-break: break-all;
      th, td {
        padding: 10px 0;
        line-height: 20px;
        max-width: 20%;
        text-align: center;
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
        vertical-align: middle;
      }
      th {
        padding: 12px 0;
        font-weight: bold;
        background-color: #FAFAFA;
        .name{
          font-weight: bold;
        }
        .sub{
          font-size: @font-size-small;
        }
      }
    }
  }

</style>
