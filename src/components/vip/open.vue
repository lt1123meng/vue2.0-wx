<template>
  <div>
    <swiper-My ref="slider" :performanceMode="performanceMode" :loop="loop">
      <div class="inner">1</div>
      <div class="inner">2</div>
      <div class="inner">3</div>
      <div class="inner">4</div>
    </swiper-My>
    <button @click="slider">111</button>
  </div>
</template>
<script type='text/ecmascript-6'>
  import SwiperMy from 'base/swiper/swiper'

  export default {
    data() {
      return {
        performanceMode: false,
        loop: true
      }
    },
    methods: {
      slider() {
        this.$refs.slider.sliderTo(-2)
      }
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
