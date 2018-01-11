<template>
  <div class="empty-outer-wrapper">
    <img class="empty-img" src="/src/static/loading.gif">
    <p class="empty-text">暂无数据</p>
  </div>
</template>
<script>
  export default {
    name: 'empty'
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .empty-outer-wrapper {
    padding: 10% 0;
    text-align: center;
    .empty-img {
      width: 100px;
    }
    .empty-text {
      color: #6d6d6d;
    }
  }

</style>
