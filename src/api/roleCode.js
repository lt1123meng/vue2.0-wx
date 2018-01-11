/**
 * Created by LX on 2017/12/1.
 */
import axios from 'axios'
import {BASE_WX} from './url'

export const getClassByCode = (code) => {
  return axios.get(BASE_WX + 'class/infocode', {
    params: {
      code: code
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
