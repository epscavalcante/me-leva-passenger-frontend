import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
})

export default router
