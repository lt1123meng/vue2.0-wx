<template>
  <div class="home-jz-wrapper">
    <div class="search-wrapper">
      <div class="schedule-box" @click="calenderClick">
        <img class="icon" v-lazy="'/src/static/icon/icon-list.png'">
      </div>
      <div class="search-box">
        <div class="inner-box">
          <img src="" alt="">
          <span class="text">搜索</span>
        </div>
      </div>
      <div class="me-box" @click="chooseRole">
        <img class="icon" v-lazy="'/src/static/icon/icon-user.png'">
      </div>
    </div>
    <div class="poster-wrapper">
      <img v-lazy="'/src/static/poster/index.jpg'" width="100%">
    </div>
    <div class="student-wrapper">
      <div class="box" @click="goChangeStudent">
        <div class="name">当前学生：{{vippar?vippar[student].stuName:''}}</div>
        <div class="class">{{vippar?vippar[student].className:''}}</div>
      </div>
    </div>
    <div class="common-data-wrapper">
      <div class="item-wrapper">
        <div class="operate-wrapper">
          <span class="tag"></span>
          <span class="tag"></span>
          <span class="tag"></span>
        </div>
        <div class="content-wrapper">
          <div class="title-time">
            <div class="title">班级表现</div>
            <div class="time">本周 (09-17~09.23)</div>
          </div>
          <div class="blank"></div>
          <div class="result-wrapper">
            <div class="icon-wrapper">
              <img src="/src/static/icon/icon-smile1.jpg" class="icon">
            </div>
            <div class="text">
              表扬10次/批评31次
            </div>
          </div>
        </div>
        <div class="more-wrapper">查看更多</div>
      </div>
      <div class="item-wrapper">
        <div class="operate-wrapper">
          <span class="tag"></span>
          <span class="tag"></span>
          <span class="tag"></span>
        </div>
        <div class="content-wrapper">
          <div class="title-time">
            <div class="title">班级表现</div>
            <div class="time">本周 (09-17~09.23)</div>
          </div>
          <div class="blank"></div>
          <div class="result-wrapper">
            <div class="icon-wrapper">
              <img src="/src/static/icon/icon-smile3.jpg" class="icon">
            </div>
            <div class="text">
              表扬10次/批评31次
            </div>
          </div>
        </div>
        <div class="more-wrapper">查看更多</div>
      </div>
      <div class="item-wrapper">
        <div class="operate-wrapper">
          <span class="tag"></span>
          <span class="tag"></span>
          <span class="tag"></span>
        </div>
        <div class="content-wrapper">
          <div class="title-time">
            <div class="title">班级表现</div>
            <div class="time">本周 (09-17~09.23)</div>
          </div>
          <div class="blank"></div>
          <div class="result-wrapper">
            <div class="icon-wrapper">
              <img src="/src/static/icon/icon-smile2.jpg" class="icon">
            </div>
            <div class="text">
              表扬10次/批评31次
            </div>
          </div>
        </div>
        <div class="more-wrapper">查看更多</div>
      </div>
    </div>
    <div class="news-wrapper">
      <div class="icon-wrapper">
        <div class="box">
          <span class="icon">!</span>
        </div>
      </div>
      <div class="content-wrapper">
        您收到一条新消息，<span class="click">点击查看</span>
      </div>
    </div>
    <div class="menu-component-wrapper">
      <menu-list :menu="menu"></menu-list>
    </div>
    <div class="headline-wrapper">
      <div class="title-wrapper">
        <div class="text">园钉头条</div>
      </div>
      <div class="content-wrapper">
        <div class="item-wrapper">
          <div class="icon-wrapper">
            <span class="icon">热门</span>
          </div>
          <div class="text">骄傲了解放路可骄傲的卡夫卡啦</div>
        </div>
        <div class="item-wrapper">
          <div class="icon-wrapper">
            <span class="icon">热门</span>
          </div>
          <div class="text">骄傲了解放路可骄傲的卡夫卡啦</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import MenuList from 'base/menu-list/menu-list'
  import {MenusJZ} from 'base/data'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        info: {},
        centerShow: false,
        scroll: '',
        calendarShow: false,
        menu: MenusJZ
      }
    },
    created: function () {
    },
    computed: {
      ...mapGetters(['ratio', 'crid', 'role', 'student', 'vippar'])
    },
    methods: {
      calenderClick () {
        this.$emit('calenderClick')
      },
      chooseRole () {
        if (this.role.length === 2) {
          this.$router.push('/home/role')
        }
      },
      goChangeStudent () {
        if (this.vippar.length < 2) return
        this.$router.push('/home/student')
      }
    },
    components: {
      MenuList
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/variable";
  @import "../../common/less/mixin";

  .home-jz-wrapper {
    position: absolute;
    top: 0px;
    bottom: 50px;
    width: 100%;
    overflow: scroll;
    padding-top: 38px;
    .search-wrapper {
      .border-1px();
      position: fixed;
      top: 0;
      width: 100%;
      display: flex;
      display: -webkit-flex;
      text-align: center;
      height: 38px;
      line-height: 38px;
      background-color: #fff;
      z-index: 1;
      .schedule-box {
        flex: 0 0 40px;
        -webkit-flex: 0 0 40px;
        .icon {
          width: 16px;
          vertical-align: sub;;
        }
      }
      .search-box {
        flex: 1;
        -webkit-flex: 1;
        padding: 6px 0;
        box-sizing: border-box;
        .inner-box {
          border-radius: 4px;
          height: 26px;
          line-height: 28px;
          background-color: rgba(7, 17, 27, 0.15);
        }
      }
      .me-box {
        flex: 0 0 40px;
        -webkit-flex: 0 0 40px;
        .icon {
          width: 16px;
          vertical-align: sub;
        }
      }
    }
    .student-wrapper {
      .box {
        display: flex;
        padding: 0 12px;
        box-sizing: border-box;
        line-height: 32px;
        background-color: #fff;
        color: @light-grey;
        .name {
          flex: 1px;
        }
        .class {
          flex: 1;
          text-align: right;
        }
      }
    }
    .common-data-wrapper {
      padding: 16px 12px 0 12px;
      box-sizing: border-box;
      .item-wrapper {
        position: relative;
        margin-bottom: 12px;
        padding: 26px 8px 0 8px;
        border-radius: 4px;
        overflow: hidden;
        background-color: #fff;
        .operate-wrapper {
          position: absolute;
          top: 6px;
          right: 10px;
          .tag {
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: @light-grey;
          }
        }
        .content-wrapper {
          display: flex;
          .border-1px();
          .title-time {
            flex: 0;
            .title {
              height: 32px;
              font-size: @font-size-medium-x;
              font-weight: bold;
            }
            .time {
              margin: 22px 0 16px 0;
              white-space: nowrap;
              color: darken(@light-grey, 20%);
            }
          }
          .blank {
            flex: 1;
          }
          .result-wrapper {
            flex: 0;
            .icon-wrapper {
              margin: 0 auto;
              width: 32px;
              height: 32px;
              .icon {
                width: inherit;
                height: inherit;
                vertical-align: middle;
              }
            }
            .text {
              margin: 22px 0 16px 0;
              white-space: nowrap;
              color: darken(@light-grey, 20%);
            }
          }
        }
        .more-wrapper {
          height: 30px;
          line-height: 30px;
          color: @light-grey;
          text-align: center;
          font-size: 13px;
        }
      }
    }
    .news-wrapper {
      display: flex;
      padding: 0 8px;
      height: 32px;
      line-height: 32px;
      box-sizing: border-box;
      background-color: lighten(@orange-color, 25%);
      .icon-wrapper {
        flex: 0 0 40px;
        .box {
          margin: 6px auto;
          width: 18px;
          height: 18px;
          line-height: 18px;
          border-radius: 50%;
          text-align: center;
          font-size: 0;
          background-color: #e69f09;
          color: #fff;
          .icon {
            display: inline-block;
            font-size: @font-size-medium-x;
            transform: scaleX(1.4);
          }
        }
      }
      .content-wrapper {
        color: darken(@orange-color, 10%);
        .click {
          color: @blue-color;
        }
      }

    }
    .menu-component-wrapper {
      .border-1px();
    }
    .headline-wrapper {
      display: flex;
      margin-bottom: 26px;
      padding: 12px;
      box-sizing: border-box;
      background-color: #fff;
      .title-wrapper {
        padding: 0 6px;
        flex: 0 0 46px;
        .text {
          padding-right: 8px;
          font-size: @font-size-large;
          font-family: STHupo, Weibei SC, YuanTi, STXingKai, STLiti;
        }
      }
      .content-wrapper {
        flex: 1;
        .item-wrapper {
          display: flex;
          .icon-wrapper {
            flex: 0 0 40px;
            text-align: center;
            font-size: 0;
            .icon {
              display: inline-block;
              padding: 2px 4px;
              border-radius: 2px;
              border: 1px solid @orange-color;
              color: @orange-color;
              font-size: @font-size-small;
              transform: scale(0.9);
            }
          }
          .text {
            border: 1px solid #fff;
            padding: 1px 0;
            margin-bottom: 3px;
            &:last-of-type {
              margin-bottom: 0;
            }
          }
        }
      }

    }
  }
</style>
