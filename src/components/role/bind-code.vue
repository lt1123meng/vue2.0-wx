<template>
  <div class="create-class-wrapper">
    <div class="box-wrapper">
      <div class="title">
        班级信息
      </div>
      <div class="item-wrapper">
        <div class="name">输入班级标识：</div>
        <div class="input-wrapper">
          <input class="input" v-model="code" type="text">
        </div>
        <div class="button" @click="searchClassByCode">查询班级</div>
      </div>
      <div class="search-result">
        <div v-show="searching">查询中……</div>
        <div v-show="searchResult&&typeof searchResult==='string'">{{searchResult}}</div>
        <div v-show="!searching&&searchResult.id">
          <div>班级名称：{{searchResult.orgname}}-{{searchResult.name}}</div>
          <div>
            <div
              v-if=
                "searchResult.teachernum+searchResult.parentnum+searchResult.stunum===0"
            >
              未绑定任何人
            </div>
            <div v-else>
              <span>绑定</span>
              <span>老师{{searchResult.teachernum}}人</span>
              <span>家长{{searchResult.parentnum}}人</span>
              <span>学生{{searchResult.stunum}}人</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="choose-identity">
      <div class="title">
        选择身份
      </div>
      <div class="box">
        <div class="identity-box"
             @click="chooseIdentity('par')"
             :class="{'active':identity==='par'}">
          <span class="text">家长</span>
          <div class="bg"></div>
        </div>
        <div class="identity-box"
             @click="chooseIdentity('tea')"
             :class="{'active':identity==='tea'}">
          <span class="text">老师</span>
        </div>
      </div>
      <div class="identity-content">
        <div class="identity-box" :class="{'active':identity==='tea'}">
          <div class="box-wrapper">
            <div class="title">基本信息</div>
            <div class="item-wrapper">
              <div class="name">输入姓名：</div>
              <div class="input-wrapper">
                <input class="input" type="text" v-model="stuName">
              </div>
            </div>
            <div class="item-wrapper">
              <div class="name">输入学号：</div>
              <div class="input-wrapper">
                <input class="input" type="text" v-model="stuNum" placeholder="(非必填)">
              </div>
            </div>
            <div class="title">与学生关系</div>
            <div class="relation-wrapper">
              <div class="relation-ship" @click="chooseRelation('FQ')">
                <div>父亲</div>
                <div class="relation">
                  <span v-show="relation==='FQ'">✔</span>
                </div>
              </div>
              <div class="relation-ship" @click="chooseRelation('MQ')">
                <div>母亲</div>
                <div class="relation">
                  <span v-show="relation==='MQ'">✔</span>
                </div>
              </div>
              <div class="relation-ship" @click="chooseRelation('BR')">
                <div>本人</div>
                <div class="relation">
                  <span v-show="relation==='BR'">✔</span>
                </div>
              </div>
              <div class="relation-ship" @click="chooseRelation('QT')">
                <div>其他</div>
                <div class="relation">
                  <span v-show="relation==='QT'">✔</span>
                </div>
              </div>
            </div>
          </div>
          <div class="box-wrapper">
            <div class="title">我的科目</div>
            <div class="item-wrapper">
              <div class="name">选择科目：</div>
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
          </div>
        </div>
      </div>
    </div>
    <div class="button-wrapper">
      <button class="button">申请加入</button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getSubject} from 'api/base'
  import {getClassByCode} from 'api/roleCode'
  import iSelect from 'base/select/iSelect'

  export default {
    data() {
      return {
        code: null,
        subject: [],
        selected: {},
        searchResult: {},
        searching: false,
        identity: 'par',
        stuName: '',
        stuNum: '',
        relation: 'FQ'
      }
    },
    created() {
      this._initSubject()
    },
    methods: {
      searchClassByCode() {
        if (!this.code || this.code.length < 6) {
          this.$root.TopTip({
            message: '请输入正确的班级标识符',
            type: 'warning'
          })
          return
        }
        this.searching = true
        this.searchResult = {}
        getClassByCode(this.code)
          .then((res) => {
            this.searching = false
            if (res) {
              this.searchResult = res
            } else {
              this.searchResult = '查询失败，请输入正确的班级标识符'
            }
          })
      },
      chooseIdentity(type) {
        this.identity = type
      },
      chooseRelation(relation) {
        this.relation = relation
      },
      onchange(item) {
        this.selected = item
      },
      _initSubject() {
        getSubject().then((data) => {
          this.selected = data[0]
          this.subject = data
        })
      }
    },
    components: {
      iSelect
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/variable";
  @import "../../common/less/mixin";

  .create-class-wrapper {
    position: absolute;
    top: 0px;
    bottom: 50px;
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
      .relation-wrapper {
        display: flex;
        margin-bottom: 12px;
        line-height: 24px;
        .relation-ship {
          flex: 1;
          text-align: center;
          font-size: @font-size-medium-x;
          .relation {
            color: @green-color;
          }
        }
      }
      .search-result {
        margin: 20px 0 12px 0;
        line-height: 24px;
        text-align: center;
      }
    }
    .choose-identity {
      box-sizing: border-box;
      transform: translateX(0%);
      .title {
        margin: 8px 0;
        height: 30px;
        line-height: 30px;
        font-weight: bold;
      }
      .box {
        display: flex;
        margin: 0 auto;
        width: 80%;
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
        background-color: rgba(7, 17, 27, 0.09);
        overflow: hidden;
        .identity-box {
          position: relative;
          flex: 1;
          text-align: center;
          color: #333;
          transition: all .3s;
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
      .identity-content {
        overflow-x: hidden;
        .identity-box {
          display: flex;
          flex-wrap: nowrap;
          transition: all .3s ease-in-out;
          .box-wrapper {
            flex: 0 0 100%;
            .title {
              text-align: center;
            }
          }
          &.active {
            transform: translateX(-100%);
          }
        }
      }
    }
    .button-wrapper {
      margin-bottom: 22px;
      padding: 0 12%;
      box-sizing: border-box;
      .button {
        .button-bg(@blue-color);
        width: 100%;
        border-radius: 4px;
      }
    }
  }
</style>
