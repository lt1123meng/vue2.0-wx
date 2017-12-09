import Vue from 'vue'
import Router from 'vue-router'

// import Home from 'components/home/home'
// import RoleChangeRole from 'components/home/change-role'
Vue.use(Router)

const Home = (resolve) => {
  import('components/home/home').then((module) => {
    resolve(module)
  })
}
const HomeChangeStudent = (resolve) => {
  import('components/home/change-student').then((module) => {
    resolve(module)
  })
}
const Class = (resolve) => {
  import('components/class/class').then((module) => {
    resolve(module)
  })
}
const ClassList = (resolve) => {
  import('components/class/class-list').then((module) => {
    resolve(module)
  })
}
const CreateClass = (resolve) => {
  import('components/class/create-class.vue').then((module) => {
    resolve(module)
  })
}
const SetupMain = (resolve) => {
  import('components/setup/main.vue').then((module) => {
    resolve(module)
  })
}
const RoleChangeRole = (resolve) => {
  import('components/role/change-role').then((module) => {
    resolve(module)
  })
}
const RoleBindRole = (resolve) => {
  import('components/role/bind-code').then((module) => {
    resolve(module)
  })
}
const VipOpen = (resolve) => {
  import('components/vip/open').then((module) => {
    resolve(module)
  })
}
export default new Router({
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
          components: {default: ClassList}
        },
        {
          path: 'create',
          components: {default: CreateClass}
        }
      ]
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
    }
  ]
})
