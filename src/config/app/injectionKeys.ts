import type AccountGateway from '@/gateways/AccountGateway'
import type RideGateway from '@/gateways/RideGateway'
import type { InjectionKey } from 'vue'
import type { RealtimeType } from '../plugins/Realtime'

export const rideGatewayInjectionKey = Symbol() as InjectionKey<RideGateway>
export const accountGatewayInjectionKey = Symbol() as InjectionKey<AccountGateway>
export const realtimeInjectionKey = Symbol() as InjectionKey<RealtimeType>
