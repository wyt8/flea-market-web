<script setup>
import { ref } from 'vue'
import router from '@/router/index'
import userAPI from '@/apis/userAPI'
import { MessagePlugin } from 'tdesign-vue-next'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const register = () => {
  router.push({ name: 'register' })
}

const form = ref({
  bit_id: '',
  password: ''
})

// 点击登录按钮的处理函数
const loginHandle = async () => {
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

  const res = await userAPI.login(form.value)
  if (res.code == 0) {
    MessagePlugin.success('登录成功')
    userStore.setUserInfo(res.data)
    router.push({ name: 'index' })
    return
  } else {
    form.value.password = ''
    MessagePlugin.error(res.msg)
    return
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <span class="main-header">账号登录</span>
      <span class="sub-header">没有账号？马上<span @click="register">注册</span></span>
    </div>

    <div class="form">
      <div class="form-line">
        <div class="name">学号：</div>
        <div class="input">
          <input type="text" placeholder="请输入学号" v-model="form.bit_id" />
        </div>
      </div>
      <div class="form-line">
        <div class="name">密码：</div>
        <div class="input">
          <input type="password" placeholder="请输入密码" v-model="form.password" />
        </div>
      </div>
    </div>

    <div class="btn-submit">
      <button @click="loginHandle">立即登录</button>
    </div>

    <div class="option">
      <div class="agreement">
        <input type="checkbox" />
        记住密码
      </div>
      <div class="forget-password"><a>忘记密码？</a></div>
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
      width: 100px;
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
.option {
  display: flex;
  align-items: center;
  gap: 200px;
  .forget-password a {
    color: #fe742b;
    cursor: pointer;
    text-decoration: none;
  }
}
</style>
