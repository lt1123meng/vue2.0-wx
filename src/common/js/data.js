/**
 * Created by LX on 2017/9/1.
 */
export const MenusJZ = [
  {
    name: '园钉训练营',
    list: [
      {
        'vip': '0',
        'icon': 'inform.png',
        'route': 'inform_tea.inform',
        'text': '强化训练'
      }, {
        'vip': '0',
        'icon': 'work.png',
        'route': 'hwork_tea.class',
        'text': '错题本'
      }, {
        'vip': '0',
        'icon': 'manage.png',
        'route': 'manage.attend_calendar',
        'text': '作业精选'
      }, {
        'vip': '0',
        'icon': 'home-class.png',
        'route': 'c_class',
        'text': '园钉试卷'
      }, {
        'vip': '0',
        'icon': 'mien.png',
        'route': 'classStyle_tea.list',
        'text': '私信老师'
      }, {
        'vip': '0',
        'icon': 'vote.png',
        'route': 'vote_tea.vote',
        'text': '我要提建议'
      }
    ]
  }
]
export const MenusLS = [
  {
    name: '',
    list: [
      {
        'vip': '0',
        'icon': 'inform.png',
        'route': 'inform_tea.inform',
        'text': '班级通知'
      }, {
        'vip': '0',
        'icon': 'work.png',
        'route': 'hwork_tea.class',
        'text': '班级作业'
      }, {
        'vip': '0',
        'icon': 'manage.png',
        'route': 'manage.attend_calendar',
        'text': '常规管理'
      }, {
        'vip': '0',
        'icon': 'home-class.png',
        'route': '/class',
        'text': '我的班级',
        'circle': true
      }, {
        'vip': '0',
        'icon': 'mien.png',
        'route': 'classStyle_tea.list',
        'text': '班级风采'
      }, {
        'vip': '0',
        'icon': 'vote.png',
        'route': 'vote_tea.vote',
        'text': '班级投票'
      }, {
        'vip': '0',
        'icon': 'upload-grade.png',
        'route': '/g_l',
        'text': '上传成绩'
      }, {
        'vip': '0',
        'icon': 'quick-bind.png',
        'route': 'ksbd',
        'text': '快速绑定'
      }, {
        'vip': '0',
        'icon': 'grade-list.png',
        'route': 'grade',
        'text': '成绩单',
        'hot': true
      }, {
        'vip': '0',
        'hot': true,
        'icon': 'message.png',
        'route': 'teacher_noreply',
        'text': '家长留言'
      }]
  },
  {
    name: '与我相关',
    list: [
      {
        'vip': '0',
        'new': true,
        'icon': 'wallet.png',
        'route': 'wallet',
        'text': '我的钱包'
      }, {
        'vip': '0',
        'icon': 'resource.png',
        'route': 'selfinfo',
        'text': '我的资料'
      }, {
        'vip': '0',
        'icon': 'vip.png',
        'route': 'vip',
        'text': '我的会员'
      }, {
        'vip': '0',
        'icon': 'opinion.png',
        'route': 'opinion',
        'new': true,
        'text': '我的建议'
      }
    ]
  },
  {
    name: '第三方',
    list: [
      {
        'vip': '0',
        'new': true,
        'icon': 'wallet.png',
        'route': 'wallet',
        'text': '园钉课堂'
      }, {
        'vip': '0',
        'icon': 'resource.png',
        'route': 'selfinfo',
        'text': '园钉商城'
      }
    ]
  }
]

export const AllLS = [
  {
    'pc': '0',
    'vip': '1',
    'icon': 'inform.png',
    'route': 'inform_tea.inform',
    'text': '班级通知'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'work.png',
    'route': 'hwork_tea.class',
    'text': '图文作业'
  }, {
    'pc': '0',
    'vip': '2',
    'icon': 'library-work.png',
    'route': 'hwork_tea.class',
    'text': '题库作业',
    'new': true
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'manage.png',
    'route': 'manage.attend_calendar',
    'text': '常规管理'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'mien.png',
    'route': 'classStyle_tea.list',
    'text': '班级风采'
  }, {
    'pc': '0',
    'vip': '2',
    'icon': 'make-test.png',
    'route': '#',
    'text': '试题组卷',
    'new': true
  }, {
    'pc': '0',
    'vip': '3',
    'icon': 'test-download.png',
    'route': '#',
    'text': '组卷下载'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'vote.png',
    'route': 'vote_tea.vote',
    'text': '班级投票'
  }, {
    'pc': '1',
    'vip': '1',
    'icon': 'grade-upload.png',
    'route': '#',
    'text': '表格成绩上传'
  }, {
    'pc': '0',
    'vip': '3',
    'icon': 'upload-grade.png',
    'route': 'g_upload',
    'text': '图文成绩上传'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'message.png',
    'route': 'teacher_noreply',
    'text': '家长留言'
  }, {
    'pc': '0',
    'vip': '3',
    'icon': 'class-info.png',
    'route': '#',
    'text': '班级学情'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'create-class.png',
    'route': 'c_newcl',
    'text': '创建班级'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'quick-bind.png',
    'route': 'ksbd',
    'text': '快速绑定'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'class.png',
    'route': '#',
    'text': '园钉课堂'
  }
]
export const AllJZ = [
  {
    'pc': '0',
    'vip': '1',
    'icon': 'inform.png',
    'route': 'inform_jz.inform',
    'text': '班级通知'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'work.png',
    'route': 'hwork_jz',
    'text': '班级作业'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'vote.png',
    'route': 'vote_jz.vote',
    'text': '班级投票'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'manage.png',
    'route': 'manage.jz_daily',
    'text': '常规管理'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'mien.png',
    'route': 'classStyle_jz.list',
    'text': '班级风采'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'grade.png',
    'route': 'grade',
    'text': '成绩分析'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'vip-integral.png',
    'route': 'wallet',
    'text': '会员充值'
  }, {
    'pc': '0',
    'vip': '2',
    'icon': 'wrong.png',
    'route': 'camp',
    'text': '错题本'
  }, {
    'pc': '0',
    'vip': '2',
    'icon': 'jie.png',
    'route': 'camp',
    'text': '看解析'
  }, {
    'pc': '0',
    'vip': '2',
    'icon': 'class-info.png',
    'route': '#',
    'text': '学生学情'
  }, {
    'pc': '0',
    'vip': '2',
    'icon': 'quick-bind.png',
    'route': '#',
    'text': '智能推送'
  }, {
    'pc': '0',
    'vip': '1',
    'icon': 'timed-train.png',
    'route': 'camp',
    'text': '同步训练'
  }
]

export const Route = {
  inform: ['inform_tea.inform', 'inform_jz.inform'],
  work: ['hwork_tea.class', 'hwork_jz'],
  grade: ['grade', 'grade'],
  mien: ['classStyle_tea.list', 'classStyle_jz.list'],
  message: ['teacher_noreply', 'parent_list'],
  create: ['c_newcl', 'c_newcl'],
  bind: ['ksbd', 'ksbd'],
  yd: ['about', 'about'],
  qrcode: ['qrcode', 'qrcode']
}
