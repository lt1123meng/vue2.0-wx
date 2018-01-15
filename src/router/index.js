import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/home/home'
import HomeChangeStudent from 'components/home/change-student'
import Class from 'components/class/class'
import ClassList from 'components/class/class-list'
import ClassDetail from 'components/class/class-detail'
import CreateClass from 'components/class/create-class.vue'
import ClassQRCode from 'components/class/class-qrcode.vue'
import SetupMain from 'components/setup/main.vue'
import RoleChangeRole from 'components/role/change-role'
import RoleBindRole from 'components/role/bind-code'
import VipOpen from 'components/vip/open'
import Check from 'components/bind/check'
import GradeLS from 'components/grade/LS/grade'
import GradeScoreDetail from 'components/grade/LS/score-detail'
import GradeDegreeDetail from 'components/grade/LS/degree-detail'

Vue.use(Router)
// const Home = (resolve) => {
//   import('components/home/home').then((module) => {
//     resolve(module)
//   })
// }
// const HomeChangeStudent = (resolve) => {
//   import('components/home/change-student').then((module) => {
//     resolve(module)
//   })
// }
// const Class = (resolve) => {
//   import('components/class/class').then((module) => {
//     resolve(module)
//   })
// }
// const ClassList = (resolve) => {
//   import('components/class/class-list').then((module) => {
//     resolve(module)
//   })
// }
// const ClassDetail = (resolve) => {
//   import('components/class/class-detail').then((module) => {
//     resolve(module)
//   })
// }
// const CreateClass = (resolve) => {
//   import('components/class/create-class.vue').then((module) => {
//     resolve(module)
//   })
// }
// const ClassQRCode = (resolve) => {
//   import('components/class/class-qrcode.vue').then((module) => {
//     resolve(module)
//   })
// }
// const SetupMain = (resolve) => {
//   import('components/setup/main.vue').then((module) => {
//     resolve(module)
//   })
// }
// const RoleChangeRole = (resolve) => {
//   import('components/role/change-role').then((module) => {
//     resolve(module)
//   })
// }
// const RoleBindRole = (resolve) => {
//   import('components/role/bind-code').then((module) => {
//     resolve(module)
//   })
// }
// const VipOpen = (resolve) => {
//   import('components/vip/open').then((module) => {
//     resolve(module)
//   })
// }
// const Check = (resolve) => {
//   import('components/bind/check').then((module) => {
//     resolve(module)
//   })
// }
// const GradeLS = (resolve) => {
//   import('components/grade/LS/grade').then((module) => {
//     resolve(module)
//   })
// }
// const GradeScoreDetail = (resolve) => {
//   import('components/grade/LS/score-detail').then((module) => {
//     resolve(module)
//   })
// }
// const GradeDegreeDetail = (resolve) => {
//   import('components/grade/LS/degree-detail').then((module) => {
//     resolve(module)
//   })
// }
const router = new Router({
  routes: [
    {
      path: '/role',
      components: {default: RoleChangeRole}
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'role',
          components: {default: RoleChangeRole}
        },
        {
          path: 'student',
          components: {default: HomeChangeStudent}
        }
      ]
    },
    {
      path: '/class',
      redirect: '/class/list',
      component: Class,
      children: [
        {
          path: 'list',
          components: {default: ClassList},
          children: [
            {
              path: 'qrcode/:id',
              components: {default: ClassQRCode}
            }
          ]
        },
        {
          path: 'create',
          components: {default: CreateClass}
        }
      ]
    },
    {
      path: '/qrcode',
      component: ClassQRCode
    },
    {
      path: '/c_d/:id',
      component: ClassDetail
    },
    {
      path: '/setup',
      component: SetupMain,
      children: [
        {
          path: 'bind/:code',
          components: {default: RoleBindRole}
        }
      ]
    },
    {
      path: '/open',
      component: VipOpen
    },
    {
      path: '/check',
      component: Check
    },
    {
      path: '/g_l/:sid/:cid',
      component: GradeLS
    },
    {
      path: '/g_sd/:id/:cid',
      name: 'g_sd',
      component: GradeScoreDetail
    },
    {
      path: '/g_dd/:id/:cid',
      name: 'g_dd',
      component: GradeDegreeDetail
    }
  ]
})
var RouteList = {
  '/home': true
}
var loadingInstance = ''
var loadingTimer = ''
router.beforeEach((to, from, next) => {
  if (RouteList[to.path]) {
    if (router.app.Loading) {
      if (!loadingInstance) loadingInstance = router.app.Loading()
      loadingInstance.show()
      clearTimeout(loadingTimer)
    }
  }
  next()
})
router.afterEach((to, from) => {
  if (RouteList[to.path]) {
    if (loadingInstance) {
      loadingTimer = setTimeout(() => {
        loadingInstance.hide()
      }, 500)
    }
    RouteList[to.path] = false
  }
})
export default router
