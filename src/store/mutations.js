/**
 * Created by LX on 2017/8/28.
 */
import * as types from './mutation-types'

export default {
  [types.SET_RATIO](state, ratio) {
    state.ratio = ratio
  },
  [types.SET_OID](state, oid) {
    state.oid = oid
  },
  [types.SET_ROLE](state, role) {
    state.role = role
  },
  [types.SET_CRID](state, crid) {
    state.crid = crid
  },
  [types.SET_STUDENT](state, student) {
    sessionStorage.student = student
    state.student = student
  },
  [types.SET_INFO](state, info) {
    state.info = info
  },
  [types.SET_VIPTEA](state, vip) {
    state.viptea = vip
  },
  [types.SET_VIPPAR](state, vip) {
    state.vippar = vip
  },
  [types.SET_INTEGRATE](state, integrate) {
    state.integrate = integrate
  }
}
