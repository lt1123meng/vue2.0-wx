<template>
  <div class="echart-outer-wrapper">
    <div class="echart-box" ref="echartDom">
    </div>
  </div>

</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'echart',
    props: {
      data: {
        default: {}
      },
      height: {
        default: '',
        type: String
      }
    },
    mounted() {
      let that = this
      this.baseOption = {
        title: {
          text: '',
          x: 'center',
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: ['#32C0BC', '#A689D7', '#4E9FEA', '#FCAA6E', '#DFCB11', '#88AD41', '#ED000A', '#1574C1'],
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom'
        },
        grid: {
          top: '15%',
          left: '0%',
          right: '15%',
          bottom: '15%',
          containLabel: true
        },
        toolbox: {
          show: true
        },
        calculable: true,
        xAxis: [],
        yAxis: [],
        series: []
      }
      let width = window.innerWidth
      let percent = this.height ? parseFloat(this.height) : 1.1
      that.$refs.echartDom.style.height = width * percent + 'px'
      that.$refs.echartDom.style.width = width * 0.94 + 'px'
      this._initeChart()
    },
    methods: {
      _initeChart() {
        if (!this.data.series) return
        for (let key in this.data) {
          if (this.baseOption[key]) {
            this.baseOption[key] = Object.assign(this.baseOption[key], this.data[key])
          } else {
            this.baseOption[key] = this.data[key]
          }
        }
        echarts.init(this.$refs.echartDom).setOption(this.baseOption)
      }
    },
    watch: {
      data(val, old) {
        setTimeout(() => {
          this.$nextTick(() => {
            this._initeChart()
          })
        }, 200)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .echart-outer-wrapper {
    position: relative;
    background-color: #fff;
    margin-top: 8px;
    .echart-box {
      margin: 0 auto
    }
  }

</style>
