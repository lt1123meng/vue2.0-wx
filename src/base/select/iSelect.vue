<template>
  <div class="select-wrapper">
    <div @click="_show" :name="select.name" :value="select.value">
      {{select.value}}
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import SELECT from './select'

  export default {
    data() {
      return {
        show: false
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: '请选择'
      },
      selected: {
        type: Object,
        default: {
          name: '',
          value: ''
        },
        required: true
      }
    },
    created() {
    },
    computed: {
      select() {
        if (this.selected.name === '') {
          if (this.data[0]) {
            this.selectThis(this.data[0], false)
            return this.data[0]
          } else {
            return {
              name: '0',
              value: '暂无数据'
            }
          }
        } else {
          return this.selected
        }
      }
    },
    methods: {
      _show() {
        SELECT(this.data, this.selected, this.title, (item) => {
          this.$emit('onchange', item)
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">

  .select-wrapper {
    .select-list-mast {
      position: fixed !important;
      top: 0;
      bottom: 0;
      background-color: rgba(7, 17, 27, 0.2);
      width: 100%;
      left: 0;
      z-index: 10000;
      transition-duration: .3s;
      transition-property: all;
      .select-list-wrapper {
        position: fixed !important;
        bottom: 0;
        padding-top: 42px;
        width: 100%;
        background-color: #fff;
        transition-duration: .3s;
        transition-property: transform;
        &:after {
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          border-top: 1px solid rgba(7, 17, 27, 0.11);;
          content: ' ';
        }
        .select-title {
          position: absolute;
          top: 0;
          width: 100%;
          display: flex;
          height: 42px;
          line-height: 42px;
          background-color: rgb(247, 247, 248);;
          text-align: center;
          .select-name {
            flex: 1;
            font-size: 17px;
            color: #333;
          }
          .select-true, .select-cancel {
            flex: 0 0 40px;
            font-size: 16px;
            color: #04BE02;
          }
        }
        .select-list {
          padding-left: 12px;
          max-height: 22rem;
          box-sizing: border-box;
          overflow-y: scroll;
          overflow-x: hidden;
          .select-item {
            display: flex;
            position: relative;
            padding: 12px 0;
            line-height: 1.5;
            &:after {
              display: block;
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              border-top: 1px solid rgba(7, 17, 27, 0.11);;
              content: ' ';
            }
            .name {
              flex: 1;
              color: #333;
              word-break: break-all;
            }
            .check {
              flex: 0 0 40px;
              line-height: 20px;
              text-align: center;
              font-size: 17px;
              color: #04BE02;
            }
          }
        }
      }
    }
    .select-enter, .select-leave-to {
      &.select-list-mast {
        background-color: rgba(7, 17, 27, 0);
        .select-list-wrapper {
          transform: translate3d(0, 100%, 0);
        }
      }
    }
    .select-leave, .select-enter-to {
      &.select-list-mast {
        background-color: rgba(7, 17, 27, 0.2);
        .select-list-wrapper {
          transform: translate3d(0, 0%, 0);
        }
      }
    }
  }
</style>
