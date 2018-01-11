import {BASE_WX} from './url'
import {POST} from './axios'
// 老师成绩详情
export const firstTable = (params) => {
  let crid = sessionStorage.crid
  let oid = sessionStorage.oid
  return POST(`${BASE_WX}/score/examScoreList/${params.atnow}/${params.id}/${params.cid}/${crid}/${oid}`)
}
