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
          top: 10,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 48,
            color: '#096'
          }, {
            gt: 48,
            lte: 55,
            color: '#ffde33'
          }, {
            gt: 55,
            color: '#f00'
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
              yAxis: 48
            }, {
              yAxis: 55
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
    margin: auto;
    height: 400px;
}
</style>


