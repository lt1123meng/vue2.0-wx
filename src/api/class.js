/**
 * Created by LX on 2017/11/22.
 */
import {BASE_URI} from './url'

import axios from 'axios'

export const createClass = function (params) {
  return axios.get(BASE_URI + 'class/create/' + sessionStorage.oid, {
    params: params
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}
export const getClass = function () {
  return axios.get(BASE_URI + 'user/class/' + sessionStorage.oid)
    .then((response) => {
      return Promise.resolve(response)
    })
}
