export const FormatLegendData = (baseData) => {
  let fsScoreData = []
  let fsLegend = {}
  for (let i = 0; i < baseData.length; i++) {
    let student = {}
    student.name = baseData[i].name
    student.stu_id = baseData[i].stu_id
    student.content = []
    for (let j = 0; j < baseData[i].content.length; j++) {
      let pGrade = baseData[i].content[j]
      if (pGrade.subject_pid === '0') {
        student.content.push(pGrade)
        for (let k = 0; k < baseData[i].content.length; k++) {
          if (baseData[i].content[k].subject_pid === pGrade.subject_id) {
            let thisGrade = baseData[i].content[k]
            thisGrade.subTitle = thisGrade.object
            thisGrade.object = pGrade.object
            thisGrade.class = true
            student.content.push(thisGrade)
          }
        }
      }
      if (pGrade.subject_pid === '') {
        student.content.push(pGrade)
      }
    }
    fsScoreData.push(student)
  }
  for (let i = 0; i < fsScoreData[0].content.length; i++) {
    fsLegend[fsScoreData[0].content[i].subject_id] = {
      id: fsScoreData[0].content[i].subject_id,
      name: fsScoreData[0].content[i].object,
      subTitle: '',
      active: false,
      main: false
    }
    if (i < 4) {
      fsLegend[fsScoreData[0].content[i].subject_id].active = true
    }
    if (fsScoreData[0].content[i].subject_pid === '0' || fsScoreData[0].content[i].subject_id === '') {
      fsLegend[fsScoreData[0].content[i].subject_id].main = true
    } else {
      fsLegend[fsScoreData[0].content[i].subject_id].subTitle = fsScoreData[0].content[i].subTitle
    }
  }
  return {
    legend: fsLegend,
    data: fsScoreData
  }
}

export const ScortData = (data, subject = '', soreSubject = '', localeCompare = false) => {
  if (subject === '') return data
  if (subject === 'name') {
    if (soreSubject === '' || soreSubject !== subject) {
      return data.sort((a, b) => {
        return b.name.localeCompare(a.name, 'zh-Hans-CN', {sensitivity: 'accent'})
      })
    } else {
      return data.sort((a, b) => {
        return a.name.localeCompare(b.name, 'zh-Hans-CN', {sensitivity: 'accent'})
      })
    }
  } else {
    let sortHaveScore = []
    let sortNoScore = []
    let index = 0
    for (let i = 0; i < data[0].content.length; i++) {
      if (data[0].content[i].subject_id === subject) {
        index = i
        break
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].content[index].score === 'N/A') {
        sortNoScore.push(data[i])
      } else {
        sortHaveScore.push(data[i])
      }
    }
    if (soreSubject === '' || soreSubject !== subject) {
      if (localeCompare) {
        return data.sort((a, b) => {
          let valuea = a.content[index].score
          let valueb = b.content[index].score
          return valueb.localeCompare(valuea, 'zh-Hans-CN', {sensitivity: 'accent'})
        })
      } else {
        sortHaveScore.sort((a, b) => {
          let valuea = a.content[index].score
          let valueb = b.content[index].score
          return valueb - valuea
        })
      }
    } else {
      if (localeCompare) {
        return data.sort((a, b) => {
          let valuea = a.content[index].score
          let valueb = b.content[index].score
          return valuea.localeCompare(valueb, 'zh-Hans-CN', {sensitivity: 'accent'})
        })
      } else {
        sortHaveScore.sort((a, b) => {
          let valuea = a.content[index].score
          let valueb = b.content[index].score
          return valuea - valueb
        })
      }
    }
    return sortHaveScore.concat(sortNoScore)
  }
}
