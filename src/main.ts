import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './config/router'
import RideService from './services/RideService'
import FetchHttpAdapter from './clients/http/FetchHttpClient'
import Config from './config/app'
import { RideHttpGateway } from './gateways/RideGateway'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const fetchHttpAdapter = new FetchHttpAdapter(Config.apiUrl)

const rideGateway = new RideHttpGateway(fetchHttpAdapter)
app.provide('RideGateway', rideGateway)

const rideService = new RideService(fetchHttpAdapter)
app.provide('RideService', rideService)

app.mount('#app')
