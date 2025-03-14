import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards/authGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '',
      component: () => import('@/views/layouts/Dashboard.vue'),
      meta: { requiresAuth: true, requiresLocation: true },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/rides',
          name: 'rides',
          component: () => import('@/views/RideListView.vue'),
        },

        {
          path: '/rides/new',
          name: 'rides.new',
          component: () => import('@/views/RideRequestView.vue'),
        },

        {
          path: '/rides/:rideId',
          name: 'rides.detail',
          component: () => import('@/views/RideDetailView.vue'),
        },

        {
          path: '/account',
          name: 'account',
          component: () => import('@/views/AccountView.vue'),
        },

        {
          path: '/map',
          name: 'map',
          component: () => import('@/views/MapView.vue'),
        },
      ],
    },

    {
      path: '',
      component: () => import('@/views/layouts/Auth.vue'),
      meta: { requiresGuest: true },
      children: [
        {
          path: 'signin',
          name: 'signin',
          component: () => import('@/views/SigninView.vue'),
        },

        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/views/SignupView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(authGuard)

export default router
