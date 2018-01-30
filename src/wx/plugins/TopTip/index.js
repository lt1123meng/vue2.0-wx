/**
 * Created by LX on 2017/11/29.
 */
import Vue from 'vue'
import TopTipVue from './TopTip.vue'

var running = false
var topTipPool = []
var getAnInstance = () => {
  if (topTipPool.length > 0) {
    var instance = topTipPool[0]
    topTipPool.splice(0, 1)
    return instance
  }
  return new TopTipConstructor({
    el: document.createElement('div')
  })
}
var returnAnInstance = (instance) => {
  if (instance) {
    topTipPool.push(instance)
  }
}

let removeDom = () => {
  running = false
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

var TopTipConstructor = Vue.extend(TopTipVue)
TopTipConstructor.prototype.close = () => {
  this.visible = false
  this.closed = true
  this.$el.addEventListener('transitionend', removeDom)
  returnAnInstance(this)
}
const TopTip = (options = {}) => {
  if (running) return
  running = true
  var instance = getAnInstance()
  clearTimeout(instance.timer)
  instance.closed = false
  let duration = options.duration || 1400
  instance.message = typeof options === 'string' ? options : options.message
  instance.type = options.type || 'success'
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.visible = true
    instance.$el.removeEventListener('transitionend', removeDom)
    ~duration && (instance.timer = setTimeout(() => {
      if (instance.closed) return
      instance.close()
    }, duration))
  })
  return instance
}
export default TopTip
