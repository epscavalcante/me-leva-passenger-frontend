<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type RideGateway from '@/gateways/RideGateway'
import type { GetRideDetailResponse } from '@/gateways/RideGateway'
import TheMapping from '@/components/TheMapping.vue'
import { toast } from 'vue-sonner'
import type { EchoType } from '@/plugins/Echo'
const route = useRoute()
const isLoading = ref(true)
const rideDetail = ref<GetRideDetailResponse | null>(null)
const rideGateway: RideGateway = inject('RideGateway')!
const echo: EchoType = inject('Echo')!

onMounted(async () => {
  await getRideDetail(route.params.rideId as string)
  setupRideStartedEvent()
})

async function getRideDetail(rideId: string) {
  isLoading.value = true
  const getRideDetailResponse = await rideGateway.getRideDetail(rideId)
  rideDetail.value = getRideDetailResponse
  isLoading.value = false
}

function setupRideStartedEvent() {
  echo.channel('RideStartedEvent').listen('.rides.started', function () {
    toast('Ride started')
  })
}
</script>

<template>
  <main>
    <section>
      <section class="flex justify-between items-center mb-10">
        <h1 class="text-4xl font-bold">Ride detail</h1>

        <RouterLink
          :to="{ name: 'rides' }"
          class="bg-gray-300 px-4 py-3 rounded-lg hover:bg-gray-400 font-medium"
        >
          Back
        </RouterLink>
      </section>
    </section>

    <section class="h-96">
      <div
        v-if="isLoading"
        role="status"
        class="h-full animate-pulse w-full bg-gray-400 rounded-lg"
      ></div>
      <TheMapping
        v-else
        :current-position="{ latitude: -15.82449, longitude: -47.92756 }"
        :end-position="{ latitude: -15.8276, longitude: -47.92621 }"
        class="h-full"
        :routing="
          rideDetail?.positions.map((item) => ({
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
          }))
        "
      />
    </section>

    <pre>{{ rideDetail }}</pre>
  </main>
</template>

<style></style>
