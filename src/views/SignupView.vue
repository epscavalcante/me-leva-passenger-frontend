<script setup lang="ts">
import { accountGatewayInjectionKey } from '@/config/app/injectionKeys'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const accountGateway = inject(accountGatewayInjectionKey)!

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')

async function onSubmit() {
  await accountGateway.signup({
    email: email.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
    isPassenger: true,
    isDriver: false,
  })

  router.push({ name: 'signin' })
}
</script>

<template>
  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
    Signup in App
  </h1>

  <form @submit.prevent="onSubmit" class="space-y-4 md:space-y-6">
    <BaseInput label="First name" type="text" name="first_name" v-model="firstName" />
    <BaseInput label="Last name" type="text" name="last_name" v-model="lastName" />
    <BaseInput label="E-mail" type="email" name="email" v-model="email" />
    <BaseInput label="Phone" type="text" name="phone" v-model="phone" />
    <BaseInput label="Password" type="password" name="password" v-model="password" />
    <button
      :disabled="!email || !password"
      type="submit"
      class="w-full text-white disabled:bg-gray-400 disabled:cursor-not-allowed bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
    >
      Sign up
    </button>
    <p class="text-sm font-light text-gray-500">
      Already have an account?
      <RouterLink
        :to="{ name: 'signin' }"
        class="font-medium text-gray-600 hover:underline dark:text-gray-500"
        >Login here</RouterLink
      >
    </p>
  </form>
</template>
