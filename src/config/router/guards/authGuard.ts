import { authStore } from '@/config/stores/authStore'
import type { RouteLocation } from 'vue-router'
import { toast } from 'vue-sonner'

export function authGuard(to: RouteLocation, from: RouteLocation, next: unknown) {
  if (to.meta.requiresGuest) {
    const store = authStore()

    if (store.isAuthenticated) {
      toast.info('Página para visitantes')
      return next({ name: from.name })
    }
  }

  if (to.meta.requiresAuth) {
    const store = authStore()

    if (!store.isAuthenticated) {
      toast.info('Você precisa estar conectado')
      return next({ name: 'signin' })
    }
  }

  next()
}
