<template>
  <transition name='fade'>
    <div class="WXui-toast-wrapper" v-show="visible">
      <div class="WXui-content-wrapper">
        <div class="WXui-icon">
          <span class="WXui-text" :class="type" v-if="type==='success'">✔</span>
          <span class="WXui-text" :class="type" v-if="type==='warning'">¡</span>
          <span class="WXui-text" :class="type" v-if="type==='error'">✘</span>
        </div>
        <div class="WXui-text" v-html="message"></div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        position: '',
        type: ''
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .WXui-toast-wrapper {
    position: fixed;
    width: 100%;
    top: 0;
    background-color: #fff;
    z-index: 1000;
    box-shadow: 0 0 10px 0 rgba(7, 17, 27, 0.1);
    transition: transform .3s ease-in-out;
    .WXui-content-wrapper {
      display: flex;
      padding: 8px;
      box-sizing: border-box;
      .WXui-icon {
        flex: 0 0 40px;
        .WXui-text {
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          color: #ffffff;
          border-radius: 50%;
          text-align: center;
          &.success {
            background-color: #04BE02;
          }
          &.warning {
            background-color: yellow;
            border: 2px solid #fd4907;
            box-sizing: border-box;
            font-size: 12px;
            line-height: 15px;
            color: #fd4907;
          }
          &.error {
            background-color: #fd4907;
          }
        }
      }
      .WXui-text {
        line-height: 1.5;
        word-break: break-all;
      }
    }
    &.fade-enter, &.fade-leave-to {
      transform: translateY(-100%);
    }
    &.fade-leave, &.fade-enter-to {
      transform: translateY(0%);
    }
  }
</style>
