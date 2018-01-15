/**
 * Created by LX on 2017/11/29.
 */
import Vue from 'vue'
import SelectVue from './select-list.vue'

var running = false

var SelectConstructor = Vue.extend(SelectVue)
var getAnInstance = () => {
  return new SelectConstructor({
    el: document.createElement('div')
  })
}
SelectConstructor.prototype.close = (dom) => {
  setTimeout(() => {
    removeDom(dom)
  }, 500)
}
let removeDom = (dom) => {
  running = false
  if (dom) {
    dom.parentNode.removeChild(dom)
  }
}
const Select = (data, selected, title = '请选择', callback) => {
  if (running) return
  running = true
  var instance = getAnInstance()
  instance.data = data
  instance.select = selected
  instance.title = title
  instance.cancel = () => {
    instance.show = false
    running = false
    instance.close(instance.$el)
  }
  instance.selectThis = (item) => {
    if (item.name !== instance.select.name) {
      callback(item)
    }
    instance.show = false
    instance.close(instance.$el)
  }
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.show = true
  })
  return instance
}
export default Select
