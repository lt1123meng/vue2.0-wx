<template>
  <div class="change-student-wrapper">
    <div class="mast-wrapper" @click="close">
      <div class="student-wrapper" @click.stop>
        <div class="student-item" v-for="item in vippar" @click="chooseThis(item)">
          <div class="student">{{item.stuName}}</div>
          <div class="class">{{item.className}}</div>
          <div class="check">
            <img class="icon" src="/src/static/icon/icon-ok.png" v-if="item.stuId===student">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    methods: {
      close() {
        this.$router.replace('/home')
      },
      chooseThis(student) {
        this.setStudent(student.stuId)
        this.close()
      },
      ...mapMutations({
        setStudent: 'SET_STUDENT'
      })
    },
    computed: {
      ...mapGetters(['vippar', 'student'])
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/variable";
  @import "../../common/less/mixin";

  .change-student-wrapper {
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
      .student-wrapper {
        margin: 10% auto;
        width: 60%;
        padding: 12px 0 12px 12px;
        background-color: #fff;
        border-radius: 4px;
        box-sizing: border-box;
        .student-item {
          display: flex;
          padding-right: 12px;
          height: 32px;
          line-height: 32px;
          .border-1px();
          &:last-of-type {
            .border-0px();
          }
          .student {
            flex: 1;
          }
          .class {
            flex: 1;
            text-align: right;
          }
          .check {
            flex: 0 0 30px;
            text-align: right;
            .icon {
              width: 12px;
            }
          }
        }
      }
    }
    &.change-enter, &.change-leave-to {
      .mast-wrapper {
        background-color: rgba(7, 17, 27, 0);
      }
      .student-wrapper {
        opacity: 0;
        transform: scale(0.3);
      }
    }

    &.change-leave, &.change-enter-to {
      .mast-wrapper {
        background-color: @mast-color;
      }
      .student-wrapper {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
</style>
