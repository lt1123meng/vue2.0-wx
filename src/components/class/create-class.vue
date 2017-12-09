<template>
  <div>
    <div class="create-class-list">
      <div class="address-wrapper">
        <city ref="city"></city>
      </div>
      <div class="info-wrapper">
        <div class="item-wrapper">
          <div class="content">
            <div class="name">学校名称</div>
            <div class="input-wrapper">
              <input class="input" v-model="organize" type="text">
            </div>
          </div>
          <div class="validator" :class="{'success':orgValidator}" ng-if="organize">
            {{orgValidatorText}}
          </div>
        </div>
        <div class="item-wrapper">
          <div class="content">
            <div class="name">班级名称</div>
            <div class="input-wrapper">
              <input class="input" v-model="classname" type="text">
            </div>
          </div>
          <div class="validator" :class="{'success':classValidator}" ng-if="classname">
            {{classValidatorText}}
          </div>
        </div>
      </div>
      <div class="info-wrapper subject-wrapper">
        <div class="item-wrapper">
          <div class="content">
            <div class="name">选择科目</div>
            <div class="input-wrapper">
              <i-select :data="subject"
                        title="选择科目"
                        :selected="selected"
                        @onchange="onchange"
                        ref="select"
              >
              </i-select>
            </div>
          </div>
          <div class="validator"></div>
        </div>
      </div>
      <div class="button-wrapper">
        <div class="box" :class="{'success':classValidator&&orgValidator}" @click="quickCreate">立即创建</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {createClass} from 'api/class'
  import {getSubject} from 'api/base'
  import City from 'base/city/city'
  import iSelect from 'base/select/iSelect'
  export default {
    data () {
      return {
        organize: '',
        classname: '',
        sheetVisible: false,
        subject: [],
        selected: {},
        orgValidator: false,
        orgValidatorText: '',
        classValidator: false,
        classValidatorText: ''
      }
    },
    created () {
      this._initSubject()
      this.flag = false
    },
    methods: {
      quickCreate () {
        if (!(this.classValidator && this.orgValidator)) return
        if (this.flag) return
        this.flag = true
        createClass({
          orgname: this.organize,
          classname: this.classname,
          num: 0,
          subid: this.selected.name,
          province: this.$refs.city.current.split(' ')[0],
          city: this.$refs.city.current.split(' ')[1],
          positionx: this.$refs.city.position ? this.$refs.city.position.x : '0',
          positiony: this.$refs.city.position ? this.$refs.city.position.y : '0'
        }).then((res) => {
          this.flag = false
          this.$router.push('/class/list')
        })
      },
      onchange (item) {
        this.selected = item
      },
      _initSubject () {
        getSubject().then((data) => {
          this.selected = data[0]
          this.subject = data
        })
      },
      _chooseThisSubject (subject) {
        console.log(subject)
        this.selected = subject
      }
    },
    watch: {
      organize (newValue, oldValue) {
        this.orgValidator = false
        if (!newValue) {
          this.orgValidatorText = ''
          this.orgValidator = false
          return
        }
        let spaceReg = /[ ]+/g
        if (spaceReg.test(newValue)) {
          this.organize = this.organize.replace(spaceReg, '')
          return
        }
        let textReg = /^[\u4e00-\u9fa5]+$/
        if (newValue.length < 2) {
          this.orgValidatorText = '学校名称长度不能小于2'
          return
        } else if (newValue.length > 20) {
          this.orgValidatorText = '学校名称长度不能大于20'
          return
        } else if (!textReg.test(newValue)) {
          this.orgValidatorText = '学校名称只能是汉字'
          return
        }
        this.orgValidator = true
        this.orgValidatorText = '验证成功'
      },
      classname (newValue, oldValue) {
        this.classValidator = false
        if (!newValue) {
          this.classValidatorText = ''
          this.classValidator = false
          return
        }
        let spaceReg = /[ ]+/g
        if (spaceReg.test(newValue)) {
          this.classname = this.classname.replace(spaceReg, '')
          return
        }
        if (newValue.length < 2) {
          this.classValidatorText = '班级名称长度不能小于2'
          return
        } else if (newValue.length > 20) {
          this.classValidatorText = '班级名称长度不能大于20'
          return
        }
        this.classValidator = true
        this.classValidatorText = '验证成功'
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
        .content {
          display: flex;
          margin-top: 20px;
          height: 36px;
          line-height: 36px;
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
        .validator {
          padding: 6px 12px;
          text-align: right;
          color: @red-color;
          &.success {
            color: @green-color;
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
        width: 100%;
        border-radius: 4px;
        .button-bg(@light-grey);
        &.success {
          .button-bg(@blue-color);
        }
      }
    }
  }
</style>
