import axios from 'axios'

export const GET = (url, options = {}) => {
  return axios.get(url, options)
    .then((response) => {
      return Promise.resolve(response)
    })
}
export const POST = (url, options = {}) => {
  return axios.post(url, options)
    .then((response) => {
      return Promise.resolve(response)
    })
}
