<template>
  <el-dialog :title="$store.state.userInfo.name"
             :visible.sync="dialogFormVisible"
             :show-close="false"
             class="weight"
             width="460px"
             :modal-append-to-body="false"
             :center="true">
    <el-form :model="form"
             :rules="infoRules"
             ref="infoForm">
      <el-form-item label="性别"
                    :label-width="formLabelWidth">
        <el-select v-model="form.gender">
          <el-option label="我是铝孩纸"
                     value="female"></el-option>
          <el-option label="我是蓝孩纸"
                     value="male"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身高"
                    :label-width="formLabelWidth"
                    prop="height">
        <el-input v-model.number="form.height"
                  auto-complete="off">
          <template slot="append">cm</template>
        </el-input>
      </el-form-item>

      <el-form-item label="目标体重"
                    :label-width="formLabelWidth"
                    prop="idealWeight">
        <el-input v-model.number="form.idealWeight"
                  auto-complete="off">
          <template slot="append">kg</template>
        </el-input>
      </el-form-item>

    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="cancle()">取 消</el-button>
      <el-button type="primary"
                 @click="submitForm('infoForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogFormVisible: Boolean
  },
  mounted () {
    this.initForm()
  },
  data () {
    var validateHeight = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value > 200) {
          callback(new Error('请输入真实的身高值'));
        } else {
          callback();
        }
      }
    }
    var validateIdealWeight = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value > 100) {
          callback(new Error('请输入真实的体重值'));
        } else {
          callback();
        }
      }
    }
    return {
      form: {},
      formLabelWidth: '90px',
      infoRules: {
        height: [
          { required: true, message: "请输入身高信息", trigger: "blur" },
          { validator: validateHeight, trigger: 'blur' }
        ],
        idealWeight: [
          { required: true, message: "请输入期望的体重值", trigger: "blur" },
          { validator: validateIdealWeight, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    initForm () {
      this.form = {
        height: this.$store.state.userInfo.height,
        idealWeight: this.$store.state.userInfo.idealWeight,
        gender: this.$store.state.userInfo.gender,
      }
    },
    cancle () {
      this.$emit('closeForm')
      this.initForm()
      this.$refs.infoForm.clearValidate()
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交个人信息到后台
          this.$tkAxios.post('/api/users/setInfo',
            this.form
          ).then(() => {
            this.$store.commit('setUserInfo', { userInfo: { ...this.form, name: this.$store.state.userInfo.name } })
            this.cancle()
          })
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

