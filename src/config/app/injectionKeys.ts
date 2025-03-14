import type AccountGateway from '@/gateways/AccountGateway'
import type RideGateway from '@/gateways/RideGateway'
import type { EchoType } from '@/config/plugins/Echo'
import type { InjectionKey } from 'vue'

export const rideGatewayInjectionKey = Symbol() as InjectionKey<RideGateway>
export const accountGatewayInjectionKey = Symbol() as InjectionKey<AccountGateway>
export const echoInjectionKey = Symbol() as InjectionKey<EchoType>
