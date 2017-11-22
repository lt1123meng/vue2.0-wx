<template>
  <div class="class-list-wrapper">
    <div v-if="classList===''">
      loading
    </div>
    <div v-else-if="classList.length===0">
      没有数据
    </div>
    <div v-else class="class-item" v-for="item in classList">
      <div class="info-code">
        <div class="info">
          <div class="class-name">{{item.name}}</div>
          <div class="organize">{{item.orgname}}</div>
          <div class="subject">语文老师</div>
        </div>
        <div class="code">
          <div class="qr-code">
            <img class="qr" src="/src/static/qrcode.png">
          </div>
          <div class="text">
            标识：{{item.code}}
          </div>
        </div>
      </div>
      <div class="operate-wrapper">
        <div class="all">
          <span>已绑</span>
          <span v-if="item.teachernum!==0">老师{{item.teachernum}}人</span>
          <span v-if="item.parentnum!==0">家长{{item.parentnum}}人</span>
          <span v-if="item.stunum!==0">学生{{item.stunum}}人</span>
        </div>
        <div class="operate">
          <button class="modify">修改</button>
          <button class="exit">退出</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['classList']
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import '../../common/less/variable';
  @import '../../common/less/mixin';

  .class-list-wrapper {
    position: absolute;
    top: 56px;
    bottom: 51px;
    width: 100%;
    overflow: scroll;
    .class-item {
      margin-bottom: 10px;
      padding: 8px;
      background-color: #fff;
      .info-code {
        display: flex;
        margin-bottom: 16px;
        .info {
          flex: 1;
          line-height: 20px;
          .class-name {
            font-size: @font-size-medium-x;
            font-weight: bold;
          }
          .organize, .subject {
            font-size: 15px;
            color: @light-grey;
          }
        }
        .code {
          flex: 0 0 110px;
          text-align: center;
          .qr-code {
            margin: 0 auto;
            width: 36px;
            height: 36px;
            .qr {
              width: inherit;
              height: inherit;
            }
          }
          .text {
            margin: 4px 0 8px 0;
            color: @light-grey;
          }
        }
      }
      .operate-wrapper {
        display: flex;
        .all {
          flex: 1;
          line-height: 24px;
          font-size: @font-size-small;
          color: @light-grey;
        }
        .operate {
          flex: 0 0 110px;
          .modify {
            .button-bg(@blue-color);
            height: 24px;
            line-height: 24px;
            border-radius: 4px;
          }
          .exit {
            .button-bg(@light-grey);
            height: 24px;
            line-height: 24px;
            border-radius: 4px;
          }
        }
      }
    }
  }
</style>
