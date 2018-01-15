<template>
  <transition name="select">
    <div class="select-list-mast" @click="cancel" v-show="show">
      <div class="select-list-wrapper" @click.stop>
        <div class="select-title">
          <div class="select-true"></div>
          <div class="select-name" v-html="title"></div>
          <div class="select-cancel" @click="cancel">取消</div>
        </div>
        <div class="select-list">
          <div class="select-item"
               v-for="item in data"
               @click="selectThis(item)">
            <div class="name" v-html="item.value"></div>
            <div class="check"><span v-show="item.name===select.name">✔</span></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type='text/ecmascript-6'>
  export default {
    data() {
      return {
        data: [],
        select: {},
        title: '请选择',
        show: false
      }
    },
    methods: {
      cancel() {
        return 1
      },
      selectThis(item) {
        return 1
      }
    }
  }
</script>
<style lang='less' rel='stylesheet/less'>
  .select-list-mast {
    position: fixed !important;
    top: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, 0.2);
    width: 100%;
    left: 0;
    z-index: 10000;
    transition-duration: .3s;
    transition-property: all;
    .select-list-wrapper {
      position: fixed !important;
      bottom: 0;
      padding-top: 42px;
      width: 100%;
      background-color: #fff;
      transition-duration: .3s;
      transition-property: transform;
      &:after {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        border-top: 1px solid rgba(7, 17, 27, 0.11);;
        content: ' ';
      }
      .select-title {
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        height: 42px;
        line-height: 42px;
        background-color: rgb(247, 247, 248);;
        text-align: center;
        .select-name {
          flex: 1;
          font-size: 17px;
          color: #333;
        }
        .select-true, .select-cancel {
          flex: 0 0 40px;
          font-size: 16px;
          color: #04BE02;
        }
      }
      .select-list {
        padding-left: 12px;
        max-height: 22rem;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
        .select-item {
          display: flex;
          position: relative;
          padding: 12px 0;
          line-height: 1.5;
          &:after {
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            border-top: 1px solid rgba(7, 17, 27, 0.11);;
            content: ' ';
          }
          .name {
            flex: 1;
            color: #333;
            word-break: break-all;
          }
          .check {
            flex: 0 0 40px;
            line-height: 20px;
            text-align: center;
            font-size: 17px;
            color: #04BE02;
          }
        }
      }
    }
  }

  .select-enter, .select-leave-to {
    &.select-list-mast {
      background-color: rgba(7, 17, 27, 0);
      .select-list-wrapper {
        transform: translate3d(0, 100%, 0);
      }
    }
  }

  .select-leave, .select-enter-to {
    &.select-list-mast {
      background-color: rgba(7, 17, 27, 0.2);
      .select-list-wrapper {
        transform: translate3d(0, 0%, 0);
      }
    }
  }
</style>
