import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './config/router'
import RideService from './services/RideService'
import FetchHttpAdapter from './clients/http/FetchHttpClient'
import Config from './config/app'
import { RideHttpGateway } from './gateways/RideGateway'
// import Echo from 'laravel-echo'
import Echo from './plugins/Echo'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Echo, {
  key: 'my-app-key',
  wsHost: 'localhost',
  wsPort: 9000,
  wssPort: 443,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
})

const fetchHttpAdapter = new FetchHttpAdapter(Config.apiUrl)

const rideGateway = new RideHttpGateway(fetchHttpAdapter)
app.provide('RideGateway', rideGateway)

const rideService = new RideService(fetchHttpAdapter)
app.provide('RideService', rideService)

app.mount('#app')
