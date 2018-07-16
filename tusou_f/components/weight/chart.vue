<template>
  <div id="chartBox">

  </div>

</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    weights: Array
  },
  data () {
    return {
      note: false
    }
  },
  mounted () {
    if (this.weights.length) {
      this.draw()
    }
  },
  watch: {
    weights: {
      handler (curVal, oldVal) {
        if (curVal.length) {
          this.draw()
        }
      },
      deep: true
    },
    userInfo: {
      handler () {
        this.draw()
      },
      deep: true
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    weightall () {
      return this.weights.map(item => {
        item.AM > item.PM ? item.AM : item.PM
      }).sort((a, b) => a - b)
    },
    min () {
      return this.weightall[0]
    },
    max () {
      return this.weightall[this.weightall.length - 1]
    }
  },
  methods: {
    draw () {
      // 目标体重
      // 标准体重
      let userInfo = this.$store.state.userInfo
      let idealWeight = userInfo.idealWeight ? userInfo.idealWeight : 0
      let height = userInfo.height ? userInfo.height : 0
      let normalWeight = parseInt(22 * height * height * 0.0001)
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('chartBox'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 80,
          tooltip: {
            show: true
          }
        },
        xAxis: {
          data: this.weights.map(item => item.date)
        },
        yAxis: {
          splitLine: {
            show: false
          },
          min: this.min < idealWeight ? this.min : idealWeight,
          max: this.max > normalWeight ? this.max : normalWeight
        },
        toolbox: {
          left: 'center',
          feature: {
            // dataZoom: {
            //   yAxisIndex: 'none'
            // },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          // {
          //   startValue: '2014-06-01'
          // },
          {
            type: 'inside'
          }
        ],
        visualMap: {
          top: 0,
          right: 0,
          pieces: idealWeight ? [{
            gt: 0,
            lte: idealWeight,
            color: 'aqua'
          }, {
            gt: idealWeight,
            lte: normalWeight,
            color: '#ffde33'
          }, {
            gt: normalWeight,
            color: '#f56c6c'
          }] : []
        },
        series: [
          {
            name: '早晨',
            type: 'line',
            smooth: true,
            connectNulls: true,
            data: this.weights.map(function (item) {
              return item.AM
            }),
            markLine: {
              silent: true,
              data: [
                {
                  yAxis: idealWeight,
                  label: {
                    position: 'middle',
                    formatter: '目标体重'
                  },
                  lineStyle: {
                    color: 'aqua'
                  }
                },
                {
                  yAxis: normalWeight,
                  label: {
                    position: 'middle',
                    formatter: '标准体重'
                  },
                  lineStyle: {
                    color: '#ffde33'
                  }
                }
              ]
            }
          },
          {
            name: '晚上',
            type: 'line',
            smooth: true,
            connectNulls: true,
            data: this.weights.map(function (item) {
              return item.PM
            }),
            markLine: {
              silent: true,
              data: [
                {
                  yAxis: idealWeight,
                  label: {
                    position: 'middle',
                    formatter: '目标体重'
                  },
                  lineStyle: {
                    color: 'aqua'
                  }
                },
                {
                  yAxis: normalWeight,
                  label: {
                    position: 'middle',
                    formatter: '标准体重'
                  },
                  lineStyle: {
                    color: '#ffde33'
                  }
                }
              ]
            }
          }
        ],

      })
    }
  }
}
</script>

<style lang="scss" scoped>
#chartBox {
    width: 800px;
    height: 360px;
}
</style>
