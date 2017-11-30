/**
 * Created by LX on 2017/11/29.
 */
import Vue from 'vue'
import DialogVue from './Dialog.vue'
var running = false
var DialogPool = []
var DialogConstructor = Vue.extend(DialogVue)
DialogConstructor.prototype.close = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
}

var getAnInstance = function () {
  if (DialogPool.length > 0) {
    var instance = DialogPool[0]
    DialogPool.splice(0, 1)
    instance.$el.removeEventListener('transitionend', removeDom)
    return instance
  }
  return new DialogConstructor({
    el: document.createElement('div')
  })
}
var removeDom = function () {
  running = false
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}
var initInstance = function (options = {}, type) {
  if (running) return
  running = true
  var instance = getAnInstance()
  DialogPool.push(instance)
  if (typeof options === 'string') {
    instance.content = options
  }
  instance.content = typeof options === 'string' ? options : options.content
  instance.title = options.title || '系统消息'
  instance.confirmText = options.confirmText || '确定'
  instance.cancelText = options.cancelText || '取消'
  instance.confirmEvent = () => {
    instance.close()
    if (options.ok) options.ok()
  }
  instance.cancelEvent = () => {
    instance.close()
    if (options.cancel) options.cancel()
  }
  instance.cancelShow = type === 'confirm' ? 'true' : 'false'

  document.body.appendChild(instance.$el)
  clearTimeout(instance.timer)
  Vue.nextTick(() => {
    instance.visible = true
    Vue.nextTick(() => {
      if (instance.$el.children[0]) {
        let inner = instance.$el.children[0]
        inner.style.marginTop = '-' + inner.offsetHeight / 2 + 'px'
      }
    })
  })
  return instance
}
var Dialog = {
  confirm: function (options) {
    initInstance(options, 'confirm')
  },
  alert: function (options) {
    initInstance(options, 'alert')
  }
}
export default Dialog
