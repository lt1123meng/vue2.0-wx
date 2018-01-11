<template>
  <div class="all-outer-wrapper">
    <div class="all-container" ref="container">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <footer class="footer" ref="footerLS" v-show="crid==='LS'">
      <div class="nav-wrapper">
        <router-link tag="div" active-class="active" class="icon-wrapper" to="/home">
          <img class="able img" :src="'/src/static/footer/nav-home@'+ratio+'x.png'">
          <img class="disable img" :src="'/src/static/footer/nav-dishome@'+ratio+'x.png'">
          <p>首页</p>
        </router-link>
      </div>
      <div class="nav-wrapper">
        <router-link tag="div" active-class="active" class="icon-wrapper" to="/class">
          <img class="able img" :src="'/src/static/footer/nav-user@'+ratio+'x.png'">
          <img class="disable img" :src="'/src/static/footer/nav-disuser@'+ratio+'x.png'">
          <p>班级</p>
        </router-link>
      </div>
      <div class="nav-wrapper">
        <router-link tag="div" active-class="active" class="icon-wrapper" to="/setup">
          <img class="able img" :src="'/src/static/footer/nav-setup@'+ratio+'x.png'">
          <img class="disable img" :src="'/src/static/footer/nav-dissetup@'+ratio+'x.png'">
          <p>设置</p>
        </router-link>
      </div>
    </footer>
    <footer class="footer" ref="footerXS" v-show="crid==='JZ'||crid==='BR'">
      <div class="nav-wrapper">
        <router-link tag="div" active-class="active" class="icon-wrapper" to="/home">
          <img class="able img" :src="'/src/static/footer/nav-home@'+ratio+'x.png'">
          <img class="disable img" :src="'/src/static/footer/nav-dishome@'+ratio+'x.png'">
          <p>首页</p>
        </router-link>
      </div>
      <div class="nav-wrapper">
        <router-link tag="div" active-class="active" class="icon-wrapper" to="/message">
          <img class="able img" :src="'/src/static/footer/nav-user@'+ratio+'x.png'">
          <img class="disable img" :src="'/src/static/footer/nav-disuser@'+ratio+'x.png'">
          <p>消息</p>
        </router-link>
      </div>
      <div class="nav-wrapper">
        <router-link tag="div" active-class="active" class="icon-wrapper" to="/setup">
          <img class="able img" :src="'/src/static/footer/nav-setup@'+ratio+'x.png'">
          <img class="disable img" :src="'/src/static/footer/nav-dissetup@'+ratio+'x.png'">
          <p>设置</p>
        </router-link>
      </div>
    </footer>
    <img src="/src/static/loading.gif" style="z-index: -10000" alt="">
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  import {getBaseInfo, getRole, getIntegrate, getVipInfo} from 'api/base'
  export default {
    name: 'app',
    created() {
      this.hash = location.hash
    },
    mounted() {
      document.body.style.height = window.innerHeight + 'px'
      this.$refs.container.style.height = window.innerHeight + 'px'
      this.$refs.footerLS.style.top = window.innerHeight - 50 + 'px'
      this.$refs.footerXS.style.top = window.innerHeight - 50 + 'px'
      var ratio = window.devicePixelRatio || 1
      ratio < 3 ? ratio = 2 : ratio = 3
      this.setRatio = ratio
      if (this.$route.query.oid) {
        if (this.$route.query.oid) sessionStorage.oid = this.$route.query.oid
        if (this.$route.query.crid) sessionStorage.crid = this.$route.query.crid
      }
      this.setOID(sessionStorage.oid)
      this.setCRID(sessionStorage.crid)
      this._getBaseInfo()
      this._getRole()
      this._getIntegrate()
    },
    methods: {
      _getBaseInfo() {
        getBaseInfo().then((res) => {
          this.setInfo(res.data)
        })
      },
      _getRole() {
        getRole().then((res) => {
          this.setRole(res)
          if (res.length === 1) {
            sessionStorage.crid = res[0]
            this.setCRID(res[0])
            this._getVIPInfo()
            if (this.$route.query.route) {
              this.$router.replace(this.$route.query.route)
            } else {
              if (this.hash.split('?')[0].length === 2) {
                this.$router.replace('/home')
              }
            }
          } else {
            if (!sessionStorage.crid) {
              this.$router.replace('/role')
            } else {
              if (this.$route.query.route) {
                this.$router.replace(this.$route.query.route)
              } else {
                if (this.hash.split('?')[0].length === 2) {
                  this.$router.replace('/home')
                }
              }
              this._getVIPInfo()
            }
          }
        })
      },
      _getIntegrate() {
        getIntegrate().then((res) => {
          this.setIntegrate(res)
        })
      },
      _getVIPInfo() {
        getVipInfo(this.crid, this)
      },
      ...mapMutations({
        setRatio: 'SET_RATIO',
        setOID: 'SET_OID',
        setInfo: 'SET_INFO',
        setRole: 'SET_ROLE',
        setCRID: 'SET_CRID',
        setVIPTEA: 'SET_VIPTEA',
        setVIPPAR: 'SET_VIPPAR',
        setIntegrate: 'SET_INTEGRATE',
        setStudent: 'SET_STUDENT'
      })
    },
    computed: {
      ...mapGetters(['ratio', 'oid', 'crid', 'viptea', 'vippar', 'info', 'role', 'integrate'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "common/less/variable.less";
  @import "common/less/mixin.less";

  .all-outer-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #EEEEEE;
  }

  .all-container {
    position: absolute;
    top: 0;
    bottom: 0;
    padding-bottom: 50px;
    width: 100%;
    overflow: scroll;
    box-sizing: border-box;
    background-color: #EEEEEE;
  }

  .footer {
    position: relative;
    height: 50px;
    width: 100%;
    display: flex;
    font-size: 12px;
    border-top: 1px solid @border-color;
    background-color: #fff;
    box-sizing: border-box;
    z-index: 40;
    .nav-wrapper {
      flex: 1;
      .icon-wrapper {
        text-align: center;
        color: #929292;
        .img {
          margin: 5px auto 3px;
          width: 24px;
          height: 24px;
        }
        .able {
          display: none;
        }
        .disable {
          display: block;
        }
        &.active {
          color: @blue-color;
          .able {
            display: block;
          }
          .disable {
            display: none;
          }
        }
      }
    }
  }

  .bg-green {
    width: 100%;
    background-color: @green-color;
    color: #fff;
  }
</style>
