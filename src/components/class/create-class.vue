<template>
  <div class="create-class-list">
    <div class="address-wrapper">
      <city></city>
    </div>
    <div class="info-wrapper">
      <div class="item-wrapper">
        <div class="name">学校名称</div>
        <div class="input-wrapper">
          <input class="input" type="text">
        </div>
      </div>
      <div class="item-wrapper">
        <div class="name">班级名称</div>
        <div class="input-wrapper">
          <input class="input" type="text">
        </div>
      </div>
    </div>
    <div class="info-wrapper subject-wrapper">
      <div class="item-wrapper">
        <div class="name">选择科目</div>
        <div class="input-wrapper">
          <i-select :data="subject" ref="select"></i-select>
        </div>
      </div>
    </div>
    <div class="button-wrapper">
      <div class="box">立即创建</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getSubject} from 'api/base'
  import City from 'base/city/city'
  import iSelect from 'base/select/iSelect'
  export default {
    data () {
      return {
        sheetVisible: false,
        subject: [],
        selected: ''
      }
    },
    created () {
      this._initSubject()
    },
    methods: {
      _initSubject () {
        getSubject().then((data) => {
          this.selected = data[0]
          let subject = []
          for (let i = 0; i < data.length; i++) {
            let obj = {}
            obj.name = data[i].value
            obj.method = this._chooseThisSubject
            subject.push(obj)
          }
          this.subject = subject
        })
      },
      _chooseThisSubject (subject) {
        console.log(subject)
        this.selected = subject
      }
    },
    components: {
      City,
      iSelect
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/variable";
  @import "../../common/less/mixin";

  .create-class-list {
    position: absolute;
    top: 56px;
    bottom: 51px;
    box-sizing: border-box;
    width: 100%;
    overflow: scroll;
    background-color: #fff;
    .info-wrapper {
      padding-left: 12px;
      box-sizing: border-box;
      .item-wrapper {
        display: flex;
        height: 56px;
        line-height: 70px;
        .border-1px();
        .name {
          flex: 0 0 70px;
          color: @light-grey;
        }
        .input-wrapper {
          flex: 1;
          .input {
            width: 100%;
            height: inherit;
            line-height: inherit;
            outline: 0;
          }
        }
      }
    }
    .subject-wrapper {
      margin-top: 20px;
    }
    .button-wrapper {
      margin-top: 20px;
      padding: 20px 10%;
      box-sizing: border-box;
      .box {
        .button-bg(@blue-color);
        width: 100%;
        border-radius: 4px;
      }
    }
  }
</style>
