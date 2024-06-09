<script setup>
// import { ref, watch, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import router from '@/router/index'
const userStore = useUserStore()

const logout = () => {
  const confirmDialog = DialogPlugin.confirm({
    header: '是否退出登录',
    body: '退出登录后将不能发布商品和聊天！',
    theme: 'warning',
    onConfirm: () => {
      userStore.clearUserInfo()
      MessagePlugin.success('期待下次再见!')
      confirmDialog.hide()
    }
  })
}

const login = () => {
  router.push({ name: 'login' })
}

const register = () => {
  router.push({ name: 'register' })
}

const viewSpace = () => {
  router.push({ name: 'space', params: { uid: userStore.userInfo.uid } })
}
const viewgoodshistory = () => {
  router.push({ name: 'history', params: { uid: userStore.userInfo.uid } })
}
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="logo">
        <img src="@/assets/imgs/logo.png" />
      </div>
      <div class="name">
        <div class="main-name">BIT跳蚤市场</div>
        <div class="sub-name">By 开发一部</div>
      </div>
      <nav class="menu">
        <ul>
          <li>
            <RouterLink to="/index" active-class="active"
              ><span class="iconfont icon-shouye"></span>首页</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/goods" active-class="active"
              ><span class="iconfont icon-jiaoyi"></span>二手市场</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/message" active-class="active"
              ><span class="iconfont icon-xiaoxi"></span>消息</RouterLink
            >
          </li>
        </ul>
      </nav>

      <div class="user">
        <!-- 登录成功的弹出窗 -->
        <t-popup v-if="userStore.userInfo.token && userStore.userInfo.token.length !== 0">
          <template #default>
            <t-avatar :image="userStore.userInfo.avatar_url" size="60px"></t-avatar>
          </template>
          <template #content>
            <div class="popover-container">
              <div class="userinfo">
                <div class="avatar">
                  <img :src="userStore.userInfo.avatar_url" />
                </div>
                <div class="nickname">{{ userStore.userInfo.name }}</div>
                <div class="uid">UID: {{ userStore.userInfo.user_id }}</div>
              </div>
              <div class="status"></div>
              <ul class="menu">
                <li>
                  <button @click="viewSpace">
                    <span>
                      <span class="iconfont icon-user"></span>
                      <span class="btn-text">个人中心</span>
                    </span>
                    <span class="iconfont icon-right"></span>
                  </button>
                </li>
                <li>
                  <button @click="viewgoodshistory">
                    <span>
                      <span class="iconfont icon-history"></span>
                      <span class="btn-text">商品发布历史</span>
                    </span>
                    <span class="iconfont icon-right"></span>
                  </button>
                </li>
                <li>
                  <button @click="logout">
                    <span>
                      <span class="iconfont icon-logout"></span>
                      <span class="btn-text">退出登录</span>
                    </span>
                    <span class="iconfont icon-right"></span>
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </t-popup>

        <!-- 没有登录时的按钮组 -->
        <div class="btn-group" v-else>
          <button @click="register">注册</button>
          <button @click="login">登录</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  height: 125px;
  background: linear-gradient(70deg, rgba(59, 182, 254, 1) -20%, rgba(142, 76, 183, 1) 30%);
  border-bottom: 1px solid #ccc;
  box-shadow: 0 1px 5px 0px rgba($color: #000000, $alpha: 0.2);
  position: sticky;
  top: 0;
  z-index: 100;

  .wrapper {
    padding: 0 40px;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 100%;
  }
}

.logo {
  img {
    height: 67px;
    vertical-align: middle;
  }
}

.name {
  margin-left: 10px;
  .main-name {
    font-size: 36px;
    color: white;
    font-weight: bold;
  }

  .sub-name {
    font-size: 16px;
    color: #dedede;
  }
}

.menu {
  flex: 1;
  margin-left: 20px;
  height: 100%;

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: nowrap;
    list-style: none;
    align-items: center;
    gap: 20px;
    li {
      height: 100%;
      position: relative;

      a {
        color: white;
        text-decoration: none;
        line-height: 125px;
        display: block;
        font-size: 28px;
        padding: 0 15px;
        transition: all 0.6s;

        .iconfont {
          font-size: 28px;
          margin-right: 8px;
          color: black;
        }
      }

      .active {
        color: orange;
        background-color: white;
      }

      &:hover a {
        color: orange;
      }
    }
  }
}

.popover-container {
  box-sizing: border-box;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 5px;

  .userinfo {
    text-align: center;

    .avatar img {
      box-sizing: border-box;
      border: 4px solid #87cefa;
      width: 90px;
      height: 90px;
      border-radius: 45px;
    }

    .nickname {
      font-weight: 600;
      font-size: 17px;
    }

    .uid {
      font-size: 10px;
      color: #ccc;
    }
  }

  .menu {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 0;
    padding: 0;

    button {
      width: 100%;
      height: 40px;
      background-color: transparent;
      border: none;
      border-radius: 10px;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;

      .btn-text {
        margin-left: 15px;
      }

      &:hover {
        background-color: #fe742b;
        color: white;
        cursor: pointer;
      }
    }
  }
}

.btn-group {
  display: flex;
  align-items: center;
  gap: 20px;

  button {
    width: 150px;
    height: 65px;
    background: linear-gradient(90deg, #fe564d 0%, #f9ca26 100%);
    border: none;
    border-radius: 5px;
    font-size: 28px;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
  }

  button:hover {
    box-shadow: 0 0 10px 2px rgba($color: #000000, $alpha: 0.3);
    border: 1px solid #ccc;
  }
}
</style>
