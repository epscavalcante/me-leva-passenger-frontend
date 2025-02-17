<script setup lang="ts">
import LineSkeleton from '@/components/LineSkeleton.vue'
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold mb-10">Rides</h1>

    <section class="bg-gray-300 h-20 mb-5 rounded-2xl"></section>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-gray-700 uppercase bg-gray-300">
          <tr>
            <th scope="col" class="px-6 py-3">Column</th>
            <th scope="col" class="px-6 py-3 w-40">
              <div class="flex items-center">Column</div>
            </th>
            <th scope="col" class="px-6 py-3 w-40">
              <div class="flex items-center">Column</div>
            </th>
            <th scope="col" class="px-6 py-3 w-40">
              <div class="flex items-center">Column</div>
            </th>
            <th scope="col" class="px-6 py-3 w-40">
              <span class="sr-only">Column</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i of 10" :key="i" class="bg-gray-300">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900">
              <div role="status" class="max-w-sm animate-pulse w-full">
                <div class="h-5 rounded-full bg-gray-400 w-full"></div>
              </div>
            </th>
            <td class="px-6 py-4">
              <LineSkeleton />
            </td>
            <td class="px-6 py-4">
              <LineSkeleton />
            </td>
            <td class="px-6 py-4">
              <LineSkeleton />
            </td>
            <td class="px-6 py-4 flex justify-center">
              <a
                href="#"
                class="font-medium text-center text-blue-600 dark:text-blue-500 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style></style>
