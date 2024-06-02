<script setup>
import { ref } from 'vue'
import router from '@/router/index'
import userAPI from '@/apis/userAPI'
import { MessagePlugin } from 'tdesign-vue-next'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 跳转到登录页面
const login = () => {
  router.push({ name: 'login' })
}

const form = ref({
  bit_id: '',
  password: '',
  verification_code: ''
})
const confirmPassword = ref('')
const checkAgreement = ref(false)
// 点击注册按钮后的处理函数
const registerHandle = async () => {
  // 验证是否同意协议
  if (!checkAgreement.value) {
    MessagePlugin.warning('请同意协议')
    return
  }
  // 验证确认密码和原来密码是否一致
  if (confirmPassword.value !== form.value.password) {
    MessagePlugin.warning('两次输入的密码不一致')
    return
  }
  // 判断bit_id是否为10位数字
  if (!/^\d{10}$/.test(form.value.bit_id)) {
    MessagePlugin.warning('学号应为10位数字')
    return
  }
  // 判断password是否合法
  if (!/^(?=.*[a-zA-Z])(?=.*\d)[^\s]{8,18}$/.test(form.value.password)) {
    MessagePlugin.warning('密码强度不够')
    return
  }
  // 判断验证码格式是否正确
  if (!/^\d{6}$/.test(form.value.verification_code)) {
    MessagePlugin.warning('输入的验证码格式不正确')
    return
  }

  const res = await userAPI.register(form.value)
  if (res.code == 0) {
    MessagePlugin.success('注册成功')
    userStore.setUserInfo(res.data)
    router.push({ name: 'index' })
    return
  } else {
    form.value.password = ''
    form.value.verification_code = ''
    confirmPassword.value = ''
    checkAgreement.value = false
    MessagePlugin.error(res.msg)
    return
  }
}

// 发送邮箱验证码
const sendVerificationCode = async () => {
  // 判断bit_id是否为10为数字
  if (!/\d{10}/.test(form.value.bit_id)) {
    MessagePlugin.warning('学号应为10位数字')
    return
  }
  const res = await userAPI.sendVerificationCode(form.value.bit_id)
  if (res.code === 0) {
    MessagePlugin.success('发送验证码成功')
    return
  } else {
    MessagePlugin.warning(res.msg)
    return
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <span class="main-header">欢迎注册</span>
      <span class="sub-header">已有账号？马上<span @click="login">登录</span></span>
    </div>

    <div class="form">
      <div class="form-line">
        <div class="name">学号：</div>
        <div class="input">
          <input type="text" placeholder="请输入学号" v-model="form.bit_id" />
        </div>
        <div class="tip">10位数字</div>
        <div class="other">
          <button @click="sendVerificationCode">发送邮箱验证码</button>
        </div>
      </div>
      <div class="form-line">
        <div class="name">邮箱验证码：</div>
        <div class="input">
          <input
            type="text"
            placeholder="请输入收到的邮箱验证码"
            v-model="form.verification_code"
          />
        </div>
      </div>
      <div class="form-line">
        <div class="name">设置密码：</div>
        <div class="input">
          <input type="password" placeholder="请输入密码" v-model="form.password" />
        </div>
        <div class="tip">必须包含字母、数字，可以包含西文符号（除空白符），长度为8-18个字符</div>
      </div>
      <div class="form-line">
        <div class="name">确认密码：</div>
        <div class="input">
          <input type="password" placeholder="请再次确认密码" v-model="confirmPassword" />
        </div>
      </div>
    </div>

    <div class="btn-submit">
      <button @click="registerHandle">同意协议并创建账户</button>
    </div>

    <div class="agreement">
      <input type="checkbox" v-model="checkAgreement" />
      已阅读并同意【用户服务协议】和【隐私政策】
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 30px 10px 20px;
  background-color: white;
  width: 80%;
  min-width: 1000px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}

.header {
  .main-header {
    font-size: 40px;
    color: #fe742b;
    font-weight: bold;
  }

  .sub-header {
    margin-left: 20px;
    color: #b9b9b9;
    font-size: 16px;

    span {
      color: #fe742b;
      font-weight: bold;
      cursor: pointer;
    }
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 35px;
  .form-line {
    display: flex;
    align-items: center;
    .name {
      width: 140px;
      font-size: 18px;
      font-weight: bold;
      text-align: right;
    }
    .input input {
      width: 416px;
      height: 52px;
      border-radius: 26px;
      border: 1px solid #ccc;
      padding: 0 30px;
      font-size: 18px;
      color: #aaa;
    }

    .tip {
      margin-left: 30px;
      height: 50px;
      background-color: #f9f8f2;
      border: 1px solid #bbb;
      line-height: 50px;
      font-size: 18px;
      padding: 0 15px;
      // max-width: 40%;
      white-space: nowrap; /*文本一行显示，normal是自动换行*/
      overflow: hidden; /*溢出部分隐藏*/
      text-overflow: ellipsis; /*文字溢出时用省略号显示*/
    }
    .other {
      margin-left: 20px;
      button {
        background-color: #fa5a1e;
        border: 1px solid #db0a9f;
        border-radius: 4px;
        color: white;
        padding: 5px 10px;
        cursor: pointer;
        &:hover {
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}

.btn-submit button {
  background-color: #fe742b;
  width: 470px;
  height: 60px;
  border: none;
  border-radius: 30px;
  font-size: 28px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
  }
}

.agreement {
  //   input {
  //     background-color: orangered;
  //   }
}
</style>
