<template>
  <div class="create-class-wrapper">
    <div class="box-wrapper">
      <div class="title">
        班级信息
      </div>
      <div class="item-wrapper">
        <div class="name">输入班级标识：</div>
        <div class="input-wrapper">
          <input class="input" type="text">
        </div>
        <div class="button">查询班级</div>
      </div>
      <div class="item-wrapper">
        {{}}
      </div>
    </div>
    <div class="box-wrapper">
      <div class="title">我的科目</div>
      <div class="item-wrapper">
        <div class="name">选择科目：</div>
        <div class="input-wrapper"></div>
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/variable";
  @import "../../common/less/mixin";

  .create-class-wrapper {
    position: absolute;
    top: 56px;
    bottom: 51px;
    padding-left: 12px;
    box-sizing: border-box;
    width: 100%;
    overflow: scroll;
    background-color: #fff;
    .box-wrapper {
      .title {
        margin: 8px 0;
        height: 30px;
        line-height: 30px;
        font-weight: bold;
      }
      .item-wrapper {
        display: flex;
        margin-bottom: 12px;
        height: 36px;
        line-height: 36px;
        .border-1px();
        .name {
          flex: 0 0 100px;
          color: @light-grey;
        }
        .input-wrapper {
          flex: 1;
          .input {
            width: 100%;
            height: 36px;
            outline: 0;
          }
        }
        .button {
          flex: 0 0 80px;
          .button-bg(@blue-color);
          height: 36px;
          line-height: 38px;
          border-radius: 0px;
        }
      }
    }
  }
</style>
