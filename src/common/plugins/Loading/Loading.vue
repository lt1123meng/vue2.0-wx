<template>
  <div class="loading-wrapper" v-show="visible">
    <img class="img" src="/src/static/loading.gif">
    <p class="text">
      园钉努力加载中…
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .loading-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    z-index: 40;
  }

  .loading-wrapper img {
    display: inherit;
    margin: 20% auto 0;
    width: 100px;
  }

  .loading-wrapper .text {
    margin-top: 10px;
    text-align: center;
    font-size: 16px;
    color: #6d6d6d;
  }
</style>
