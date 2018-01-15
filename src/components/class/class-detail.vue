<template>
  <div class="class-detail-wrapper" ref="wrapper">
    <audited ref="audited" :audited="audited" @checkList="getCheckList"></audited>
    <div class="tail-wrapper" v-if="audited.length!==0">
      <div class="button refuse">
        拒绝({{checkList.length}})
      </div>
      <div class="button pass">
        通过({{checkList.length}})
      </div>
      <div class="content"></div>
    </div>
    <div class="class-teacher-wrapper">
      <div class="text">任课教师</div>
      <div class="next">
        <img src="/src/static/icon/icon-back.png">
      </div>
    </div>
    <div class="class-student-wrapper empty" v-if="studentList.length===0">
      <empty title="该班级暂无学生绑定"></empty>
      <p class="share">分享二维码，邀请学生/家长加入</p>
    </div>
    <div class="class-student-wrapper" ref="stu" v-else>
      <div class="box-wrapper" :ref="box.id" :id="box.id" v-for="box in studentList">
        <div class="title">{{box.id}}</div>
        <div class="student-wrapper">
          <div class="student" v-for="student in box.content">
            <div class="photo-wrapper">
              <img class="photo" :src="student.headimgurl">
            </div>
            <div class="content">
              <div class="name">{{student.name}}</div>
              <div class="name">{{student.classcode}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-wrapper" ref="navigate" v-if="studentList.length!==0">
      <div class="space"></div>
      <div class="nav" data-id="top" @click="jumpPosition">↑</div>
      <div class="nav" v-for="box in studentList" @click="jumpPosition" :data-id="box.id">{{box.id}}</div>
      <div class="space"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Audited from 'base/wait-bind/wait-bind'
  import Empty from 'base/empty/empty'
  import {getAuditedList} from 'api/bind'
  import {getClassStu} from 'api/class'

  export default {
    data() {
      return {
        audited: [],
        checkList: [],
        checkAll: false,
        studentList: []
      }
    },
    created() {
      this._getAuditedList()
      this._getClassStu()
    },
    deactivated() {
      this.$destroy()
    },
    methods: {
      check() {
        this.$refs.audited.check()
      },
      getCheckList(list, tag) {
        this.checkList = list
        this.checkAll = tag
      },
      jumpPosition(thisDom) {
        let id = thisDom.target.dataset.id
        let targetDom = 0
        if (id !== 'top') {
          targetDom = this.$refs[thisDom.target.dataset.id][0].offsetTop
        }
        this.$refs.wrapper.scrollTop = targetDom
      },
      _getClassStu() {
        getClassStu(this.$route.params.id)
          .then((res) => {
            this.studentList = res.data
            this._initDom()
          })
      },
      _getAuditedList() {
        getAuditedList(this.$route.params.id)
          .then((res) => {
            res = res.data
            if (res.length === 0) {
              this.audited = []
              return
            }
            let oneClass = {
              className: res[0].classname,
              auditList: res
            }
            this.audited = [oneClass]
          })
      },
      _initDom() {
        this.$nextTick(() => {
          let contentHeight = window.innerHeight - 50
          if (!this.$refs.navigate) return
          let navChildren = this.$refs.navigate.children
          let height = Math.max(15, Math.min(contentHeight / (navChildren.length - 2), 32))
          for (let i = 1; i < navChildren.length - 1; i++) {
            navChildren[i].style.flex = `0 0 ${height}px`
          }
        })
      }
    },
    components: {
      Audited,
      Empty
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import '../../common/less/variable';

  .class-detail-wrapper {
    position: absolute;
    top: 0;
    bottom: 50px;
    width: 100%;
    overflow: scroll;
    .wait-bind {
      .audited-list {
        padding-right: 32px;
      }
    }
    .tail-wrapper {
      margin-top: -11px;
      display: flex;
      height: 50px;
      line-height: 50px;
      width: 100%;
      background: #fff;
      .check {
        flex: 0 0 66px;
        font-size: 0;
        text-align: center;
        .icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 19px;
          border: 1px solid @light-grey;
          border-radius: 50%;
          box-sizing: border-box;
          vertical-align: middle;
          font-size: 12px;
          &.active {
            border: 1px solid @blue-color;
            background-color: @blue-color;
            color: #fff;
            &:before {
              content: '✔';
            }
          }
        }
        .text {
          display: inline-block;
          margin-left: 4px;
          height: 20px;
          line-height: 20px;
          vertical-align: middle;
          font-size: 13px;
          color: @light-grey;
        }
      }
      .content {
        flex: 1;
      }
      .button {
        flex: 0 0 88px;
        width: 100%;
        height: 100%;
        line-height: 50px;
        color: #fff;
        border-radius: 0;
        background: linear-gradient(to right, #9fd7f2, #1c95d3);
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        &.refuse {
          background: linear-gradient(to right, #f2c59f, #d3661c);
        }
      }
    }
    .class-teacher-wrapper {
      display: flex;
      margin: 8px 0;
      height: 60px;
      line-height: 60px;
      background-color: #fff;
      .text {
        flex: 1;
        padding: 0 12px;
        font-size: 16px;
        box-sizing: border-box;
      }
      .next {
        flex: 0 0 64px;
        font-size: 0;
        img {
          width: 18px;
          vertical-align: middle;
          transform: rotate(180deg);
        }
      }
    }
    .class-student-wrapper {
      margin-bottom: 22px;
      .box-wrapper {
        .title {
          padding: 0 12px;
          height: 30px;
          line-height: 30px;
          color: #555;
        }
        .student-wrapper {
          padding: 0 32px 0 8px;
          background-color: #fff;
          box-sizing: border-box;
          .student {
            display: flex;
            height: 56px;
            padding: 8px 0;
            box-sizing: border-box;
            .photo-wrapper {
              flex: 0 0 52px;
              .photo {
                width: 40px;
                height: 40px;
              }
            }
            .content {
              flex: 1;
              line-height: 20px;
            }
          }
        }
      }
      &.empty {
        padding: 5% 0;
        text-align: center;
        background-color: #fff;
        .text {
          color: #6d6d6d;
        }
        .share {
          margin: 22px 0;
          color: @blue-color;
        }
      }
    }
    .nav-wrapper {
      position: fixed;
      right: 0;
      top: 0;
      bottom: 50px;
      width: 40px;
      display: flex;
      flex-direction: column;
      .space {
        flex: 1;
      }
      .nav {
        flex: 0 0 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        font-family: 'SimHei';
      }
    }
  }
</style>
