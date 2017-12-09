<template>
  <div>
    <div class="setup-main-wrapper">
      <div class="header-wrapper">
        <div class="photo-wrapper">
          <img class="photo" :src="info.userimgurl">
        </div>
        <div class="info-wrapper">
          <div class="name">
            <span class="text">{{info.name}}</span>
            <img class="vip" src="">
          </div>
          <div class="class-subject">
            <span class="class">早培三班</span>
            <span class="subject">语文老师</span>
          </div>
          <div class="class-detail">
            详细班级
          </div>
        </div>
        <div class="qrcode-wrapper">
          <img src="/src/static/qrcode.png" class="qrcode">
          <img src="/src/static/icon/icon-back.png" class="next">
        </div>
      </div>
      <div class="main-operation-wrapper">
        <div class="item-wrapper">
          <div class="icon-wrapper">
            <img class="icon" src="/src/static/menu/inform.png">
          </div>
          <div class="text">我的钱包</div>
        </div>
        <div class="item-wrapper">
          <div class="icon-wrapper">
            <img class="icon" src="/src/static/menu/inform.png">
          </div>
          <div class="text">我的订单</div>
        </div>
        <div class="item-wrapper">
          <div class="icon-wrapper">
            <img class="icon" src="/src/static/menu/inform.png">
          </div>
          <div class="text">切换角色</div>
        </div>
      </div>
      <div class="poster-wrapper">
        <img class="img" src="/src/static/poster/index.jpg">
      </div>
      <div class="list-wrapper">
        <div class="item-wrapper" @click="goBindRole">
          <div class="icon-wrapper">
            <img class="icon" src="/src/static/icon/icon-smile1.jpg">
          </div>
          <div class="name">快速绑定</div>
          <div class="addition">绑定角色</div>
          <div class="next">
            <img src="/src/static/icon/icon-back.png" class="icon">
          </div>
        </div>
        <div class="item-wrapper">
          <div class="icon-wrapper">
            <img class="icon" src="/src/static/icon/icon-smile1.jpg">
          </div>
          <div class="name">VIP会员</div>
          <div class="addition">开通会员</div>
          <div class="next">
            <img src="/src/static/icon/icon-back.png" class="icon">
          </div>
        </div>
        <div class="item-wrapper">
          <div class="icon-wrapper">
            <img class="icon" src="/src/static/icon/icon-smile1.jpg">
          </div>
          <div class="name">VIP会员</div>
          <div class="addition">开通会员</div>
          <div class="next">
            <img src="/src/static/icon/icon-back.png" class="icon">
          </div>
        </div>
        <div class="item-wrapper">
          <div class="icon-wrapper">
            <img class="icon" src="/src/static/icon/icon-smile1.jpg">
          </div>
          <div class="name">VIP会员</div>
          <div class="addition">开通会员</div>
          <div class="next">
            <img src="/src/static/icon/icon-back.png" class="icon">
          </div>
        </div>
        <div class="item-wrapper">
          <div class="icon-wrapper">
            <img class="icon" src="/src/static/icon/icon-smile1.jpg">
          </div>
          <div class="name">VIP会员</div>
          <div class="addition">开通会员</div>
          <div class="next">
            <img src="/src/static/icon/icon-back.png" class="icon">
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type='text/ecmascript-6'>
  import {mapGetters} from 'vuex'
  export default {
    methods: {
      goBindRole () {
        this.$router.push('/setup/bind/code')
      }
    },
    computed: {
      ...mapGetters(['info'])
    }
  }
</script>
<style lang='less' rel='stylesheet/less'>
  @import "../../common/less/variable";
  @import "../../common/less/mixin.less";

  .setup-main-wrapper {
    position: absolute;
    top: 0;
    bottom: 50px;
    width: 100%;
    overflow: scroll;
    .header-wrapper {
      display: flex;
      padding: 14px 8px;
      background-color: #fff;
      .border-1px();
      .photo-wrapper {
        flex: 0 0 60px;
        .photo {
          width: 54px;
          height: 54px;
          border-radius: 50%;
        }
      }
      .info-wrapper {
        flex: 1;
        line-height: 17px;
        .name {
          position: relative;
          top: -2px;
          .text {
            vertical-align: middle;
            font-size: @font-size-medium-x;
            font-weight: bold;
          }
          .img {
            height: 16px;
            width: 16px;
            vertical-align: middle;
          }
        }
        .class-subject {
          margin-top: 3px;
          font-size: 15px;
          color: @light-grey;
          font-weight: bold;
        }
        .class-detail {
          position: relative;
          top: 2px;
          color: @blue-color;
        }
      }
      .qrcode-wrapper {
        line-height: 56px;
        .qrcode {
          width: 32px;
          height: 32px;
          vertical-align: middle;
        }
        .next {
          width: 14px;
          transform: rotate(180deg);
          vertical-align: middle;
        }
      }
    }
    .main-operation-wrapper {
      display: flex;
      margin-top: 8px;
      padding: 12px;
      box-sizing: border-box;
      background-color: #fff;
      .item-wrapper {
        flex: 1;
        .icon-wrapper {
          margin: 0 auto;
          width: 32px;
          height: 32px;
          .icon {
            width: inherit;
            height: inherit;
          }
        }
        .text {
          margin-top: 6px;
          font-size: 12px;
          text-align: center;
        }
      }
    }
    .poster-wrapper {
      margin-top: 8px;
      .img {
        width: 100%;
      }
    }
    .list-wrapper {
      margin: 8px 0;
      background-color: #fff;
      .item-wrapper {
        display: flex;
        height: 42px;
        line-height: 42px;
        .icon-wrapper {
          flex: 0 0 40px;
          .icon {
            margin-left: 12px;
            width: 20px;
            vertical-align: middle;
          }
        }
        .name {
          flex: 1;
          font-size: 15px;
          .border-1px();
        }
        .addition {
          line-height: 44px;
          font-size: @font-size-small;
          color: @light-grey;
          .border-1px();

        }
        .next {
          .border-1px();
          flex: 0 0 30px;
          text-align: right;
          .icon {
            margin-right: 12px;
            width: 10px;
            vertical-align: middle;
            transform: rotate(180deg);
          }
        }
        &:last-of-type {
          .name, .addition, .next {
            .border-0px();
          }
        }
      }
    }
  }
</style>
