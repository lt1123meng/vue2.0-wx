<template>
  <div class="class-wrapper">
    <div class="header-wrapper">
      <div class="box">
        <router-link tag="div" class="class-list" active-class="active" to="/class/list">
          <span class="text">我的班级</span>
          <div class="bg"></div>
        </router-link>
        <router-link tag="div" class="create-class" active-class="active" to="/class/create">
          <span class="text">快速创班</span>
        </router-link>
      </div>
    </div>
    <router-view :classList="classList"></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getClass} from 'api/class'
  export default {
    data () {
      return {
        classList: ''
      }
    },
    created () {
      this._initClass()
    },
    methods: {
      _initClass () {
        getClass().then((response) => {
          this.classList = response.data
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import '../../common/less/variable';

  .class-wrapper {
    .header-wrapper {
      position: absolute;
      top: 0;
      height: 56px;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      .box {
        display: flex;
        margin: 0 auto;
        width: 80%;
        height: 36px;
        line-height: 36px;
        border-radius: 4px;
        background-color: #fff;
        overflow: hidden;
        .class-list, .create-class {
          position: relative;
          flex: 1;
          text-align: center;
          .text {
            position: inherit;
            z-index: 2;
          }
          .bg {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 100%;
            width: 100%;
            background-color: @blue-color;
            transition: all .3s;
          }
          &.active {
            color: #fff;
            .bg {
              left: 0;
            }
          }
        }
      }
    }
  }
</style>
