<script setup>
import { ref, watch, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import router from '@/router/index'
import { SunnyIcon, MoonIcon } from 'tdesign-icons-vue-next'
const userStore = useUserStore()

// 黑夜模式切换
const switchTheme = (newValue) => {
  if (newValue == true) {
    // 设置暗色模式
    document.documentElement.setAttribute('theme-mode', 'dark')
    document.documentElement.setAttribute('class', 'dark')
  } else {
    // 重置为浅色模式
    document.documentElement.removeAttribute('theme-mode')
    document.documentElement.removeAttribute('class')
  }
}

const logout = () => {
  const confirmDialog = DialogPlugin.confirm({
    header: '是否退出登录',
    body: '退出登录后将不能发表内容、评论和点赞！',
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

const viewSpace = () => {
  router.push({ name: 'space', params: { uid: userStore.userInfo.uid } })
}
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="logo">
        <img src="@/assets/imgs/logo.png" />
      </div>
      <nav class="menu">
        <ul>
          <li>
            <RouterLink to="/moment" active-class="active">时刻</RouterLink>
          </li>
          <li>
            <RouterLink to="/topic" active-class="active">话题</RouterLink>
          </li>
          <!-- <li>
            <RouterLink to="/note" active-class="active">笔记</RouterLink>
          </li> -->
        </ul>
      </nav>

      <!-- 黑暗模式切换开关 -->
      <t-switch @change="switchTheme" class="switch-theme">
        <template #label="slotProps">
          <template v-if="slotProps.value">
            <MoonIcon />
          </template>
          <template v-else>
            <SunnyIcon />
          </template>
        </template>
      </t-switch>

      <div class="user">
        <!-- 登录成功的弹出窗 -->
        <t-popup v-if="userStore.userInfo.token && userStore.userInfo.token.length !== 0">
          <template #default>
            <t-avatar :image="userStore.userInfo.avatar" size="large"></t-avatar>
          </template>
          <template #content>
            <div class="popover-container">
              <div class="userinfo">
                <div class="avatar">
                  <img :src="userStore.userInfo.avatar" />
                </div>
                <div class="nickname">{{ userStore.userInfo.nickname }}</div>
                <div class="uid">UID: {{ userStore.userInfo.uid }}</div>
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

        <!-- 没有登录的弹出窗 -->
        <t-popup v-else>
          <template #default>
            <t-avatar size="large">登录</t-avatar>
          </template>
          <template #content>
            <div class="popover-container">
              <div class="description">您还没有登录：</div>
              <ul class="menu">
                <li>
                  <button @click="login">
                    <span>
                      <span class="iconfont icon-login"></span>
                      <span class="btn-text">立即登录/注册</span>
                    </span>
                    <span class="iconfont icon-right"></span>
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </t-popup>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  box-sizing: border-box;
  height: 60px;
  background-color: whitesmoke;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 1px 5px 0px rgba($color: #000000, $alpha: 0.2);
  position: sticky;
  top: 0;
  z-index: 100;

  .wrapper {
    padding: 0 20px;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 100%;
  }
}

.logo {
  img {
    height: 50px;
    vertical-align: middle;
  }
  @media (max-width: 700px) {
    display: none;
  }
}

.menu {
  flex: 1;
  margin-left: 20px;
  @media (max-width: 700px) {
    margin-left: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: nowrap;
    list-style: none;
    align-items: center;
    gap: 10px;
    @media (max-width: 700px) {
      gap: 5px;
    }

    li {
      height: 60px;
      position: relative;

      a {
        color: #333;
        text-decoration: none;
        line-height: 60px;
        display: block;
        font-size: 20px;
        padding: 0 30px;
        transition: all 0.6s;
        font-weight: 600;

        @media (max-width: 700px) {
          padding: 0 15px;
        }
      }

      .active {
        color: #009944;
      }

      &:hover a {
        color: #009944;
      }

      &:hover::before {
        left: 0;
        right: 0;
      }

      &::before {
        content: '';
        position: absolute;
        z-index: -1;
        left: 51%;
        right: 51%;
        bottom: 0;
        background: #009944;
        height: 5px;
        -webkit-transition-property: left, right;
        transition-property: left, right;
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
      }
    }
  }
}

.switch-theme {
  margin-right: 10px;
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

  .status {
    // 空
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
        background-color: green;
        color: white;
        cursor: pointer;
      }
    }
  }
}

.dark {
  header {
    background-color: #333;
    box-shadow: 0 1px 5px 0px rgba($color: #fff, $alpha: 0.2);
    border-bottom: 1px solid gray;
  }

  .menu ul li a {
    color: white;
  }

  .menu ul li .active {
    color: #026937;
  }

  .menu button {
    color: #ccc;
  }
}
</style>
