/**
 * Created by LX on 2017/8/29.
 */
import {BASE_URI, BASE_USER} from './url'
import axios from 'axios'

export const getBaseInfo = function () {
  return axios.get(BASE_URI + 'user/get/' + sessionStorage.oid)
    .then((data) => {
      return Promise.resolve(data)
    })
}

export const getRole = function (crid) {
  return axios.get(BASE_URI + 'user/role/' + sessionStorage.oid)
    .then((data) => {
      data = data.data
      var role = []
      for (var key in data) {
        if (key === 'LS') {
          role.push('LS')
        } else if (key === 'JZ') {
          if (data[key].toString().indexOf('BR') > -1) {
            role.push('BR')
          } else {
            role.push('JZ')
          }
        }
      }
      return Promise.resolve(role)
    })
}

export const getIntegrate = function () {
  return axios.get(BASE_URI + 'integral/getIngegralSum/' + sessionStorage.oid)
    .then((data) => {
      data = JSON.parse(data.data)
      return Promise.resolve(data)
    })
}

export const getVipInfo = function (crid, that, refresh = false, callback) {
  if (crid === 'LS' && that.viptea && !refresh) return
  if (crid !== 'LS' && that.vippar && !refresh) return
  console.log(that)
  axios.get(BASE_USER + 'users/' + sessionStorage.oid + '/' + sessionStorage.crid)
    .then((data) => {
      data = data.data
      if (data.success) {
        if (sessionStorage.crid === 'LS') {
          let vip = {}
          if (!data.datas) {
            // 等级0：试用 1：普通用户 2：vip 3：vvip
            vip.level = 1
          } else {
            vip.level = parseInt(data.datas.level_teacher)
            // 截止时间
            vip.deadline = parseInt(data.datas.level_end)
            // 开始时间
            vip.startTime = parseInt(data.datas.level_start)
            // 试用
            vip.isTest = parseInt(data.datas.istest)
            // 等于vip天数
            vip.testDays = parseInt(data.datas.level_days)
          }
          vip.level === 0 ? vip.vip = 3 : vip.vip = vip.level
          that.setVIPTEA(vip)
        } else {
          if (data.datas) {
            let vip = {}
            let dex = -1
            let oid = ''
            for (var i = 0; i < data.datas.length; i++) {
              var obj = {}
              if (!data.datas[i].userInfo) {
                obj.level = 1
              } else {
                obj.level = parseInt(data.datas[i].userInfo.level_teacher) > 1 ? 2 : 1
                obj.deadline = parseInt(data.datas[i].userInfo.level_end)
                obj.startTime = parseInt(data.datas[i].userInfo.level_start)
              }
              obj.stuId = data.datas[i].studentInfo.id
              obj.stuName = data.datas[i].studentInfo.name
              obj.classId = data.datas[i].studentInfo.classid
              obj.className = data.datas[i].studentInfo.className
              if (sessionStorage.student && sessionStorage.student === obj.stuId) {
                dex = sessionStorage.student
              }
              if (i === 0) oid = obj.stuId
              vip[obj.stuId] = obj
            }
            if (dex === -1 && data.datas[0]) sessionStorage.student = oid
            that.setStudent(sessionStorage.student)
            that.setVIPPAR(vip)
          }
        }
      } else {
        that.setVIPTEA({
          level: 1
        })
      }
    })
}
