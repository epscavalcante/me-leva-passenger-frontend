<script setup lang="ts">
import { accountGatewayInjectionKey } from '@/config/app/injectionKeys'
import { authStore } from '@/config/stores/authStore'
import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const router = useRouter()
const store = authStore()

const accountGateway = inject(accountGatewayInjectionKey)!

const email = ref('')
const password = ref('')

async function onSubmit() {
  if (!isFormLoginValid.value) {
    toast.info('Handle login')
    return
  }

  const response = await accountGateway.signin({
    email: email.value,
    password: password.value,
  })

  store.setToken(response.accessToken)

  router.push({ name: 'home' })
}

const isFormLoginValid = computed(() => email.value && password.value)
</script>

<template>
  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
    Sign in to your account
  </h1>

  <form @submit.prevent="onSubmit" class="space-y-4 md:space-y-6">
    <BaseInput label="E-mail" type="email" name="email" v-model="email" />

    <BaseInput label="Password" type="password" name="password" v-model="password" />

    <button
      :disabled="!isFormLoginValid"
      type="submit"
      class="w-full text-white disabled:bg-gray-400 disabled:cursor-not-allowed bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
    >
      Sign in
    </button>
    <p class="text-sm font-light text-gray-500">
      Don’t have an account yet?
      <RouterLink
        :to="{ name: 'signup' }"
        class="font-medium text-gray-600 hover:underline dark:text-gray-500"
      >
        Sign up
      </RouterLink>
    </p>
  </form>
</template>
