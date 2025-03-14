import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const authStore = defineStore('auth', {
  state: () => ({
    token: useLocalStorage('pinia.auth.token', ''),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    resetToken() {
      this.token = ''
    },
  },
})
