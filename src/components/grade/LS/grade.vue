<template>
  <div class="grade-LS-wrapper">
    <div class="header-wrapper">
      <div class="box">
        <p class="icon">+</p>
        <p class="text">上传成绩</p>
      </div>
    </div>
    <yd-select :data="classList" title="选择班级" :selected="classSelect" @onchange="classChange"></yd-select>
    <loading v-if="loading"></loading>
    <div v-else class="exam-list-wrapper">
      <empty v-if="JSON.stringify(examList) === '{}'"></empty>
      <div v-else>
        <div class="exam-date-wrapper" v-for="(value, key, index) in examList">
          <div class="date-wrapper">
            <span class="date">考试时间：{{key}}</span>
          </div>
          <div class="exam-wrapper" v-for="exam in value" @click="goGradeDetail(exam)">
            <div class="info-wrapper">
              <div class="name">{{exam.name}}</div>
              <div class="description">{{exam.description}}</div>
            </div>
            <div class="state-wrapper">
              <div class="state waiting" v-if="exam.status=='0'">
                等待处理
              </div>
              <div class="state success" v-if="exam.status=='1'">
                处理完成
              </div>
              <div class="state error" v-if="exam.status=='2'">
                <span>处理失败</span>
              </div>
            </div>
            <div class="operation-wrapper">
              <div class="error-text" v-if="exam.status=='2'">
                点击查看失败原因
              </div>
              <div class="button-wrapper">
                <button class="button" @click.stop>删除</button>
                <button class="button" @click.stop>编辑</button>
              </div>
            </div>
          </div>
        </div>
        <div class="exam-tail-text">
          已显示全部成绩
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLSClassList} from 'api/class'
  import {getExamListByClass, getFailReason} from 'api/grade'
  import YdSelect from 'base/select/YDSelect'

  export default {
    name: 'grade',
    data() {
      return {
        classList: [],
        classSelect: {},
        examList: [],
        loading: false
      }
    },
    created() {
      this._getClassList()
    },
    methods: {
      classChange(item) {
        this.classSelect = item
        this.$router.replace(`/g_l/s/${this.classSelect.name}`)
        this._getExamList(this.classSelect.name)
      },
      goGradeDetail(exam) {
        if (exam.status === '1') {
          let routerParams = {
            params: {
              cid: exam.jx_class_id,
              id: exam.jx_exam_id
            },
            query: {
              name: exam.name,
              time: exam.testDate,
              atnow: exam.atnow,
              description: exam.description
            }
          }
          if (exam.score_type === 'leveltype') {
            this.$router.push({
              name: 'g_dd',
              ...routerParams
            })
          } else {
            this.$router.push({
              name: 'g_sd',
              ...routerParams
            })
          }
        } else if (exam.status === '2') {
          getFailReason(exam.jx_class_id, exam.jx_exam_id).then((res) => {
            this.$root.Dialog.alert({
              title: '拒绝处理原因',
              content: JSON.parse(res.data).remark,
              cancel() {
              }
            })
          })
        }
      },
      _getClassList() {
        getLSClassList()
          .then((res) => {
            res = res.data
            if (res.length > 0) {
              let arr = []
              let index = 0
              for (let i = 0; i < res.length; i++) {
                let obj = {}
                if (this.$route.params.cid === res[i].id) {
                  index = i
                }
                obj.name = res[i].id
                obj.value = `${res[i].orgname}  ${res[i].name}`
                arr.push(obj)
              }
              this.classList = arr
              this.classSelect = arr[index]
              this._getExamList(this.classSelect.name)
            }
          })
      },
      _getExamList(id) {
        this.loading = true
        getExamListByClass(id)
          .then((res) => {
            res = JSON.parse(res.data)
            console.log(res)
            let exam = {}
            let time = ''
            for (let i = 0; i < res.length; i++) {
              let date = new Date(res[i].testDate)
              date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
              if (time === date) {
                exam[date].push(res[i])
              } else {
                exam[date] = [res[i]]
              }
              time = date
            }
            this.examList = exam
            this.loading = false
          })
      }
    },
    deactivated() {
      this.$destroy()
    },
    components: {
      YdSelect
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/less/variable";
  @import "../../../common/less/mixin";

  .grade-LS-wrapper {
    .header-wrapper {
      padding: 12px 8px;
      background-color: #fff;
      box-sizing: border-box;
      .box {
        background-color: @mast-color;
        padding: 22px 0;
        line-height: 30px;
        border-radius: 5px;
        text-align: center;
        font-size: @font-size-medium-x;
        .icon {
          font-size: @font-size-large-x;
        }
      }
    }
    .exam-list-wrapper {
      .exam-date-wrapper {
        margin-bottom: 6px;
        padding: 0 8px;
        .date-wrapper {
          padding: 8px 0;
          .date {
            display: inline-block;
            padding: 0 8px;
            line-height: 20px;
            background-color: #84cbef;
            color: #fff;
            font-size: 12px;
            border-radius: 10px;
          }
        }
        .exam-wrapper {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 12px;
          padding: 10px;
          line-height: 1.5;
          border-radius: 4px;
          background-color: #fff;
          box-shadow: 0 2px 8px 0px @border-color;
          .info-wrapper {
            flex: 1;
            .name {
              font-size: @font-size-medium-x;
              font-weight: bold;
            }
            .description {
              .mul-row(2);
            }
          }
          .state-wrapper {
            flex: 0 0 100px;
            font-size: 12px;
            text-align: center;
            .waiting {
              color: @light-grey;
            }
            .success {
              color: @green-color;
            }
            .error {
              color: @light-grey;
            }
          }
          .operation-wrapper {
            flex: 0 0 100%;
          }
          .operation-wrapper {
            display: flex;
            margin-top: 8px;
            text-align: right;
            > div {
              flex: 1;
            }
            .error-text {
              color: @red-color;
              text-align: left;
              font-size: 12px;
            }
            .button {
              margin: 0 4px;
              padding: 4px 12px;
              border-radius: 14px;
              color: #4b7b7f;
              font-size: 13px;
              background-color: #e8e8e8;
              outline: none;
            }
          }
        }
      }
    }
    .exam-tail-text {
      text-align: center;
      color: #4b7b7f;
      margin-bottom: 22px;
    }
  }
</style>
