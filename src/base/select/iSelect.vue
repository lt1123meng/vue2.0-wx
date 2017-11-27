<template>
  <div class="select-wrapper">
    <div class="" @click="_show">1111</div>
    <transition name="select">
      <div class="select-list-wrapper" v-show="show">
        <div class="select-title">
          <div class="select-true"></div>
          <div class="select-name">选择科目</div>
          <div class="select-cancel" @click="_show">取消</div>
        </div>
        <div class="select-list">
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
          <div class="select-item">1</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        show: false
      }
    },
    methods: {
      _show () {
        this.show = !this.show
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import '../../common/less/variable';
  @import '../../common/less/mixin';

  .select-wrapper {
    .select-list-wrapper {
      position: fixed !important;
      bottom: 0;
      background-color: #fff;
      width: 100%;
      left: 0;
      max-height: 70%;
      z-index: 10000;
      transition-duration: 10s;
      transition-property: transform;
      .border-top-1px();
      .select-title {
        display: flex;
        height: 42px;
        line-height: 42px;
        background-color: rgb(247, 247, 248);;
        text-align: center;
        .select-name {
          flex: 1;
          font-size: 17px;
        }
        .select-true, .select-cancel {
          flex: 0 0 40px;
          font-size: 16px;
          color: @green-color;
        }
      }
      .select-list {
        padding-top: 42px;
        overflow: scroll;
        padding-left: 12px;
        box-sizing: border-box;
        .select-item {
          .border-1px();
          height: 36px;
          line-height: 36px;
        }
      }
    }
    .select-enter {
      &.select-list-wrapper {
        transform: translate3d(0, 0%, 0);
      }
    }
    .select-leave {
      &.select-list-wrapper {
        transform: translate3d(0, 100%, 0);
      }
    }
  }
</style>
