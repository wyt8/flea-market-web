import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LayoutIndex from '@/views/Layout/index.vue'
import LoginIndex from '@/views/Login/index.vue'
import RegisterIndex from '@/views/Register/index.vue'
import IndexIndex from '@/views/Index/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'layout',
      component: LayoutIndex,
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginIndex
        },
        {
          path: '/register',
          name: 'register',
          component: RegisterIndex
        },
        {
          path: '/index',
          name: 'index',
          component: IndexIndex
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
