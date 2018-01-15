<template>
  <div class="grade-wrapper LS-degree-detail-wrapper">
    <grade-header name="成绩概览" :baseInfo="baseInfo"></grade-header>
    <div class="table-wrapper">
      <div class="legend-outer-wrapper">
        <div class="title-wrapper">考试科目(最多可选<span class="tag">4</span>科)</div>
        <div class="legend-wrapper">
          <div class="box-wrapper" v-for="(value,key,index) in tableData.legend">
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
          <th ng-click="sortGrade('name')" @click="sortGrade('name')">
            <div class="text">姓名</div>
            <div class="exchange">↑↓</div>
          </th>
          <th v-for="(value,key,index) in tableData.legend"
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
        <tr v-for="list in tableData.data">
          <td ng-click="linkTostu(list.stu_id,list.name)">
            <p>{{list.name}}</p>
            <div class="sea-wrapper">查看</div>
          </td>
          <td v-for="li in list.content" v-if="tableData.legend[li.subject_id].active">
            <div class="score">
              {{li.score}}
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import GradeHeader from '../header'
  import {FormatLegendData, ScortData} from '../grade'
  import {LSDegree} from 'api/grade'

  export default {
    name: 'degree-detail',
    data() {
      return {
        tableData: {},
        baseInfo: {}
      }
    },
    created() {
      this._initData(this.$route.params)
      this.activeCount = 4
      this.soreSubject = ''
    },
    methods: {
      fsLengthChoose(id) {
        if (this.tableData.legend[id].active) {
          this.tableData.legend[id].active = false
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
            this.activeCount++
            this.tableData.legend[id].active = true
          }
        }
      },
      sortGrade(subject) {
        this.tableData.data = ScortData(this.tableData.data, subject, this.soreSubject, true)
        if (this.soreSubject === '' || this.soreSubject !== subject) {
          this.soreSubject = subject
        } else {
          this.soreSubject = ''
        }
      },
      _initData(params) {
        LSDegree(params).then((res) => {
          res = JSON.parse(res.data)
          this.baseInfo = {
            name: res.term,
            ...this.$route.query
          }
          this.tableData = FormatLegendData(res.data)
          this.activeCount = this.tableData.data.length
        })
      }
    },
    components: {
      GradeHeader
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../grade";
  @import '../../../common/less/variable';
  @import '../../../common/less/mixin';

  .LS-degree-detail-wrapper {
  }

</style>
