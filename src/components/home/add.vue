<template>
  <div class="home-add-wrapper" ref="scroll" @click="close">
    <div class="mast-wrapper">
      <div class="detail-wrapper" @click.stop>
        <div class="angle-wrapper"></div>
        <div class="item-wrapper" @click.stop="changeRole">
          <div class="icon-wrapper">
            <img src="./icon-change.png">
          </div>
          <div class="text-wrapper">切换角色</div>
        </div>
        <div class="item-wrapper">
          <div class="icon-wrapper">
            <img src="./icon-change.png">
          </div>
          <div class="text-wrapper">切换角色</div>
        </div>
        <div class="item-wrapper">
          <div class="icon-wrapper">
            <img src="./icon-change.png">
          </div>
          <div class="text-wrapper">切换角色</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    methods: {
      close() {
        this.$router.go(-1)
      },
      mounted() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scroll, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      changeRole() {
        this.$router.replace('role')
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .home-add-wrapper
    position absolute
    top 0
    bottom 0
    width 100%
    transition all .3s ease
    .mast-wrapper
      position absolute
      top 0px
      bottom 0
      width 100%
      background-color $mast-color
      transition all .3s ease
      z-index: 1
      .detail-wrapper
        position absolute
        width 140px
        padding 12px
        box-sizing border-box
        background-color #fff
        top 48px
        right 7px
        border-radius 4px
        transform-origin: top right
        transition all .3s
        .item-wrapper
          display flex
          height 36px
          line-height 36px
          .icon-wrapper
            flex 0 0 30px
            height 36px
            line-height 36px
            font-size 0
            img
              width 18px
              vertical-align middle
          .text-wrapper
            flex 1
        .angle-wrapper
          position absolute
          top: -6px;
          right: 8px;
          width: 13px;
          height: 13px;
          background: #fff;
          transform: scaleX(0.9) rotate(45deg);

    &.add-enter, &.add-leave-to
      .mast-wrapper
        background-color rgba(7, 17, 27, 0)
        .detail-wrapper
          transform scale(0)
    &.add-leave, &.add-enter-to
      .mast-wrapper
        background-color $mast-color
        .detail-wrapper
          transform scale(1)
</style>
