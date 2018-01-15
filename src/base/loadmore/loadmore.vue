<template>
  <mt-loadmore class="loadmore-wrapper"
               :top-method="loadTop"
               v-infinite-scroll="loadMore"
               infinite-scroll-disabled="finish"
               infinite-scroll-distance="10"
               ref="loadmore">
    <slot></slot>
    <div v-show="!finish&&top" class="loading-text">加载中……</div>
    <div v-show="finish&&top" class="loading-text">数据加载完毕</div>
  </mt-loadmore>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    props: {
      finish: {
        type: Boolean,
        default: true
      },
      top: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.$parent._initLoadMoreList(false)
    },
    methods: {
      loadTop() {
        this.$parent._initLoadMoreList(true)
      },
      loadMore() {
        this.$parent._initLoadMoreList(false)
      },
      onTopLoaded() {
        this.$refs.loadmore.onTopLoaded()
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/variable";
  @import "../../common/less/mixin";

  .loadmore-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: scroll;
    padding: 8px;
    box-sizing: border-box;
    .loading-text {
      margin-top: 6px;
      height: 32px;
      line-height: 32px;
      text-align: center;
    }
  }
</style>
