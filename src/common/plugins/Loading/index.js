/**
 * Created by LX on 2017/11/29.
 */
import Vue from 'vue'
import LoadingVue from './Loading.vue'

var LoadingConstructor = Vue.extend(LoadingVue)
var LoadingPool = []
var getAnInstance = () => {
  if (LoadingPool.length > 0) {
    var instant = LoadingPool[0]
    LoadingPool.splice(0, 1)
    return instant
  }
  let instance = new LoadingConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
  return instance
}

LoadingConstructor.prototype.hide = () => {
  this.visible = false
}
LoadingConstructor.prototype.show = () => {
  this.visible = true
}
const Loading = (options = {}) => {
  var instance = getAnInstance()
  return instance
}
export default Loading
