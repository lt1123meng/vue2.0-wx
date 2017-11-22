<template>
  <div>
    <home-jz v-show="crid==='JZ'||crid==='BR'" @calenderClick="calenderClick"></home-jz>
    <home-ls v-show="crid==='LS'" @calenderClick="calenderClick"></home-ls>
    <transition name="change">
      <router-view></router-view>
    </transition>
    <calendar v-show="calendarShow" @calendarChoose="calendarChoose"></calendar>
  </div>
</template>
<script type="text/ecmascript-6">
  import Calendar from 'base/calendar/calendar'
  import HomeLs from 'components/home/home-LS'
  import HomeJz from 'components/home/home-JZ'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        calendarShow: false
      }
    },
    created: function () {
      this._chooseRole()
    },
    computed: {
      ...mapGetters(['role', 'crid'])
    },
    methods: {
      calenderClick () {
        this.calendarShow = !this.calendarShow
      },
      calendarChoose (date) {
        this.calendarShow = false
      },
      _chooseRole () {
        if (this.role.length === 2) {
          this.$router.push('/home/role')
        }
      }
    },
    watch: {
      role: function (newValue, oldValue) {
        this._chooseRole()
      }
    },
    components: {
      Calendar,
      HomeLs,
      HomeJz
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
</style>
