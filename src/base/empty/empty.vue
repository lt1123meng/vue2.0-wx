<template>
  <div class="empty-outer-wrapper">
    <img class="empty-img" src="/src/static/empty.png">
    <p class="empty-text">{{title}}</p>
  </div>
</template>
<script>
  export default {
    name: 'empty',
    props: {
      title: {
        default: '暂无数据'
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .empty-outer-wrapper {
    padding: 10% 0;
    text-align: center;
    .empty-img {
      width: 150px;
      margin: 0 0 22px 0;
    }
    .empty-text {
      color: #6d6d6d;
    }
  }
</style>
