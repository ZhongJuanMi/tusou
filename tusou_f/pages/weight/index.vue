<template>
  <div class="weight">
    <div class="weight_c">
      <div class="weight_cn">
        <p v-if="state==0">小游客，请先点击右上角注册或登录哦~</p>
        <p v-if="state==1&&weight.length==0">{{name}},您还木有记录过体重，开始记录吧！</p>
      </div>
      <div class="weight_cb">
        <el-button v-if="state==1"
                   type="warning"
                   round>个人信息</el-button>
        <el-button v-if="state==1"
                   type="danger"
                   round>记录体重</el-button>
      </div>
      <zjChart />
    </div>
  </div>
</template>
<script>
import zjChart from '~/components/weight/chart'
export default {
  data () {
    return {
      name: '123',
      state: 1,
      weight: []
    }
  },
  components: {
    zjChart
  }
}
</script>
<style lang="scss" scoped>
.weight {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    display: table;
    &_c {
        text-align: center;
        display: table-cell;
        vertical-align: middle;
        &n {
            font-size: 20px;
            color: aliceblue;
        }
        &b {
            margin-top: 40px;
            > * {
                margin: 0 15px;
            }
        }
    }
}
</style>


