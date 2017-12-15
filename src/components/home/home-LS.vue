<template>
  <div class="home-ls-wrapper">
    <div class="header-wrapper">
      <div class="photo-wrapper">
        <img class="photo" :src="info.userimgurl">
      </div>
      <div class="info-wrapper">
        <div class="name">
          <span class="text">{{info.name}}</span>
        </div>
        <div class="class-subject">
          <span class="class">早培三班</span>
          <span class="subject">语文老师</span>
        </div>
        <div class="class-detail">
          详细班级
        </div>
      </div>
      <div class="choose-role">
        <button class="button" @click="chooseRole">
          切换角色
        </button>
      </div>
    </div>
    <div class="wait-examine">
      有3位学生的绑定等待老师审核，点击查看详情
    </div>
    <div class="integrate-wrapper">
      <div class="integrate wrapper">
        <p class="text">{{integrate.point}}</p>
        <p class="text">积分</p>
      </div>
      <div class="ranking-list wrapper">
        <p class="text">园钉</p>
        <p class="text">排行榜</p>
      </div>
      <div class="vip wrapper">
        <router-link tag="button" :to="'open'" class="button">
          开通VIP
          <span class="tag">HOT</span>
        </router-link>
      </div>
    </div>
    <menu-list :menu="menu"></menu-list>
    <div class="common-data-wrapper">
      <div class="nav-wrapper">
        <div class="box-wrapper" @click="navSelected='1'">
          <span class="text" :class="{'active':navSelected=='1'}">通知</span>
        </div>
        <div class="box-wrapper" @click="navSelected='2'">
          <span class="text" :class="{'active':navSelected=='2'}">作业</span>
        </div>
        <div class="box-wrapper" @click="navSelected='3'">
          <span class="text" :class="{'active':navSelected=='3'}">投票</span>
        </div>
        <div class="box-wrapper" @click="navSelected='4'">
          <span class="text" :class="{'active':navSelected=='4'}">常规</span>
        </div>
        <div class="box-wrapper" @click="navSelected='5'">
          <span class="text" :class="{'active':navSelected=='5'}">风采</span>
        </div>
      </div>
      <div class="nav-content" ref="container">
        <div class="wrapper" v-if="navSelected=='1'">
          <inform-list></inform-list>
        </div>
        <div class="wrapper" v-if="navSelected=='2'"></div>
        <div class="wrapper" v-if="navSelected=='3'"></div>
        <div class="wrapper" v-if="navSelected=='4'"></div>
        <div class="wrapper" v-if="navSelected=='5'"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import MenuList from 'base/menu-list/menu-list'
  import InformList from 'components/inform/list'
  import {MenusLS} from 'common/js/data'
  import {mapGetters} from 'vuex'
  //  import Toast from '../../common/plugins/TopTip'
  export default {
    data() {
      return {
        centerShow: false,
        scroll: '',
        calendarShow: false,
        menu: MenusLS,
        navSelected: '1'
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this._initHeight()
      })
    },
    computed: {
      ...mapGetters(['ratio', 'crid', 'role', 'info', 'integrate'])
    },
    methods: {
      calenderClick() {
        this.$emit('calenderClick')
      },
      chooseRole() {
        if (this.role.length === 2) {
          this.$router.push('/home/role')
        }
      },
      _initHeight() {
        this.$refs.container.style.height = window.innerHeight - 50 - 36 + 'px'
        this.$refs.container.style.overflow = 'scroll'
        this.$refs.container.style.position = 'relative'
      }
    },
    components: {
      MenuList,
      InformList
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/variable";
  @import "../../common/less/mixin.less";

  .home-ls-wrapper {
    position: absolute;
    top: 0px;
    bottom: 50px;
    width: 100%;
    overflow: scroll;
    .header-wrapper {
      display: flex;
      padding: 14px 8px;
      background-color: #fff;
      .border-1px();
      .photo-wrapper {
        flex: 0 0 60px;
        .photo {
          width: 54px;
          height: 54px;
          border-radius: 50%;
        }
      }
      .info-wrapper {
        flex: 1;
        line-height: 17px;
        .name {
          position: relative;
          top: -2px;
          .text {
            vertical-align: middle;
            font-size: @font-size-medium-x;
            font-weight: bold;
          }
          .img {
            height: 16px;
            width: 16px;
            vertical-align: middle;
          }
        }
        .class-subject {
          margin-top: 3px;
          font-size: 15px;
          color: @light-grey;
          font-weight: bold;
        }
        .class-detail {
          position: relative;
          top: 2px;
          color: @blue-color;
        }
      }
      .choose-role {
        flex: 0 0 84px;
        text-align: right;
        .button {
          .button-bg(@blue-color);
          width: 78px;
        }
      }
    }
    .wait-examine {
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fff;
      color: @light-grey;
    }
    .integrate-wrapper {
      display: flex;
      margin: 8px 0;
      padding: 16px 0;
      box-sizing: border-box;
      background-color: #fff;
      text-align: center;
      .wrapper {
        flex: 1;
        border-right: 1px dashed @light-grey;
        &:last-of-type {
          border-width: 0;
        }
        .text {
          position: relative;
          top: -4px;
          line-height: 16px;
          vertical-align: top;
          color: @light-grey;
          font-size: 15px;
          font-weight: bold;
          &:last-of-type {
            vertical-align: bottom;
            top: 4px;
          }
        }
        .button {
          position: relative;
          .button-bg(@blue-color);
        }
      }
    }
    .common-data-wrapper {
      margin-top: 8px;
      .nav-wrapper {
        display: flex;
        background-color: #fff;
        .box-wrapper {
          flex: 1;
          text-align: center;
          .text {
            display: inline-block;
            height: 36px;
            line-height: 36px;
            &.active {
              color: @blue-color;
              border-bottom: 3px solid @blue-color;
              box-sizing: border-box;
            }
          }
        }
      }
      .mint-tab-container {
        min-height: 300px;
      }
    }
    .tag {
      position: absolute;
      top: -8px;
      right: -14px;
      padding: 4px 7px;
      height: 21px;
      line-height: 14px;
      background-color: #ff6e67;
      color: #fff;
      font-size: 12px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-radius: 10px;
      min-width: 21px;
      transform: scale(0.7);
    }
  }
</style>
