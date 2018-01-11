<template>
  <div class="select-outer-wrapper">
    <div class="select-box">
      <div class="iselect-box">
        <i-select class="iselect" ref="select" :data="data" :title="title" :selected="selected"
                  @onchange="dataChange"></i-select>
        <div class="select-triangle" @click="show">
          <span class="triangle"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import iSelect from './iSelect'

  export default {
    name: 'wx-select',
    props: {
      data: {
        type: Array,
        default: []
      },
      selected: {
        type: Object,
        default: {
          name: '',
          value: ''
        },
        required: true
      },
      title: {
        type: String,
        default: '请选择'
      }
    },
    methods: {
      show() {
        this.$refs.select._show()
      },
      dataChange(item) {
        this.$emit('onchange', item)
      }
    },
    components: {
      iSelect
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .select-outer-wrapper {
    padding: 6px 8px;
    box-sizing: border-box;
    background-color: #fff;
    margin: 8px 0;
    .select-box {
      background-color: rgba(7, 17, 27, 0.15);
      line-height: 28px;
      border-radius: 4px;
      padding: 0 8px;
      box-sizing: border-box;
      .iselect-box {
        display: flex;
        .iselect {
          flex: 1;
        }
        .select-triangle {
          flex: 0 0 30px;
          .triangle {
            display: inline-block;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 9px solid rgba(7, 17, 27, 0.4);
          }
        }
      }
    }
  }
</style>
