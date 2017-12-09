<template>
  <div class="home-add-wrapper" @click="close">
    <div class="mast-wrapper">
      <div class="select-role-wrapper" @click.stop>
        <div class="title">
          <span>切换角色</span>
        </div>
        <div class="sub-title">
          <span>请选择您需要操作的角色</span>
        </div>
        <div class="role-wrapper">
          <div class="box"
               :class="{'active':roleId === crid}"
               v-for="roleId in role"
               @click="chooseThisRole(roleId)"
          >
            <div class="img-wrapper">
              <img class="img" v-if="roleId=='LS'" v-lazy="'/src/static/photo_ls.png'">
              <img class="img" v-if="roleId!='LS'" v-lazy="'/src/static/photo_jz.png'">
            </div>
            <p class="name">
              <span v-if="roleId=='LS'">老师</span>
              <span v-if="roleId=='JZ'">家长</span>
              <span v-if="roleId=='BR'">本人</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getVipInfo} from 'api/base'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data () {
      return {}
    },
    created () {
    },
    methods: {
      close () {
        if (this.crid) {
          this.$router.replace('/home')
        }
      },
      chooseThisRole (roleId) {
        if (this.crid !== roleId) {
          sessionStorage.crid = roleId
          this.setCRID(roleId)
          this._getVIPInfo()
        }
        this.$router.replace('/home')
      },
      _getVIPInfo () {
        getVipInfo(this.crid, this)
      },
      ...mapMutations({
        setCRID: 'SET_CRID',
        setVIPTEA: 'SET_VIPTEA',
        setVIPPAR: 'SET_VIPPAR',
        setStudent: 'SET_STUDENT'
      })
    },
    computed: {
      ...mapGetters(['role', 'crid', 'viptea', 'vippar'])
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import '../../common/less/variable';

  .home-add-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    transition: all .3s ease-in-out;
    .mast-wrapper {
      position: absolute;
      top: 0px;
      bottom: 0;
      width: 100%;
      background-color: @mast-color;
      transition: all .3s ease-in-out;
      z-index: 1;
      .select-role-wrapper {
        position: absolute;
        top: 22%;
        left: 10%;
        width: 80%;
        padding: 8px;
        background-color: #fff;
        border-radius: 2px;
        text-align: center;
        box-sizing: border-box;
        transition: all .3s ease-in-out;
        .title {
          margin: 10px 0;
          font-size: 17px;
          span {
            font-weight: bold
          }
        }
        .sub-title {
          margin: 10px;
          font-size: 12px;
          span {
            font-weight: bold;
          }
        }

        .role-wrapper {
          display: flex;
          .box {
            flex: 1;
            -webkit-flex: 1;
            .name {
              margin-top: 8px;
              font-size: 13px;
            }
            .img-wrapper {
              position: relative;
              display: inline-block;
              background-color: #ccc6bc;
              border-radius: 50%;
              width: 64px;
              height: 64px;
              .img {
                position: absolute;
                top: 5px;
                left: 0px;
                width: 64px;
                height: 64px;
              }
            }
            &:last-of-type {
              .img-wrapper {
                .img {
                  left: -3px;
                }
              }
            }
            &.active {
              color: @orange-color;
              .img-wrapper {
                background-color: @orange-color;
              }
            }
          }
        }
      }
    }
    &.change-enter, &.change-leave-to {
      .mast-wrapper {
        background-color: rgba(7, 17, 27, 0);
      }
      .select-role-wrapper {
        opacity: 0;
        transform: scale(0.3);
      }
    }

    &.change-leave, &.change-enter-to {
      .mast-wrapper {
        background-color: @mast-color;
      }
      .select-role-wrapper {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

</style>
