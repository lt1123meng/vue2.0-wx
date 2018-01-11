<template>
  <div class="check-outer-wrapper">
    <div class="content-wrapper">
      <audited ref="audited" :audited="audited" @checkList="getCheckList"></audited>
    </div>
    <div class="tail-wrapper">
      <div class="check" @click.prevent="check()">
        <span class="icon" :class="{active:checkAll}"></span>
        <span class="text">全选</span>
      </div>
      <div class="content"></div>
      <div class="button refuse">
        拒绝({{checkList.length}})
      </div>
      <div class="button pass">
        通过({{checkList.length}})
      </div>
    </div>
  </div>

</template>

<script>
  import Audited from 'base/wait-bind/wait-bind'
  import {getAuditedList} from 'api/bind'

  export default {
    name: 'check',
    data() {
      return {
        audited: [],
        checkAll: false,
        checkList: []
      }
    },
    created() {
      this._getAuditedList()
    },
    methods: {
      check() {
        this.$refs.audited.check()
      },
      getCheckList(list, tag) {
        this.checkList = list
        this.checkAll = tag
      },
      _getAuditedList() {
        getAuditedList().then((res) => {
          res = res.data
          this.audited = res
        })
      }
    },
    components: {
      Audited
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/less/variable";
  @import "../../common/less/mixin.less";

  .check-outer-wrapper {
    position: absolute;
    top: 0;
    bottom: 50px;
    width: 100%;
    z-index: 99;
    .content-wrapper {
      .border-1px();
      position: absolute;
      top: 0;
      bottom: 50px;
      width: 100%;
    }
    .tail-wrapper {
      position: absolute;
      bottom: 0px;
      display: flex;
      height: 50px;
      line-height: 50px;
      width: 100%;
      background: #fff;
      .check {
        flex: 0 0 66px;
        font-size: 0;
        text-align: center;
        .icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 19px;
          border: 1px solid @light-grey;
          border-radius: 50%;
          box-sizing: border-box;
          vertical-align: middle;
          font-size: 12px;
          &.active {
            border: 1px solid @blue-color;
            background-color: @blue-color;
            color: #fff;
            &:before {
              content: '✔';
            }
          }
        }
        .text {
          display: inline-block;
          margin-left: 4px;
          height: 20px;
          line-height: 20px;
          vertical-align: middle;
          font-size: 13px;
          color: @light-grey;
        }
      }
      .content {
        flex: 1;
      }
      .button {
        flex: 0 0 88px;
        width: 100%;
        height: 100%;
        line-height: 50px;
        color: #fff;
        border-radius: 0;
        background: linear-gradient(to right, #9fd7f2, #1c95d3);
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        &.refuse {
          background: linear-gradient(to right, #f2c59f, #d3661c);
        }
      }
    }
  }

</style>
