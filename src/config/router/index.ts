import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../../views/HomeView.vue'),
    },
    {
      path: '/rides',
      name: 'rides',
      component: () => import('../../views/RidesView.vue'),
    },

    {
      path: '/account',
      name: 'account',
      component: () => import('../../views/AccountView.vue'),
    },
  ],
})

export default router
