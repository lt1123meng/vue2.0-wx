/**
 * Created by LX on 2017/9/4.
 */

import {BASE_WX} from './url'
import axios from 'axios'

export const getInformList = (param) => {
  return axios.get(BASE_WX + 'message/getMessages/' + common(), {
    params: param
  }).then((data) => {
    return Promise.resolve(data)
  })
}

export const deleteInform = (crid, oid, id, param) => {
  return axios.get(BASE_WX + 'message/delMessage/' + id + common(), {
    params: param
  }).then((data) => {
    return Promise.resolve(data)
  })
}

function common() {
  return '/' + sessionStorage.crid + '/' + sessionStorage.oid
}
