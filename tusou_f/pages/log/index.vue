<template>
  <div class="log">
    <div class="log_box">
      <el-form :model="logForm"
               status-icon
               :rules="logRules"
               ref="logForm"
               label-width="70px"
               size="small"
               class="log_form">
        <el-form-item label="昵称"
                      prop="nickName">
          <el-input type="text"
                    v-model="logForm.nickName"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="pass">
          <el-input type="password"
                    v-model="logForm.pass"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     size="mini"
                     round
                     @click="submitForm('logForm')">登录</el-button>
          <el-button size="mini"
                     round
                     @click="resetForm('logForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
    
<script>
export default {
  data () {
    return {
      logForm: {
        pass: "",
        checkPass: "",
        nickName: ""
      },
      logRules: {
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "请输入您的昵称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.$axios.post("/api/users/logUser", {
            name: this.logForm.nickName,
            password: this.logForm.pass
          }).then(res => {
            if (res.data.code == 2000) {
              this.$cookie.set('user_token', res.data.data.token, 7);
              this.$store.commit('setUserInfo', { userInfo: res.data.data.userInfo })
              this.$router.go(-1)
            } else {
              this.$message.error('登录账户或密码错误,请重试！')
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
    
<style lang="scss" scoped>
.log {
    width: 100%;
    height: 100vh;
    background: linear-gradient(
        40deg,
        rgba(49, 0, 236, 0.8) 0%,
        rgba(222, 0, 255, 0.8) 100%
    );
    &_box {
        width: 380px;
        height: 220px;
        background: rgba(255, 255, 255, 0.2);
        padding-top: 40px;
        border-radius: 10px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
    }
    &_form {
        width: 300px;
        margin: auto;
    }
}
</style>

