<template>
  <el-dialog :title="$store.state.userInfo.name+'来记录体重啦'"
             :visible="value"
             :show-close="false"
             class="weight_weight"
             width="460px"
             center>
    <el-form :model="form"
             :rules="rules"
             ref="weightForm">
      <el-form-item prop="datetime"
                    label="记录时间"
                    :label-width="formLabelWidth">
        <el-date-picker v-model="form.datetime"
                        align="center"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="weight"
                    label="记录体重"
                    :label-width="formLabelWidth">
        <el-input v-model.number="form.weight"
                  auto-complete="off">
          <template slot="append">kg</template>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="cancle()">取 消</el-button>
      <el-button type="primary"
                 @click="submit()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 重写Date原型方法
Date.prototype.toString = function () {
  return (
    this.getFullYear() +
    '-' +
    (this.getMonth() > 8 ? this.getMonth() + 1 : '0' + (this.getMonth() + 1)) +
    '-' +
    (this.getDate() > 9 ? this.getDate() : '0' + this.getDate()) +
    ' ' +
    (this.getHours() > 9 ? this.getHours() : '0' + this.getHours()) +
    ':' +
    (this.getMinutes() > 9 ? this.getMinutes() : '0' + this.getMinutes())
  )
}
export default {
  mounted () {
    this.initForm()
  },
  props: {
    value: Boolean
  },
  data () {
    var validateIdealWeight = (rule, value, callback) => {
      if (!Number(value)) {
        callback(new Error('请输入数字值'))
      } else {
        if (value > 100 || value < 40) {
          callback(new Error('请输入真实的体重值'))
        } else {
          callback()
        }
      }
    }
    return {
      formLabelWidth: '90px',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      form: {},
      rules: {
        datetime: [
          { required: true, message: '请选择日期时间', trigger: 'change' }
        ],
        weight: [
          { required: true, message: '请输入当前体重值', trigger: 'blur' },
          { validator: validateIdealWeight, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    initForm () {
      this.form = {
        datetime: new Date(),
        weight: ''
      }
    },
    cancle () {
      this.$emit('input', false)
      this.$refs.weightForm.clearValidate()
      this.initForm()
    },
    submit () {
      this.$refs.weightForm.validate(valid => {
        if (valid) {
          let { datetime, weight } = this.form
          datetime = datetime.toString()
          // 提交个人信息到后台
          this.$tkAxios
            .post('/api/weights/setWeight', {
              datetime,
              weight
            })
            .then(() => {
              this.$emit('refresh')
              this.cancle()
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
