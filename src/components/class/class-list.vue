<template>
  <div class="class-list-wrapper">
    <div class="inner-wrapper">
      <div v-if="classList===''">
        <loading></loading>
      </div>
      <div v-else-if="classList.length===0">
        <loading></loading>
      </div>
      <div class="class-item" v-for="item in classList" v-else @click="goClassDetail(item)">
        <div class="info-code">
          <div class="info">
            <div class="class-name">{{item.name}}</div>
            <div class="organize">{{item.orgname}}</div>
            <div class="subject">语文老师</div>
          </div>
          <div class="code">
            <div class="qr-code" @click.stop="goClassQrcode(item)">
              <img class="qr" src="/src/static/qrcode.png">
            </div>
            <div class="text">
              标识：{{item.code}}
            </div>
          </div>
        </div>
        <div class="operate-wrapper">
          <div class="all">
            <span>已绑</span>
            <span v-if="item.teachernum!==0">老师{{item.teachernum}}人</span>
            <span v-if="item.parentnum!==0">家长{{item.parentnum}}人</span>
            <span v-if="item.stunum!==0">学生{{item.stunum}}人</span>
          </div>
          <div class="operate">
            <button class="modify">修改</button>
            <button class="exit" @click.stop="quitClass">退出</button>
          </div>
        </div>
      </div>
    </div>
    <transition name="change">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getClass} from 'api/class'

  export default {
    data() {
      return {
        classList: ''
      }
    },
    created() {
      this._initClass()
    },
    methods: {
      goClassDetail(list) {
        this.$router.push(`/c_d/${list.id}`)
      },
      goClassQrcode(list) {
        this.$router.push(`/class/list/qrcode/${list.id}`)
      },
      quitClass() {
        this.$root.Dialog.confirm({
          title: '您确定要退出吗？',
          content: '退出之后无法恢复，退出之后无法恢复，退出之后无法恢复',
          ok() {
          },
          cancel() {
          }
        })
        this.$root.Dialog.confirm({
          title: '您确定要退出吗？',
          content: '退出之后无法恢复，退出之后无法恢复，退出之后无法恢复',
          ok() {
          },
          cancel() {
          }
        })
      },
      _initClass() {
        getClass().then((response) => {
          this.classList = response.data
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import '../../common/less/variable';
  @import '../../common/less/mixin';

  .class-list-wrapper {
    position: absolute;
    top: 0px;
    padding-top: 56px;
    bottom: 50px;
    width: 100%;
    .inner-wrapper {
      position: absolute;
      top: 56px;
      bottom: 0px;
      width: 100%;
      overflow: scroll;
      .class-item {
        margin-bottom: 10px;
        padding: 8px;
        background-color: #fff;
        .info-code {
          display: flex;
          margin-bottom: 16px;
          .info {
            flex: 1;
            line-height: 20px;
            .class-name {
              font-size: @font-size-medium-x;
              font-weight: bold;
            }
            .organize, .subject {
              font-size: 15px;
              color: @light-grey;
            }
          }
          .code {
            flex: 0 0 110px;
            text-align: center;
            .qr-code {
              margin: 0 auto;
              width: 36px;
              height: 36px;
              .qr {
                width: inherit;
                height: inherit;
              }
            }
            .text {
              margin: 4px 0 8px 0;
              color: @light-grey;
            }
          }
        }
        .operate-wrapper {
          display: flex;
          .all {
            flex: 1;
            line-height: 24px;
            font-size: @font-size-small;
            color: @light-grey;
          }
          .operate {
            flex: 0 0 110px;
            .modify {
              .button-bg(@blue-color);
              height: 24px;
              line-height: 24px;
              border-radius: 4px;
            }
            .exit {
              .button-bg(@light-grey);
              height: 24px;
              line-height: 24px;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
</style>
