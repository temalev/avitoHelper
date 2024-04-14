import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        name: 'login'
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/chatGpt',
      name: 'chatGpt',
      meta: {
        name: 'chatGpt'
      },
      component: () => import('../views/chatGpt.vue')
    },
    {
      path: '/randomizerText',
      name: 'randomizerText',
      meta: {
        name: 'randomizerText'
      },
      component: () => import('../views/randomizerText.vue')
    },
    {
      path: '/autoloader',
      name: 'autoloader',
      meta: {
        name: 'autoloader'
      },
      component: () => import('../views/AutoLoader.vue')
    },
    {
      path: '/parser',
      name: 'parser',
      meta: {
        name: 'parser'
      },
      component: () => import('../views/Parser.vue')
    },
    {
      path: '/confirm',
      name: 'confirm',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConfirmView.vue'),
      children: [
        {
          path: 'email/:uuid',
          name: 'email',
          meta: {
            title: 'email',
          },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/ConfirmType.vue')
        }
      ]
    }
  ]
})

export default router
