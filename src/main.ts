import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './config/router'
import FetchHttpAdapter from './config/clients/http/FetchHttpClient'
import Config from './config/app'
import { RideHttpGateway } from './gateways/RideGateway'
import { accountGatewayInjectionKey, rideGatewayInjectionKey } from './config/app/injectionKeys'
import BaseInput from './components/BaseInput.vue'
import { AccountHttpGateway } from './gateways/AccountGateway'
import Realtime from './config/plugins/Realtime'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Realtime, {
  adapter: import.meta.env.VITE_WEBSOCKET_ADAPTER,
  key: import.meta.env.VITE_WEBSOCKET_APP_KEY,
  wsHost: import.meta.env.VITE_WEBSOCKET_HOST,
  wsPort: import.meta.env.VITE_WEBSOCKET_PORT,
  forceTLS: import.meta.env.VITE_WEBSOCKET_FORCE_TLS,
  cluster: import.meta.env.VITE_WEBSOCKET_CLUSTER,
})

const fetchHttpAdapter = new FetchHttpAdapter(Config.apiUrl)

const rideGateway = new RideHttpGateway(fetchHttpAdapter)
app.provide(rideGatewayInjectionKey, rideGateway)

const accountGateway = new AccountHttpGateway(fetchHttpAdapter)
app.provide(accountGatewayInjectionKey, accountGateway)

app.component('BaseInput', BaseInput)

app.mount('#app')
