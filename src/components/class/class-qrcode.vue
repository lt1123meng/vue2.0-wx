<template>
  <div class="class-qrcode-wrapper" @click="back">
    <div class="qrcode-inner-wrapper" @click.stop>
      <loading v-if="!img"></loading>
      <div v-show="img">
        <div class="qrcode-header-wrapper">
          <div class="photo-wrapper">
            <img @load="loaded" class="photo" :src="info.headimgurl">
          </div>
          <div class="info-wrapper">
            <div class="class-name">{{qrcode.classname}}</div>
            <div class="name">{{info.nickname}}({{qrcode.rolename}})</div>
          </div>
        </div>
        <div class="qrcode-wrapper">
          <img class="img" :src="qrcode.url">
        </div>
        <div class="qrcode-tail-wrapper">
          <div class="text">
            扫一扫二维码，加入班级
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getClassQRCode} from 'api/class'

  export default {
    name: 'class-qrcode',
    data() {
      return {
        qrcode: '',
        img: false
      }
    },
    created() {
      this._initQRCode(this.$route.params.id)
    },
    deactivated() {
      this.$destroy()
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      loaded() {
        this.img = true
      },
      _initQRCode(id) {
        getClassQRCode(id)
          .then((res) => {
            res = res.data
            this.qrcode = res.msg
          })
      }
    },
    computed: {
      ...mapGetters(['info'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/less/variable";

  .class-qrcode-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(7, 17, 27, 0.5);
    z-index: 9;
    transition: all .3s ease-in-out;
    .qrcode-inner-wrapper {
      position: relative;
      top: 50%;
      height: 346px;
      margin: -173px auto 0;
      padding: 12px;
      max-width: 260px;
      width: 80%;
      background-color: #fff;
      border-radius: 5px;
      box-sizing: border-box;
      transition: all .3s ease-in-out;
      .qrcode-header-wrapper {
        display: flex;
        .photo-wrapper {
          flex: 0 0 60px;
          .photo {
            width: 54px;
            border-radius: 50%;
          }
        }
        .info-wrapper {
          flex: 1;
          line-height: 20px;
          padding: 8px 0px;
          .class-name {
            font-size: @font-size-medium-x;
            font-family: 'SimHei';
            font-weight: bold;
          }
          .name {
            font-size: 13px;
            color: @light-grey;
          }
        }
      }
      .qrcode-wrapper {
        text-align: center;
        .img {
          margin: 0 auto;
          width: 100%;
        }
      }
      .qrcode-tail-wrapper {
        padding: 6px 0;
        .text {
          font-size: @font-size-small;
          color: @light-grey;
          text-align: center;
        }
      }
    }
    &.change-enter, &.change-leave-to {
      background-color: rgba(7, 17, 27, 0);
      .qrcode-inner-wrapper {
        opacity: 0;
        transform: scale(0.3);
      }
    }

    &.change-leave, &.change-enter-to {
      background-color: rgba(7, 17, 27, 0.5);
      .qrcode-inner-wrapper {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

</style>
