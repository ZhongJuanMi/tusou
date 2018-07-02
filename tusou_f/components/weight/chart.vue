<template>
  <div id="chartBox">

  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  mounted () {
    this.draw();
  },
  methods: {
    draw () {
      // 目标体重
      // 标准体重
      let { idealWeight, height } = this.$store.state.userInfo
      let normalWeight = parseInt(22 * height * height * 0.0001);
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('chartBox'))
      // 绘制图表
      let data = [['2014-06-01', 58], ['2014-06-02', 54], ['2014-06-03', 54]]
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
          data: data.map(function (item) {
            return item[0];
          })
        },
        yAxis: {
          splitLine: {
            show: false
          },
          min: 45
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
        dataZoom: [{
          startValue: '2014-06-01'
        }, {
          type: 'inside'
        }],
        visualMap: {
          top: 0,
          right: 0,
          pieces: [{
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
          }]
        },
        series: {
          name: '早晨',
          type: 'line',
          smooth: true,
          data: data.map(function (item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            data: [{
              yAxis: idealWeight,
              label: {
                position: 'middle',
                formatter: '目标体重'
              },
              lineStyle: {
                color: 'aqua'
              }
            }, {
              yAxis: normalWeight,
              label: {
                position: 'middle',
                formatter: '标准体重'
              },
              lineStyle: {
                color: '#ffde33'
              }
            }]
          }
        }
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


