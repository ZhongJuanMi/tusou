<template>
  <div class="weight">
    <div class="weight_c">

      <div class="weight_cb">
        <el-button v-if="state==1"
                   type="warning"
                   round
                   @click="infoDialogVisible=true">个人信息</el-button>
        <el-button v-if="state==1"
                   type="danger"
                   round
                   @click="weightDialogVisible=true">记录体重</el-button>
      </div>
      <zjChart />
      <zjInfoDialog v-model="infoDialogVisible" />
      <zjWeightDialog v-model="weightDialogVisible" />
    </div>
  </div>
</template>
<script>
import zjChart from '~/components/weight/chart'
import zjInfoDialog from '~/components/weight/infoDialog'
import zjWeightDialog from '~/components/weight/weightDialog'
export default {
  data () {
    return {
      name: '123',
      state: 1,
      weight: [],
      infoDialogVisible: false,
      weightDialogVisible: false
    }
  },
  components: {
    zjChart,
    zjInfoDialog,
    zjWeightDialog
  },
  beforeMount () {
    if (this.$store.state.userInfo.name) {
      this.$store.commit('setCurPageIndex', {
        curPageIndex: 1
      })
    } else {
      this.$message({
        message: '请先登录哦~',
        type: 'warning'
      });
      this.$router.push('/log')
    }

  }
}
</script>
<style lang="scss" scoped>
.weight {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  &_c {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: 40px auto 0;
    &n {
      font-size: 20px;
      color: aliceblue;
    }
    &b {
      width: 100px;
      height: 250px;
    }
  }
}
</style>


