<template>
  <div class="bg">
    <el-card class="e-caed">
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="form" :rules="loginRules" status-icon ref='form'>
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="yzm">
          <el-input v-model="form.yzm" placeholder="请输入验证码" style="width:338px;margin-right:10px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
        <el-checkbox :value='true' >我已阅读并同意用户协议和隐私条款</el-checkbox><br>
        </el-form-item>
         <el-button type="primary" style="width:100%;" @click="login('form')">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    const checkPhone = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}/.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      }
      callback()
    }
    return {
      form: {
        phone: '',
        yzm: ''
      },
      loginRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        yzm: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (log) {
      this.$refs[log].validate(async (valid) => {
        if (valid) {
          // 校验成功  调用登录接口
          // this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', { mobile: this.form.phone, code: this.form.yzm })
          //   .then(res => {
          //     // 成功 跳转
          //     // 注意 登录 不够完善
          //     store.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     // 失败 提示
          //     this.$message.error('手机号或验证码错误')
          //   })
          try {
            const res = await this.$http.post('authorizations', { mobile: this.form.phone, code: this.form.yzm })
            store.setUser(res.data.data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style lang='less'  scoped>
.bg {
  width: 100%;
  height: 100%;
  background: url(../../assets/login_bg.jpg) no-repeat center;
  position: absolute;
  top: 0;
  left: 0;
  .e-caed {
    width: 500px;
    height: 350px;
    /* background-color: pink; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    img {
      width: 300px;
      display: block;
      margin: 0 auto 15px;
    }
  }
}
</style>
