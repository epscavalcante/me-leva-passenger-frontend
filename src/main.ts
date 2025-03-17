import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './config/router'
import FetchHttpAdapter from './config/clients/http/FetchHttpClient'
import Config from './config/app'
import { RideHttpGateway } from './gateways/RideGateway'
import Echo from './config/plugins/Echo'
import { accountGatewayInjectionKey, rideGatewayInjectionKey } from './config/app/injectionKeys'
import BaseInput from './components/BaseInput.vue'
import { AccountHttpGateway } from './gateways/AccountGateway'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Echo, {
  key: import.meta.env.VITE_WEBSOCKET_APP_KEY,
  wsHost: import.meta.env.VITE_WEBSOCKET_HOST,
  wsPort: import.meta.env.VITE_WEBSOCKET_PORT,
  wssPort: 443,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
})

const fetchHttpAdapter = new FetchHttpAdapter(Config.apiUrl)

const rideGateway = new RideHttpGateway(fetchHttpAdapter)
app.provide(rideGatewayInjectionKey, rideGateway)

const accountGateway = new AccountHttpGateway(fetchHttpAdapter)
app.provide(accountGatewayInjectionKey, accountGateway)

app.component('BaseInput', BaseInput)

app.mount('#app')
