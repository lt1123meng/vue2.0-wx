<template>
  <transition name="fade">
    <div class="Liu-mast" v-show="visible">
      <div class="Lui-dialog-wrapper">
        <div class="Lui-title" v-html="title"></div>
        <div class="Lui-content" v-html="content"></div>
        <div class="Lui-tail">
          <button class="confirm" @click="confirmEvent">确定</button>
          <button class="cancel" v-if="cancelShow==='true'" @click="cancelEvent">取消</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
        visible: false,
        title: '系统消息',
        content: '',
        confirmText: '',
        cancelText: '',
        cancelShow: false
      }
    },
    methods: {
      confirmEvent () {
        debugger
      },
      cancelEvent () {
        debugger
      }
    }
  }
</script>
<style lang='less' rel='stylesheet/less'>
  .Liu-mast {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(7, 17, 27, 0.2);
    z-index: 1000;
    transition: all .3s ease-in-out;
    .Lui-dialog-wrapper {
      position: absolute;
      top: 50%;
      left: 10%;
      margin-top: -62.5%;
      padding: 18px 22px;
      box-sizing: border-box;
      width: 80%;
      background-color: #fff;
      border-radius: 3px;
      box-shadow: 0px 3px 10px 0 rgba(7, 17, 27, 0.5);
      .Lui-title {
        font-size: 17px;
        font-weight: bold;
        word-break: break-all;
      }
      .Lui-content {
        margin: 16px 0;
        color: #555;
        word-break: break-all;
      }
      .Lui-tail {
        margin-top: 22px;
        text-align: right;
        button {
          padding: 0 18px;
          border: 0;
          background-color: rgba(0, 0, 0, 0);
          font-size: 15px;
          outline: none;
        }
        .confirm {
          color: #0761ff;
        }
        .cancel {
          color: #555;
        }
      }
    }
    &.fade-enter, &.fade-leave-to {
      background-color: rgba(7, 17, 27, 0);
      opacity: 0;
    }
    &.fade-leave, &.fade-enter-to {
      background-color: rgba(7, 17, 27, 0.2);
      opacity: 1;
      .Lui-dialog-wrapper {
        transform: scale(1);
      }
    }
  }
</style>
