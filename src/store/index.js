/**
 * Created by LX on 2017/8/28.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  getters,
  mutations
})
