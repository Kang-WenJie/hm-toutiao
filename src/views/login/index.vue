<template>
  <div class="bg">
    <el-card class="e-caed">
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.yzm" placeholder="请输入验证码" style="width:338px;margin-right:10px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
        <el-checkbox :value='true' >我已阅读并同意用户协议和隐私条款</el-checkbox><br>
        </el-form-item>
         <el-button type="primary" style="width:100%;">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        phone: '',
        yzm: ''
      }
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
