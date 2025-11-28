import { createRouter, createWebHistory } from 'vue-router'
import AccountView from '../views/AccountView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import store from '../stores/store.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView,
    beforeEnter: (to) => {
      if (!store.state.isAuthenticated && to.name !== 'Login') {
        return { name: 'Login' }
      }
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: LoginView,
  // },
  {
    path: '/resources',
    name: 'resources',
    component: ResourcesView,
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
