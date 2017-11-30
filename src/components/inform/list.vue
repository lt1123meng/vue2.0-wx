<template>
  <load-more :top="top" :finish="finish" ref="loadmore">
    <div class="inform-item-wrapper">
      <div class="item-wrapper" v-for="item in list">
        <div class="class-name">
          <div class="text">{{item.className}}</div>
        </div>
        <div class="content-wrapper">
          <div class="title-image" v-if="item.titleImg">
            <img class="image" :src="item.titleImg" alt="">
          </div>
          <div class="detail-wrapper">
            <div class="name-time">
              <div class="name-subject">
                <span class="name">{{item.nickName}}</span>
                <span>({{item.roleName}})</span>
              </div>
              <div class="time">{{item.time}}</div>
            </div>
            <div class="content">
              {{item.content}}
            </div>
          </div>
        </div>
        <div class="tail-wrapper" v-if="item.notReadUsers.length!==0">
          <div class="detail">
          <span v-for="(stu,index) in item.notReadUsers">
            <span>{{stu.student_name}}</span>
            <span v-if="index<item.notReadUsers.length-1">,</span>
          </span>
          </div>
          <div class="all">未读：{{item.notReadUsers.length}}</div>
        </div>
      </div>
    </div>
  </load-more>
</template>
<script type="text/ecmascript-6">
  import LoadMore from 'base/loadmore/loadmore'
  import {getInformList} from 'api/inform'
  export default {
    data () {
      return {
        list: '',
        finish: true,
        top: false
      }
    },
    created () {
      this.requesting = false
    },
    methods: {
      _initLoadMoreList (tag) {
        if (tag) {
          this.top = false
          this.list = ''
          this.finish = false
        }
        if (this.requesting) return
        this.requesting = true
        getInformList({
          limit: 5,
          type: 'lode',
          recordtime: this.list.length === 0 ? new Date().toDateString() : this.list[this.list.length - 1].createTime
        }).then((res) => {
          this.requesting = false
          this.top = true
          res = res.data
          if (this.list === '') {
            this.list = JSON.parse(res)
          } else {
            this.list = this.list.concat(JSON.parse(res))
          }
          if (JSON.parse(res).length < 5) {
            this.finish = true
          } else {
            this.finish = false
          }
          if (tag) {
            this.$refs.loadmore.onTopLoaded()
          }
        })
      }
    },
    components: {
      LoadMore
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/variable";
  @import "../../common/less/mixin";

  .inform-item-wrapper {
    .item-wrapper {
      position: relative;
      padding: 6px;
      box-sizing: border-box;
      border-radius: 4px;
      margin-bottom: 16px;
      background-color: #fff;
      &:after {
        content: '';
        position: absolute;
        left: 0px;
        right: 0px;
        height: 10px;
        bottom: -6px;
        z-index: 2;
        background: radial-gradient(transparent 0px, transparent 6px, white 4px, white);
        background-size: 20px 20px;
        background-position: 0px 0px;
        border-radius: 4px;
      }
      .class-name {
        height: 32px;
        line-height: 32px;
      }
      .content-wrapper {
        padding: 4px 0;
        .border-top-1px();
        display: flex;
        .title-image {
          flex: 0 0 60px;
          .image {
            width: 42px;
            height: 42px;
            border-radius: 2px;
            vertical-align: top;
          }
        }
        .detail-wrapper {
          flex: 1;
          padding: 4px 0;
          width: 100%;
          .name-time {
            display: flex;
            padding: 4px 0;
            .name-subject {
              flex: 1;
              .subject {
                color: @light-grey;
              }
            }
            .time {
              flex: 0 0 80px;
              font-size: @font-size-small;
              color: @light-grey;
            }
          }
          .content {
            text-indent: 2em;
            .no-wrap();
          }
        }
      }
      .tail-wrapper {
        .border-top-1px();
        display: flex;
        height: 32px;
        line-height: 32px;
        .detail {
          flex: 1;
          .no-wrap();
        }
        .all {
          flex: 0 0 60px;
          color: @red-color;
        }
      }
    }
  }
</style>
