import {GET} from './axios'
import {BASE_WX} from './url'

export const getAuditedCount = () => {
  let crid = sessionStorage.crid
  let oid = sessionStorage.oid
  return GET(`${BASE_WX}bind/auditListsCount/${crid}/${oid}`)
}
export const getAuditedList = (id) => {
  let crid = sessionStorage.crid
  let oid = sessionStorage.oid
  let option = {}
  let single = 's'
  if (id) {
    option.params = {
      class_id: id
    }
    single = ''
  }
  return GET(`${BASE_WX}bind/auditList${single}/${crid}/${oid}`, option)
}
