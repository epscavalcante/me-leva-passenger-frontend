<script setup lang="ts">
import LatestRides from '@/components/HomeView/LatestRides.vue'
import RequestRideForm from '@/components/RequestRideForm.vue'
</script>

<template>
  <main>
    <section class="flex justify-between items-center mb-10">
      <h1 class="text-4xl font-bold">Home</h1>
    </section>

    <RequestRideForm />

    <LatestRides />
  </main>
</template>

<style></style>
