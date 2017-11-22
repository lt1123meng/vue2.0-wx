<template>
  <div class="home-jz-wrapper">
    <div class="search-wrapper">
      <div class="schedule-box" @click="calenderClick">
        <img class="icon" v-lazy="'/src/static/icon/icon-list.png'">
      </div>
      <div class="search-box">
        <div class="inner-box">
          <img src="" alt="">
          <span class="text">搜索</span>
        </div>
      </div>
      <div class="me-box" @click="chooseRole">
        <img class="icon" v-lazy="'/src/static/icon/icon-user.png'">
      </div>
    </div>
    <div class="poster-wrapper">
      <img v-lazy="'/src/static/poster/index.jpg'" width="100%">
    </div>
    <div class="student-wrapper">
      <div class="box">
        <div class="name">当前角色：{{}}</div>
        <div class="class">{{}}</div>
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        info: {},
        centerShow: false,
        scroll: '',
        calendarShow: false
      }
    },
    created: function () {
    },
    computed: {
      ...mapGetters(['ratio', 'crid', 'role'])
    },
    methods: {
      calenderClick () {
        this.$emit('calenderClick')
      },
      chooseRole () {
        if (this.role.length === 2) {
          this.$router.push('/home/role')
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/variable";

  .home-jz-wrapper {
    padding-top: 38px;
    .search-wrapper {
      position: fixed;
      top: 0;
      width: 100%;
      display: flex;
      display: -webkit-flex;
      text-align: center;
      height: 38px;
      line-height: 38px;
      background-color: #fff;
      .schedule-box {
        flex: 0 0 40px;
        -webkit-flex: 0 0 40px;
        .icon {
          width: 16px;
          vertical-align: sub;;
        }
      }
      .search-box {
        flex: 1;
        -webkit-flex: 1;
        padding: 6px 0;
        box-sizing: border-box;
        .inner-box {
          border-radius: 4px;
          height: 26px;
          line-height: 28px;
          background-color: rgba(7, 17, 27, 0.15);
        }
      }
      .me-box {
        flex: 0 0 40px;
        -webkit-flex: 0 0 40px;
        .icon {
          width: 16px;
          vertical-align: sub;
        }
      }
    }
    .student-wrapper {
      .box {
        display: flex;
        padding: 0 12px;
        box-sizing: border-box;
        line-height: 32px;
        background-color: #fff;
        color: @light-grey;
        .name {
          flex: 1px;
        }
        .class {
          flex: 1;
          text-align: right;
        }
      }
    }
  }
</style>
