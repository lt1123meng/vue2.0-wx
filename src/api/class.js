/**
 * Created by LX on 2017/11/22.
 */
import {BASE_WX} from './url'

import {GET, POST} from './axios'

export const createClass = (params) => {
  let oid = sessionStorage.oid
  return GET(`${BASE_WX}class/create/${oid}`, {
    params: params
  })
}
export const getClass = () => {
  let oid = sessionStorage.oid
  return GET(`${BASE_WX}user/class/${oid}`)
}
export const getClassStu = (id) => {
  let crid = sessionStorage.crid
  let oid = sessionStorage.oid
  return GET(`${BASE_WX}class/student/${crid}/${oid}`, {
    params: {
      class_id: id
    }
  })
}
export const getClassQRCode = (id) => {
  let oid = sessionStorage.oid
  return GET(`${BASE_WX}user/qrcode/${oid}`, {
    params: {
      class_id: id
    }
  })
}
export const getLSClassList = () => {
  let oid = sessionStorage.oid
  return GET(`${BASE_WX}class/list/LS/${oid}`)
}
export const getExamListByClass = (id) => {
  let crid = sessionStorage.crid
  let oid = sessionStorage.oid
  return POST(`${BASE_WX}score/examList/${id}/${crid}/${oid}`)
}
