<template>
  <div>
    <div class="header-description-wrapper">
      <div class="header-wrapper">
        <div class="info-wrapper">
          <p class="name">
            <span>{{name}}</span>
          </p>
          <p class="class-name">
            <span>{{baseInfo.className}} </span>
          </p>
        </div>
        <div class="quick-nav" @click.stop="navClick" v-if="headerNavShow">
              <span class="text">
                快速导航
              </span>
          <span class="icon">></span>
        </div>
      </div>
      <div class="description-wrapper">
        <p class="title">
          {{baseInfo.name}}
        </p>
        <p class="description">
          {{baseInfo.description}}
        </p>
        <p class="time">
          {{parseInt(baseInfo.time)|date('yyyy-MM-dd hh:mm:ss')}}
        </p>
      </div>
    </div>
    <div class="quick-nav-wrapper" v-show="navShow" @touchstart="navClick">
      <div class="quick-top-wrapper">
        <div class="info-wrapper">
          <p class="name">
            <span>{{name}}</span>
          </p>
          <p class="class-name">
            <span>{{baseInfo.className}} </span>
          </p>
        </div>
        <div class="quick-nav">
              <span class="text">
                快速导航
              </span>
          <span class="icon">></span>
        </div>
      </div>
      <div class="quick-content-wrapper">
        <div class="content-wrapper">
          <div class="box" @touchstart.stop @click.stop="sliderTo('1')" :class="{'active':active==='1'}">成绩概览</div>
          <div class="box" @touchstart.stop @click.stop="sliderTo('2')" :class="{'active':active==='2'}">分数段分布图</div>
          <div class="box" @touchstart.stop @click.stop="sliderTo('3')" :class="{'active':active==='3'}">班级比较</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'header',
    props: {
      name: {
        default: ''
      },
      baseInfo: {
        default: {},
        type: Object,
        required: true
      },
      active: {
        default: '0'
      }
    },
    data() {
      return {
        headerNavShow: false,
        navShow: false
      }
    },
    mounted() {
      if (this.active !== '0') {
        this.headerNavShow = true
      }
    },
    methods: {
      navClick() {
        this.navShow = !this.navShow
      },
      sliderTo(index) {
        this.$emit('navClick', index)
        this.navShow = false
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../common/less/variable';

  .header-description-wrapper {
    .header-wrapper {
      display: flex;
      background-color: @blue-color;
      color: #fff;
      padding: 8px;
      box-sizing: border-box;
      .info-wrapper {
        flex: 1;
        line-height: 24px;
        .name {
          font-size: @font-size-medium-x;
          font-weight: bold;
        }
      }
      .quick-nav {
        flex: 0 0 86px;
        line-height: 48px;
        text-align: center;
        font-size: 0;
        .text {
          display: inline-block;
          margin-right: 4px;
          vertical-align: middle;
          font-size: @font-size-medium;
        }
        .icon {
          display: inline-block;
          font-size: 18px;
          vertical-align: middle;
          transform: rotate(90deg);
        }
      }
    }
    .description-wrapper {
      padding: 8px;
      background-color: #fff;
      text-indent: 2em;
      line-height: 1.6;
      .title {
        font-weight: bold;
      }
      .description {
        margin: 4px 0;
      }
      .time {
        color: @light-grey;
        text-align: right;
      }
    }
  }

  .quick-nav-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(7, 17, 27, 0);
    z-index: 9;
    .quick-top-wrapper {
      .header-description-wrapper .header-wrapper();
    }
    .quick-content-wrapper {
      position: absolute;
      top: 64px;
      bottom: 0;
      width: 100%;
      background-color: rgba(7, 17, 27, 0.2);
      .content-wrapper {
        padding: 12px;
        box-sizing: border-box;
        background-color: #fff;
        .box {
          display: inline-block;
          padding: 10px 12px;
          background-color: rgba(7, 17, 27, 0.2);
          font-size: 12px;
          margin: 7px;
          &.active {
            color: @blue-color;
          }
        }
      }
    }
  }
</style>
