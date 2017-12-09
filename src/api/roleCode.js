/**
 * Created by LX on 2017/12/1.
 */
import axios from 'axios'
import {BASE_URI} from './url'

export const getClassByCode = function (code) {
  return axios.get(BASE_URI + 'class/infocode', {
    params: {
      code: code
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
