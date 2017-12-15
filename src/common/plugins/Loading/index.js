/**
 * Created by LX on 2017/11/29.
 */
import Vue from 'vue'
import LoadingVue from './Loading.vue'

var LoadingConstructor = Vue.extend(LoadingVue)
var topTipPool = []
var getAnInstance = () => {
  if (topTipPool.length > 0) {
    var instance = topTipPool[0]
    topTipPool.splice(0, 1)
    return instance
  }
  return new LoadingConstructor({
    el: document.createElement('div')
  })
}

LoadingConstructor.prototype.hide = () => {
  this.visible = false
}
LoadingConstructor.prototype.show = () => {
  this.visible = true
}
const Loading = (options = {}) => {
  var instance = getAnInstance()
  document.body.appendChild(instance.$el)
  return instance
}
export default Loading
