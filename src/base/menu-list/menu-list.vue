<template>
  <div class="menu-list-wrapper">
    <div class="menu-section" v-for="section in menu">
      <div class="title" v-if="section.name">
        {{section.name}}
      </div>
      <div class="section-wrapper">
        <div class="menu" v-for="menu in section.list" @click="goMenu(menu)">
          <div class="icon-wrapper">
            <img class="icon" v-lazy="'/src/static/menu/'+menu.icon">
            <span v-if="menu.new" class="tag">NEW</span>
            <span v-if="menu.hot" class="tag">HOT</span>
            <span v-if="menu.circle" class="tag"></span>
          </div>
          <p class="text">{{menu.text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      menu: {
        type: Array,
        default: []
      }
    },
    methods: {
      goMenu(menu) {
        this.$router.push(menu.route)
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/variable";
  @import "../../common/less/mixin";

  .menu-list-wrapper {
    background-color: #fff;
    .menu-section {
      padding-top: 12px;
      .border-1px();
      box-sizing: border-box;
      &:last-of-type {
        .border-0px();
      }
      .title {
        margin-bottom: 12px;
        padding-left: 16px;
        font-size: 15px;
        font-weight: bold;
        border-left: 4px solid @orange-color;
      }
      .section-wrapper {
        display: flex;
        flex-wrap: wrap;
        .menu {
          margin-bottom: 12px;
          flex: 0 0 25%;
          text-align: center;
          .icon-wrapper {
            margin: 0 auto;
            width: 32px;
            height: 32px;
            position: relative;
            .icon {
              height: inherit;
              width: inherit;
            }
          }
          .text {
            margin-top: 8px;
            color: #5b5b5b;
          }
        }
      }
    }
  }
</style>
