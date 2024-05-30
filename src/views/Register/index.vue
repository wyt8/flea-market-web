<script setup>
import router from '@/router/index'
const login = () => {
  router.push({ name: 'login' })
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
          <input type="text" placeholder="请输入学号" />
        </div>
        <div class="tip">10位数字</div>
        <div class="other">
          <button>发送邮箱验证码</button>
        </div>
      </div>
      <div class="form-line">
        <div class="name">邮箱验证码：</div>
        <div class="input">
          <input type="text" placeholder="请输入收到的邮箱验证码" />
        </div>
      </div>
      <div class="form-line">
        <div class="name">设置密码：</div>
        <div class="input">
          <input type="text" placeholder="请输入密码" />
        </div>
        <div class="tip">必须包含字母、数字，可以包含西文符号（除空白符），长度为8-18个字符</div>
      </div>
      <div class="form-line">
        <div class="name">确认密码：</div>
        <div class="input">
          <input type="text" placeholder="请再次确认密码" />
        </div>
      </div>
    </div>

    <div class="btn-submit">
      <button>同意协议并创建账户</button>
    </div>

    <div class="agreement">
      <input type="checkbox" />
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
</style>
