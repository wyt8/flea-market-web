import { createRouter, createWebHistory } from 'vue-router'

import LayoutIndex from '@/views/Layout/index.vue'
import LoginIndex from '@/views/Login/index.vue'
import RegisterIndex from '@/views/Register/index.vue'
import IndexIndex from '@/views/Index/index.vue'
import GoodsIndex from '@/views/Goods/index.vue'
import ForgetPasswordIndex from '@/views/ForwardPassword/index.vue'
import messageIndex from '@/views/message/message.vue'
import profileIndex  from '@/views/profile/profile.vue'
import historyIndex from'@/views/Goods/components/GoodsHistory.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'layout',
      component: LayoutIndex,
      children: [
        {
          path: '',
          component: IndexIndex
        },
        {
          path: 'login',
          name: 'login',
          component: LoginIndex
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterIndex
        },
        {
          path: 'index',
          name: 'index',
          component: IndexIndex
        },
        {
          path: 'goods',
          name: 'goods',
          component: GoodsIndex
        },
        {
          path: 'forgetpassword',
          name: 'forgetpassword',
          component: ForgetPasswordIndex
        },
        {
          path: 'message',
          name: 'message',
          component: messageIndex
        },
        {
          path: 'space',
          name: 'space',
          component: profileIndex
        },
        {
          path: 'history',
          name: 'history',
          component: historyIndex
        }
      ]
    }

    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
