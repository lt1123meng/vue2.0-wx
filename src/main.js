// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import {Loadmore, Lazyload, InfiniteScroll} from 'mint-ui'

import App from './App'
import router from './router'
import store from './store'
import './common/less/index.less'
import TopTip from 'common/plugins/TopTip'
import Dialog from 'common/plugins/Dialog'
import Loading from 'common/plugins/Loading'

Vue.use(InfiniteScroll)
Vue.use(Lazyload)
Vue.component(Loadmore.name, Loadmore)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  methods: {
    TopTip,
    Loading
  },
  data() {
    return {
      Dialog
    }
  }
})
