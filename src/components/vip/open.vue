<template>
  <div>
    <swiper-My>
      <div class="inner">1</div>
      <div class="inner">1</div>
      <div class="inner">1</div>
    </swiper-My>
  </div>
</template>
<script type='text/ecmascript-6'>
  import SwiperMy from 'base/swiper/swiper'
  export default {
    data () {
      return {}
    },
    components: {
      SwiperMy
    }
  }
</script>
<style lang='less' rel='stylesheet/less'>
  .inner {
    height: 300px !important;
    background-color: red;
  }
</style>
