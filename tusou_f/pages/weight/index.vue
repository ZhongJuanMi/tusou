<template>
  <div class="weight">
    <div class="weight_c">

      <div class="weight_cb">
        <el-button type="warning"
                   round
                   @click="infoDialogVisible=true">个人信息</el-button>
        <el-button type="danger"
                   round
                   @click="weightDialogVisible=true">记录体重</el-button>
      </div>
      <div class="weight_ct">
        <p v-if="!$store.state.userInfo.idealWeight"
           class="weight_cn">
          {{$store.state.userInfo.name}} 你还没有设置个人信息哦~ <br>设置后可比对标准体重与目标体重
        </p>
        <zjChart :weights='weights'
                 v-if="weights.length" />
        <p v-else
           class="weight_cn">{{$store.state.userInfo.name}} 你还没有记录过体重哦~</p>

      </div>

      <zjInfoDialog v-model="infoDialogVisible" />
      <zjWeightDialog v-model="weightDialogVisible"
                      @refresh='getWeight' />
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
      infoDialogVisible: false,
      weightDialogVisible: false,
      weights: [],
      test:''
    }
  },
  components: {
    zjChart,
    zjInfoDialog,
    zjWeightDialog
  },
  beforeMount () {
    if (!this.$store.state.userInfo.name) {
      this.$message({
        message: '请先登录哦~',
        type: 'warning'
      });
      this.$router.push('/log')
    } else {
      this.getWeight()
    }
  },
  methods: {
    getWeight () {
      this.$tkAxios.get('/api/weights/getWeight').then(({ data }) => {
        this.weights = data.data.weights
      })
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
            margin-left: 50px;
            margin-bottom: 50px;
            &:first-child {
                color: aquamarine;
            }
        }
        &b {
            width: 100px;
            height: 250px;
        }
        &t {
            min-height: 250px;
        }
    }
}
</style>


