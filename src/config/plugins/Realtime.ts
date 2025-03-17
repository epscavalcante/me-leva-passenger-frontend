import Echo from 'laravel-echo'
import type { App } from 'vue'
import Pusher from 'pusher-js'
import { realtimeInjectionKey } from '../app/injectionKeys'

export type RealtimeAdapter = 'reverb' | 'pusher'
export type RealtimeType = Echo<RealtimeAdapter>

export type RealtimeOptions = {
  adapter: string
  key: string
  cluster?: string
  wsHost?: string
  wsPort?: number
  wssPort?: number
  forceTLS?: boolean
  enabledTransports?: string[]
}

export default {
  install(app: App, options: RealtimeOptions) {
    const adapter = RealtimeFactory.create(options.adapter, options)
    app.config.globalProperties.$realtime = adapter
    app.provide(realtimeInjectionKey, adapter)
  },
}

class RealtimeFactory {
  static create(adapter: string, options: RealtimeOptions): RealtimeType {
    if (adapter === 'pusher')
      return new Echo({
        broadcaster: adapter,
        client: new Pusher(options.key, {
          cluster: options.cluster!,
          forceTLS: options.forceTLS,
        }),
      })

    if (adapter === 'reverb')
      return new Echo({
        broadcaster: adapter,
        client: new Pusher(options.key, {
          cluster: '',
          forceTLS: false,
          httpHost: options.wsHost,
          wsHost: options.wsHost,
          wsPort: options.wsPort,
        }),
        ...options,
      })

    throw new Error('Invalid adapter')
  }
}
