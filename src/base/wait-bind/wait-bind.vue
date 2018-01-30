<template>
  <div class="wait-bind">
    <div class="class-wrapper" v-if="audited.length!==0" v-for="list in audited" :key="list.className">
      <div class="title-wrapper" @click="goClassDetail(list)">
        <div class="check">
          <span class="icon" :class="{active:list.check}" @click.prevent.stop="check(list)"></span>
        </div>
        <div class="name">
          {{list.className}}
        </div>
        <div class="next">
          <img class="icon" src="/static/image/icon/icon-back.png">
        </div>
      </div>
      <div class="audited-list">
        <div class="item-wrapper" v-for="item in list.auditList" :key="item.id">
          <div class="check">
            <span class="icon" :class="{active:item.check}" @click="check(item,list)"></span>
          </div>
          <div class="name">
            <div>
              {{item.stuname}}
              {{item.rolename}}
            </div>
            <div>{{item.stucode}}</div>
          </div>
          <div class="time">
            {{item.create_time|date('yyyy-MM-dd hh-mm-ss')}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wait-bind',
    data() {
      return {
        checkAll: false
      }
    },
    props: {
      audited: {
        default: [],
        type: Array
      }
    },
    methods: {
      goClassDetail(list) {
        this.$router.push(`/c_d/${list.auditList[0].class_id}`)
      },
      check(data, list) {
        if (data) {
          if (data.id) {
            if (data.check) {
              data.check = false
              list.check = false
              this.checkAll = false
            } else {
              data.check = true
              list.check = true
              for (let i = 0; i < list.auditList.length; i++) {
                if (!list.auditList[i].check) {
                  list.check = false
                }
              }
            }
          } else {
            if (data.check) {
              data.check = false
              this.checkAll = false
              for (let i = 0; i < data.auditList.length; i++) {
                data.auditList[i].check = false
              }
            } else {
              data.check = true
              for (let i = 0; i < data.auditList.length; i++) {
                data.auditList[i].check = true
              }
            }
          }
          this.checkAll = true
          for (let i = 0; i < this.audited.length; i++) {
            if (!this.audited[i].check) {
              this.checkAll = false
            }
          }
        } else {
          let tag = false
          if (this.checkAll) {
            tag = false
          } else {
            tag = true
          }
          this.checkAll = tag
          for (let i = 0; i < this.audited.length; i++) {
            this.audited[i].check = tag
            for (let j = 0; j < this.audited[i].auditList.length; j++) {
              this.audited[i].auditList[j].check = tag
            }
          }
        }
        this._checkList()
        this.$forceUpdate()
      },
      _checkList() {
        var list = []
        for (let i = 0; i < this.audited.length; i++) {
          for (let j = 0; j < this.audited[i].auditList.length; j++) {
            if (this.audited[i].auditList[j].check) {
              list.push(this.audited[i].auditList[j])
            }
          }
        }
        this.$emit('checkList', list, this.checkAll)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/less/variable";
  @import "../../common/less/mixin.less";

  .wait-bind {
    .class-wrapper {
      margin-bottom: 12px;
      background-color: #fff;
      .title-wrapper {
        display: flex;
        height: 42px;
        line-height: 42px;
        .border-1px();
        .check {
          flex: 0 0 40px;
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
        }
        .name {
          font-size: 13px;
          line-height: 43px;
        }
        .next {
          width: 24px;
          text-align: center;
          .icon {
            width: 12px;
            vertical-align: middle;
            transform: rotate(180deg);
          }
        }
      }
      .audited-list {
        .item-wrapper {
          display: flex;
          .check {
            .title-wrapper .check();
            .icon {
              margin-top: 22px;
            }
          }
          .name {
            flex: 1;
            padding: 8px 6px 8px 0;
            line-height: 24px;
            .border-1px();
          }
          .time {
            flex: 0 0 80px;
            font-size: 13px;
            text-align: center;
            padding: 18px 0;
            .border-1px();
          }
          &:last-of-type {
            .name, .time {
              .border-0px();
            }
          }
        }
      }
    }
  }
</style>
