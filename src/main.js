// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import {Loadmore, Lazyload, InfiniteScroll, Switch} from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'
import './common/less/index.less'
import TopTip from 'common/plugins/TopTip'
import Dialog from 'common/plugins/Dialog'
import Loading from 'common/plugins/Loading'
import {formatDate} from 'common/js/filter'
import LLoading from 'base/loading/loading'
import LEmpty from 'base/empty/empty'

Vue.use(InfiniteScroll)
Vue.use(Lazyload)
Vue.component(Switch.name, Switch)
Vue.component(Loadmore.name, Loadmore)
Vue.component(LLoading.name, LLoading)
Vue.component(LEmpty.name, LEmpty)

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.filter('date', (time, format) => {
  if (time) {
    let date = new Date(time)
    let formated = formatDate(date, format)
    return formated
  } else {
    return ''
  }
})
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
