/**
 * Created by LX on 2017/9/1.
 */
import {mapGetters} from 'vuex'

export const backHome = {
  computed: {
    ...mapGetters(['oid'])
  },
  created: function () {
    if (!this.oid) {
      this.$router.replace({
        path: '/home',
        query: {oid: sessionStorage.oid}
      })
      console.log(this)
      this.$destroy()
      return
    }
  }
}
