/**
 * Created by LX on 2017/9/4.
 */

import {BASE_URI} from './url'
import axios from 'axios'

export const getInformList = function (crid, oid, param) {
  return axios.get(BASE_URI + 'message/getMessages/' + crid + '/' + oid, {
    params: param
  }).then((data) => {
    return Promise.resolve(data)
  })
}

export const deleteInform = function (crid, oid, id, param) {
  return axios.get(BASE_URI + 'message/delMessage/' + id + '/' + crid + '/' + oid, {
    params: param
  }).then((data) => {
    return Promise.resolve(data)
  })
}
