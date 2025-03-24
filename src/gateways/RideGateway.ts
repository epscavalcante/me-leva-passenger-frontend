import type HttpClient from '@/config/clients/http/HttpClient'
import { authStore } from '@/config/stores/authStore'

export default interface RideGateway {
  requestRide(body: RequestRideInput): Promise<RequestRideOutput>
  getRides(params?: GetRidesParams): Promise<GetRidesOutput>
  getLatestRides(): Promise<GetLatestRidesOutput>
  getRideDetail(rideId: string): Promise<GetRideDetailOutput>
}

export class RideHttpGateway implements RideGateway {
  private _authStore: any

  constructor(private readonly httpClient: HttpClient) {
    this._authStore = authStore()
  }

  async getRideDetail(rideId: string): Promise<GetRideDetailOutput> {
    const response = await this.httpClient.getJson<GetRideDetailResponse>(
      `/api/rides/${rideId}`,
      this.getHeaders(),
    )
    return {
      ...response,
      fromLatitude: Number(response.fromLatitude),
      fromLongitude: Number(response.fromLongitude),
      toLatitude: Number(response.toLatitude),
      toLongitude: Number(response.toLongitude),
    }
  }

  async requestRide(body: RequestRideInput): Promise<RequestRideOutput> {
    const response = await this.httpClient.postJson<RequestRideApiInput, RequestRideApiOutput>(
      '/api/rides',
      {
        from_latitude: body.fromLatitude,
        from_longitude: body.fromLongitude,
        to_latitude: body.toLatitude,
        to_longitude: body.toLongitude,
      },
      this.getHeaders(),
    )

    return {
      rideId: response.ride_id,
    }
  }

  async getLatestRides(): Promise<GetLatestRidesOutput> {
    const response = await this.httpClient.getJson<GetLatestRidesResponse>(`api/rides`, {
      queryParams: {
        page: 1,
        per_age: 2,
        sort_by: 'created_at',
        sort_dir: 'DESC',
      },
      ...this.getHeaders(),
    })

    // onde faço a conversão para camelCase
    return {
      items: response.items,
    }
  }

  async getRides(params?: GetRidesParams): Promise<GetRidesOutput> {
    const response = await this.httpClient.getJson<GetRidesResponse>('api/rides', {
      queryParams: {
        page: params?.page,
        status: params?.status,
        sort_by: params?.sortBy,
        sort_dir: params?.sortDir,
      },
      ...this.getHeaders(),
    })
    return {
      total: response.total,
      items: response.items,
    }
  }

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this._authStore.getToken as string}`,
      },
    }
  }
}

export type RequestRideApiInput = {
  from_latitude: number
  from_longitude: number
  to_latitude: number
  to_longitude: number
}

export type RequestRideInput = {
  fromLatitude: number
  fromLongitude: number
  toLatitude: number
  toLongitude: number
}

export type RequestRideOutput = {
  rideId: string
}

export type RequestRideApiOutput = {
  ride_id: string
}

export type GetRidesParams = {
  page?: number
  perPage?: number
  status?: string
  sortBy?: string
  sortDir?: 'DESC' | 'ASC'
}

export type GetLatestRidesOutput = {
  items: {
    rideId: string
    fromLatitude: string
    fromLongitude: string
    toLatitude: string
    toLongitude: string
    driverId: string
    driverName: string
    passengerId: string
    passengerName: string
    status: string
    distance: number
    fare: number
  }[]
}

export type GetLatestRidesResponse = {
  items: {
    rideId: string
    fromLatitude: string
    fromLongitude: string
    toLatitude: string
    toLongitude: string
    driverId: string
    driverName: string
    passengerId: string
    passengerName: string
    status: string
    distance: number
    fare: number
  }[]
}

export type GetRidesOutput = {
  total: number
  items: {
    rideId: string
    fromLatitude: string
    fromLongitude: string
    toLatitude: string
    toLongitude: string
    driverId: string
    driverName: string
    passengerId: string
    passengerName: string
    status: string
    distance: number
    fare: number
  }[]
}

export type GetRidesResponse = {
  total: number
  items: {
    rideId: string
    fromLatitude: string
    fromLongitude: string
    toLatitude: string
    toLongitude: string
    driverId: string
    driverName: string
    passengerId: string
    passengerName: string
    status: string
    distance: number
    fare: number
  }[]
}

export type GetRideDetailOutput = {
  rideId: string
  fromLatitude: number
  fromLongitude: number
  toLatitude: number
  toLongitude: number
  driverId: string
  driverName: string
  passengerId: string
  passengerName: string
  status: string
  distance: number
  fare: number
  positions: { latitude: string; longitude: string }[]
}

export type GetRideDetailResponse = {
  rideId: string
  fromLatitude: string
  fromLongitude: string
  toLatitude: string
  toLongitude: string
  driverId: string
  driverName: string
  passengerId: string
  passengerName: string
  status: string
  distance: number
  fare: number
  positions: { latitude: string; longitude: string }[]
}
