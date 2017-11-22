<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div>
      <div class="pull-down-wrapper" v-if="pulldown">
        <div class="wrapper">
          <img class="icon" :class="{'release':pulldownState.state==3}"
               v-show="pulldownState.state<4"
               src="./direction.png">

          <img class="icon rotate-infinite" v-show="pulldownState.state==4" src="./loading.png">
          <span class="text" v-show="pulldownState.state==2">下拉刷新</span>
          <span class="text" v-show="pulldownState.state==3">释放立即刷新</span>
          <span class="text" v-show="pulldownState.state==4">正在刷新……</span>
        </div>
      </div>
      <div class="success" v-if="pulldown" :class="{active:success}">刷新成功</div>
      <div class="scroll-content-wrapper" :class="{'loading':pulldownState&&pulldownState.state==4}">
        <slot></slot>
      </div>
      <div class="pull-up-wrapper" v-if="pullup">
        <div class="loading" v-if="!pullupState">
          <img class="icon rotate-infinite" src="./loading.png">
          <span class="text">正在加载</span>
        </div>
        <div class="loading" v-if="pullupState">
          <span class="text">已显示全部</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {limit} from 'base/variable'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 2
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      pullupState: {
        type: Boolean,
        default: false
      },
      pulldown: {
        type: Boolean,
        default: false
      },
      pulldownState: {
        type: Object,
        default: null
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    data () {
      return {
        success: false
      }
    },
    created () {
      this.oldData = []
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            console.log(pos)
            me.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              if (!this.pullupState) {
                this.$emit('pullup')
              }
            }
          })
        }
        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.pulldownState.state = 2
          this.scroll.on('scroll', (pos) => {
            if (pos.y > 30) {
              this.pulldownState.state = 3
            } else {
              this.pulldownState.state = 2
            }
            if (pos.y > 200) {
              this.scroll.scrollTo(0, 200)
            }
          })
          this.scroll.on('touchEnd', (pos) => {
            if (pos.y > 30) {
              this.pulldownState.state = 4
              this.$emit('pulldown')
            } else {
              this.pulldownState.state = 2
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    computed: {
      finish () {
        debugger
        if ((this.data && this.data.length % limit === 0) && this.data !== this.oldData) {
          this.oldData = this.data
          return false
        }
        this.oldData = this.data
        return true
      }
    },
    watch: {
      data (val, old) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.refresh()
          })
        }, this.refreshDelay)
      },
      pulldownState: {
        handler: function (val, old) {
          if (val.state === 'success') {
            this.pulldownState.state = 1
            this.success = true
            setTimeout(() => {
              this.success = false
            }, 1600)
          }
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import '../../common/less/variable';

  .scroll-wrapper {
    .pull-down-wrapper {
      position: absolute;
      top: -150px;
      height: 150px;
      text-align: center;
      background-color: #5a5a5a;
      z-index: 2;
      .wrapper {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        .icon {
          width: 30px;
          vertical-align: middle;
          transition: all .2s linear;
          &.release {
            transform: rotate(180deg);
          }
        }

        .text {
          font-size: @font-size-medium-x;
          vertical-align: middle;
          color: #fff;
        }
      }
    }
    .success {
      position: absolute;
      top: -32px;
      width: 100%;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: @blue-color;
      background-color: #fff;
      transition: all .3s linear;
      z-index: 1;
      &.active {
        top: 0;
      }
    }
    .scroll-content-wrapper {
      &.loading {
        matgin-top: 50px;
      }
    }
    .pull-up-wrapper {
      padding: 18px 0 38px 0;
      height: 22px;;
      line-height: 22px;
      text-align: center;
      font-size: 0;
      .icon {
        width: 22px;
        margin-right: 8px;
      }
      .text {
        vertical-align: top;
        height: 22px;
        line-height: 22px;
        font-size: @font-size-medium;
        color: @light-grey;
      }
    }
    .rotate-infinite {
      animation: rotate 1.6s linear infinite;
    }
    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>
