<script setup lang="ts">
import { computed, ref } from 'vue'
import TheMapping from './TheMapping.vue'
import {
  DialogContent,
  DialogOverlay,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogRoot,
} from 'radix-vue'
import Utils from '@/utils'

const isRideSimulationDialogOpened = ref(false)
const isRideSimulationLoading = ref(true)

const directions = computed(() => {
  return [
    { latitude: -15.82449, longitude: -47.92756 },
    { latitude: -15.82404, longitude: -47.9269 },
    { latitude: -15.82397, longitude: -47.9268 },
    { latitude: -15.82386, longitude: -47.92661 },
    { latitude: -15.82418, longitude: -47.92636 },
    { latitude: -15.8243, longitude: -47.92627 },
    { latitude: -15.82436, longitude: -47.92623 },
    { latitude: -15.82441, longitude: -47.92619 },
    { latitude: -15.82452, longitude: -47.92611 },
    { latitude: -15.82465, longitude: -47.92601 },
    { latitude: -15.82478, longitude: -47.9259 },
    { latitude: -15.825, longitude: -47.9257 },
    { latitude: -15.82501, longitude: -47.92573 },
    { latitude: -15.82527, longitude: -47.92552 },
    { latitude: -15.82537, longitude: -47.92546 },
    { latitude: -15.82546, longitude: -47.92538 },
    { latitude: -15.82554, longitude: -47.92532 },
    { latitude: -15.82568, longitude: -47.92522 },
    { latitude: -15.8257, longitude: -47.9252 },
    { latitude: -15.82588, longitude: -47.92501 },
    { latitude: -15.82601, longitude: -47.9252 },
    { latitude: -15.82636, longitude: -47.92569 },
    { latitude: -15.82648, longitude: -47.92584 },
    { latitude: -15.82651, longitude: -47.92589 },
    { latitude: -15.82656, longitude: -47.92596 },
    { latitude: -15.8267, longitude: -47.92615 },
    { latitude: -15.82733, longitude: -47.92706 },
    { latitude: -15.82759, longitude: -47.9274 },
    { latitude: -15.82807, longitude: -47.92805 },
    { latitude: -15.82836, longitude: -47.92845 },
    { latitude: -15.82843, longitude: -47.92839 },
    { latitude: -15.82851, longitude: -47.92833 },
    { latitude: -15.82825, longitude: -47.92797 },
    { latitude: -15.82796, longitude: -47.92759 },
    { latitude: -15.82773, longitude: -47.92727 },
    { latitude: -15.82795, longitude: -47.92712 },
    { latitude: -15.82804, longitude: -47.92703 },
    { latitude: -15.82814, longitude: -47.92695 },
    { latitude: -15.82812, longitude: -47.92692 },
    { latitude: -15.8276, longitude: -47.92621 },
  ]
})

async function openRideSimulation() {
  isRideSimulationDialogOpened.value = true
  await Utils.sleep(2000)
  isRideSimulationLoading.value = false
}

function cancelSimulation() {
  isRideSimulationDialogOpened.value = false
  isRideSimulationLoading.value = true
}
</script>

<template>
  <section
    class="bg-gray-300 flex flex-col lg:flex-row w-full items-center justify-center gap-10 rounded-lg mb-10 p-4"
  >
    <img
      src="@/assets/location-search.svg"
      alt=""
      class="max-w-2xs md:max-w-96 lg:max-w-lg w-full"
    />

    <form class="rounded-lg max-w-[450px]">
      <h3 class="text-3xl mb-5 font-bold">Request a Ride</h3>

      <h4 class="font-bold mb-3">Pickup location</h4>

      <div class="flex gap-4">
        <div class="w-full">
          <label for="large-input" class="block mb-1.5 text-sm font-medium text-gray-900"
            >From latitude</label
          >
          <input
            type="text"
            id="large-input"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-400 text-base"
          />
        </div>

        <div class="w-full">
          <label for="large-input" class="block mb-1.5 text-sm font-medium text-gray-900"
            >From longitude</label
          >
          <input
            type="text"
            id="large-input"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-400 text-base"
          />
        </div>
      </div>

      <br />

      <h4 class="font-bold mb-3">Where to</h4>
      <div class="flex gap-4">
        <div class="w-full">
          <label for="to-latitude" class="block mb-1.5 text-sm font-medium text-gray-900"
            >To latitude</label
          >
          <input
            type="text"
            id="to-latitude"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-400 text-base"
          />
        </div>

        <div class="w-full">
          <label for="to-longitude" class="block mb-1.5 text-sm font-medium text-gray-900"
            >To longitude</label
          >
          <input
            type="text"
            id="to-longitude"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-400 text-base"
          />
        </div>
      </div>

      <br />

      <button
        type="button"
        class="bg-gray-500 w-full px-4 py-5 rounded-lg font-medium cursor-pointer"
        @click="openRideSimulation"
      >
        Request ride
      </button>
    </form>
  </section>

  <DialogRoot :open="isRideSimulationDialogOpened">
    <DialogPortal>
      <DialogOverlay class="bg-black/90 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent
        class="data-[state=open]:animate-contentShow h-fit fixed top-[50%] left-[50%] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-5 focus:outline-none z-[100]"
      >
        <DialogTitle class="m-0 text-xl font-semibold mb-10">Ride simulation</DialogTitle>

        <DialogDescription class="">
          <template v-if="isRideSimulationLoading">
            <section class="flex items-center justify-between gap-4">
              <div role="status" class="h-20 animate-pulse w-full">
                <div class="h-14 bg-gray-400 rounded-lg"></div>
              </div>

              <div role="status" class="h-20 animate-pulse w-full">
                <div class="h-14 bg-gray-400 rounded-lg"></div>
              </div>
            </section>
          </template>

          <template v-else>
            <section class="flex items-center justify-between gap-4">
              <div role="status" class="h-20 animate-pulse w-full">
                <div class="h-14 bg-gray-400 rounded-lg"></div>
              </div>

              <div role="status" class="h-20 animate-pulse w-full">
                <div class="h-14 bg-gray-400 rounded-lg"></div>
              </div>
            </section>
          </template>
        </DialogDescription>

        <section class="h-96">
          <div
            v-if="isRideSimulationLoading"
            role="status"
            class="h-full animate-pulse w-full bg-gray-400 rounded-lg"
          ></div>
          <TheMapping
            v-else
            :current-position="{ latitude: -15.82449, longitude: -47.92756 }"
            :end-position="{ latitude: -15.8276, longitude: -47.92621 }"
            :routing="directions"
            class="h-full"
          />
        </section>

        <button
          type="button"
          class="bg-gray-500 w-full px-4 py-5 rounded-lg font-medium cursor-pointer mt-5"
        >
          Confirm, Request ride
        </button>

        <button
          type="button"
          class="bg-white border border-gray-50 w-full px-4 py-5 rounded-lg font-medium cursor-pointer mt-5"
          @click="cancelSimulation"
        >
          Cancel
        </button>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style></style>
