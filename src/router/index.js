import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/home/home'
// import HomeChangeRole from 'components/home/change-role'
Vue.use(Router)

// const Home = (resolve) => {
//   import('components/home/home').then((module) => {
//     resolve(module)
//   })
// }
const HomeChangeRole = (resolve) => {
  import('components/home/change-role').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'role',
          components: {default: HomeChangeRole}
        }
      ]
    }
  ]
})
