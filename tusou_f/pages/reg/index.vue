<template>
  <div class="reg">
    <div class="reg_box">
      <el-form :model="regForm"
               status-icon
               :rules="regRules"
               ref="regForm"
               label-width="70px"
               size="small"
               class="reg_form">
        <el-form-item label="昵称"
                      prop="nickName">
          <el-input type="text"
                    v-model="regForm.nickName"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="pass">
          <el-input type="password"
                    v-model="regForm.pass"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="checkPass">
          <el-input type="password"
                    v-model="regForm.checkPass"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     size="mini"
                     round
                     @click="submitForm('regForm')">注册</el-button>
          <el-button size="mini"
                     round
                     @click="resetForm('regForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
    
<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.regForm.checkPass !== "") {
          this.$refs.regForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      this.$axios.get("/api/users/ifUser", { params: { name: this.regForm.nickName } }).then(res => {
        if (res.data.data.has) {
          callback(new Error("此账户已注册过"))
        } else {
          callback()
        }
      })
    }
    return {
      regForm: {
        pass: "",
        checkPass: "",
        nickName: ""
      },
      regRules: {
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "请输入您的昵称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
          { validator: validateName, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/users/registerUser", {
            name: this.regForm.nickName,
            password: this.regForm.pass
          }).then(res => {
            this.$cookie.set('user_token', res.data.data.token, 7);
            this.$store.commit('setUserInfo', { userInfo: res.data.data.userInfo })
            this.$router.go(-1)
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
.reg {
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
        box-sizing: content-box;
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
