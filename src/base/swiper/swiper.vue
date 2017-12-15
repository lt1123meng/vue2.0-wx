<template>
  <div class="swiper-outer-wrapper"
       :class="[direction, {'dragging': dragging}]"
       @touchstart="_onTouchStart"
       @mousedown="_onTouchStart"
       @wheel="_onWheel">
    <div class="swiper-wrap"
         ref="swiperWrap"
         :style="{
                'transform' : 'translate3d(' + translateX + 'px,' + translateY + 'px, 0)',
                'transition-duration': transitionDuration + 'ms'
             }"
         @transitionend="_onTransitionEnd">
      <slot></slot>
    </div>
    <div class="swiper-pagination"
         v-show="paginationVisible">
            <span class="swiper-pagination-bullet"
                  :class="{'active': index+1===currentPage}"
                  v-for="(slide,index) in slideEls"
                  @click="paginationClickable && setPage(index+1)"></span>
    </div>
  </div>
</template>
<style lang="less" src="./swiper.less"></style>
<script type="text/babel">
  const VERTICAL = 'vertical'
  const HORIZONTAL = 'horizontal'
  export default {
    props: {
      // 方向默认水平
      direction: {
        type: String,
        default: HORIZONTAL,
        validator: (value) => [VERTICAL, HORIZONTAL].indexOf(value) > -1
      },
      mousewheelControl: {
        type: Boolean,
        default: true
      },
      // 不允许出现拖动
      performanceMode: {
        type: Boolean,
        default: true
      },
      // 滑动底部小圆点
      paginationVisible: {
        type: Boolean,
        default: false
      },
      paginationClickable: {
        type: Boolean,
        default: false
      },
      // 是否循环
      loop: {
        type: Boolean,
        default: false
      },
      // 动画执行时间
      speed: {
        type: Number,
        default: 500
      }
    },
    data() {
      return {
        // 当前页面索引 从1开始
        currentPage: 1,
        lastPage: 1,
        // X  Y方向位移量
        translateX: 0,
        translateY: 0,
        // 开始滑动时的初始偏移量
        startTranslate: 0,
        // touch事件偏差量
        delta: 0,
        // 是否处于touch模式
        dragging: false,
        // touchStart 触摸点
        startPos: null,
        transitioning: false,
        slideEls: [],
        translateOffset: 0,
        transitionDuration: 0
      }
    },
    mounted() {
      this._onTouchMove = this._onTouchMove.bind(this)
      this._onTouchEnd = this._onTouchEnd.bind(this)
      this.slideEls = [].map.call(this.$refs.swiperWrap.children, el => el)
      if (this.loop) {
        this.$nextTick(() => {
          this._createLoop()
          this.setPage(this.currentPage, true)
        })
      } else {
        this.setPage(this.currentPage)
      }
    },
    methods: {
      next() {
        var page = this.currentPage
        if (page < this.slideEls.length || this.loop) {
          this.setPage(page + 1)
        } else {
          this._revert()
        }
      },
      prev() {
        var page = this.currentPage
        if (page > 1 || this.loop) {
          this.setPage(page - 1)
        } else {
          this._revert()
        }
      },
      setPage(page, noAnimation) {
        var self = this
        this.lastPage = this.currentPage
        debugger
        if (page === 0) {
          this.currentPage = this.slideEls.length
        } else if (page === this.slideEls.length + 1) {
          this.currentPage = 1
        } else {
          this.currentPage = page
        }
        if (this.loop) {
          if (this.delta === 0) {
            this._setTranslate(self._getTranslateOfPage(this.lastPage))
          }
          setTimeout(() => {
            self._setTranslate(self._getTranslateOfPage(page))
            if (noAnimation) return
            self._onTransitionStart()
          }, 0)
        } else {
          this._setTranslate(this._getTranslateOfPage(page))
          if (noAnimation) return
          this._onTransitionStart()
        }
      },
      // 判断是不是水平滑动返回Boolean类型
      isHorizontal() {
        return this.direction === HORIZONTAL
      },
      isVertical() {
        return this.direction === VERTICAL
      },
      _onTouchStart(e) {
        this.startPos = this._getTouchPos(e)
        this.delta = 0
        this.startTranslate = this._getTranslateOfPage(this.currentPage)
        this.startTime = new Date().getTime()
        this.dragging = true
        this.transitionDuration = 0
        document.addEventListener('touchmove', this._onTouchMove, false)
        document.addEventListener('touchend', this._onTouchEnd, false)
        document.addEventListener('mousemove', this._onTouchMove, false)
        document.addEventListener('mouseup', this._onTouchEnd, false)
      },
      _onTouchMove(e) {
        this.delta = this._getTouchPos(e) - this.startPos
        if (this.performanceMode) {
          this._setTranslate(this.startTranslate + this.delta)
          this.$emit('slider-move', this._getTranslate())
        }
        if ((this.isVertical() || this.isHorizontal()) && Math.abs(this.delta) > 0) {
          // 如果滑动事件执行 屏蔽其他点击事件
          e.preventDefault()
        }
      },
      _onTouchEnd(e) {
        this.dragging = false
        this.transitionDuration = this.speed
        var isQuickAction = new Date().getTime() - this.startTime < 1000
        if ((this.delta < -100) || (isQuickAction && this.delta < -15)) {
          this.next()
        } else if ((this.delta > 100) || (isQuickAction && this.delta > 15)) {
          this.prev()
        } else {
          this._revert()
        }
        document.removeEventListener('touchmove', this._onTouchMove)
        document.removeEventListener('touchend', this._onTouchEnd)
        document.removeEventListener('mousemove', this._onTouchMove)
        document.removeEventListener('mouseup', this._onTouchEnd)
      },
      _onWheel(e) {
        if (this.mousewheelControl) {
          // TODO Support apple magic mouse and trackpad.
          if (!this.transitioning) {
            if (e.deltaY > 0) {
              this.next()
            } else {
              this.prev()
            }
          }
          if (this._isPageChanged()) e.preventDefault()
        }
      },
      _revert() {
        this.setPage(this.currentPage)
      },
      // 返回当前touch事件的位置
      _getTouchPos(e) {
        var key = this.isHorizontal() ? 'pageX' : 'pageY'
        return e.changedTouches ? e.changedTouches[0][key] : e[key]
      },
      _onTransitionStart() {
        this.transitioning = true
        this.transitionDuration = this.speed
        if (this._isPageChanged()) {
          this.$emit('slide-change-start', this.currentPage)
        } else {
          this.$emit('slide-revert-start', this.currentPage)
        }
      },
      _onTransitionEnd() {
        this.transitioning = false
        this.transitionDuration = 0
        this.delta = 0
        this._setTranslate(this._getTranslateOfPage(this.currentPage))
        if (this._isPageChanged()) {
          this.$emit('slide-change-end', this.currentPage)
        } else {
          this.$emit('slide-revert-end', this.currentPage)
        }
      },
      _isPageChanged() {
        return this.lastPage !== this.currentPage
      },
      _setTranslate(value) {
        var translateName = this.isHorizontal() ? 'translateX' : 'translateY'
        this[translateName] = value
      },
      _getTranslate() {
        var translateName = this.isHorizontal() ? 'translateX' : 'translateY'
        return this[translateName]
      },
      _getTranslateOfPage(page) {
        if (page === 0) return 0
        var propName = this.isHorizontal() ? 'clientWidth' : 'clientHeight'
        // 累加器（callback，param（第一次callback的参数））
        return -[].reduce.call(this.slideEls,
          (total, el, i) => {
            return i > page - 2 ? total : total + el[propName]
          },
          0) + this.translateOffset
      },
      _createLoop() {
        var propName = this.isHorizontal() ? 'clientWidth' : 'clientHeight'
        var swiperWrapEl = this.$refs.swiperWrap
        var duplicateFirstChild = swiperWrapEl.firstElementChild.cloneNode(true)
        var duplicateLastChild = swiperWrapEl.lastElementChild.cloneNode(true)
        swiperWrapEl.insertBefore(duplicateLastChild, swiperWrapEl.firstElementChild)
        swiperWrapEl.appendChild(duplicateFirstChild)
        this.translateOffset = -duplicateLastChild[propName]
      },
      sliderTo(index) {
        debugger
        if (index < 1) {
          index = 1
        } else if (index > this.slideEls.length) {
          index = this.slideEls.length
        }
        this.delta = 200
        this.setPage(index)
      }
    }
  }
</script>
