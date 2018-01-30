<template>
  <div>
    <div class="swiper-wrapper">
      <swiper-My class="swiper-box">
        <div class="inner">
        </div>
        <div class="inner">
        </div>
      </swiper-My>
    </div>
    <button @click="slider">111</button>
  </div>
</template>
<script type='text/ecmascript-6'>
  import SwiperMy from 'wx/ui/swiper/swiper'
  export default {
    data() {
      return {
        performanceMode: true,
        loop: true,
        paginationVisible: true
      }
    },
    methods: {
      // slider() {
      //   this.$refs.slider.sliderTo(-2)
      // }
    },
    components: {
      SwiperMy
    }
  }
</script>
<style lang='less' rel='stylesheet/less'>
  .swiper-wrapper {
    position: relative;
    width: 100%;
    padding-top: 64%;
    .swiper-box {
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      .inner {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .inner:nth-child(1) {
        background-image: url('/static/image/vip/2.jpg');
      }
      .inner:nth-child(2) {
        background-image: url('/static/image/vip/1.jpg');
      }
      .inner:nth-child(3) {
        background-image: url('/static/image/vip/2.jpg');
      }
      .inner:nth-child(4) {
        background-image: url('/static/image/vip/1.jpg');
      }
    }
  }
</style>
