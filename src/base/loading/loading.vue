<template>
  <div class="loading-outer-wrapper">
    <img class="loading-img" src="/static/image/loading.gif">
    <p class="loading-text">小钉正在努力加载中……</p>
  </div>
</template>
<script>
  export default {
    name: 'loading'
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .loading-outer-wrapper {
    padding: 10% 0;
    text-align: center;
    .loading-img {
      width: 100px;
    }
    .loading-text {
      color: #6d6d6d;
    }
  }

</style>
