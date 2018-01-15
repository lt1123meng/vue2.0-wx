import {BASE_WX} from './url'
import {GET, POST} from './axios'
// *****
// 老师成绩详情
// *****
// 成绩列表
export const getExamListByClass = (id) => {
  let crid = sessionStorage.crid
  let oid = sessionStorage.oid
  return POST(`${BASE_WX}score/examList/${id}/${crid}/${oid}`)
}
export const getFailReason = (cid, id) => {
  return GET(`${BASE_WX}score/findExamRemark/${cid}/${id}`)
}
// ****分数制
export const LSfirstTable = (params) => {
  let crid = sessionStorage.crid
  let oid = sessionStorage.oid
  return POST(`${BASE_WX}/score/examScoreList/${params.atnow}/${params.id}/${params.cid}/${crid}/${oid}`)
}
// 堆叠条形图
export const LSsecondBarScore = (params) => {
  let crid = sessionStorage.crid
  let oid = sessionStorage.oid
  return POST(`${BASE_WX}/score/examBarScore/${params.atnow}/${params.id}/${params.cid}/${crid}/${oid}`)
}
// 班级比较
export const LSthirdSUbject = (params) => {
  let crid = sessionStorage.crid
  let oid = sessionStorage.oid
  return POST(`${BASE_WX}/score/examSubjects/${params.atnow}/${params.id}/${crid}/${oid}`)
}
export const LSthirdClass = (params) => {
  let crid = sessionStorage.crid
  let oid = sessionStorage.oid
  return POST(`${BASE_WX}/score/examClasses/${params.atnow}/${params.id}/${params.cid}/${crid}/${oid}`)
}
export const LSthirdBarChart = (params) => {
  let crid = sessionStorage.crid
  let oid = sessionStorage.oid
  return GET(`${BASE_WX}/score/examCompareScoret/${params.atnow}/${params.cid}/${params.id}/${crid}/${oid}`,
    {
      params: {
        grade: 1,
        otherClass: '',
        subjectId: '80ZC1480169800013SX8'
      }
    }
  )
}

// ****等级制
export const LSDegree = (params) => {
  let crid = sessionStorage.crid
  let oid = sessionStorage.oid
  return GET(`${BASE_WX}/score/classExamListToLevelScore/${params.id}/${params.cid}/${crid}/${oid}`)
}
