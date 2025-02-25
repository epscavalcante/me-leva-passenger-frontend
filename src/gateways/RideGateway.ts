import type HttpClient from '@/clients/http/HttpClient'

export default interface RideGateway {
  requestRide(body: RequestRideInput): Promise<RequestRideOutput>
  getLatestRides(): Promise<GetLatestRidesResponde>
  getRideDetail(rideId: string): Promise<GetRideDetailResponse>
}

export class RideHttpGateway implements RideGateway {
  constructor(private readonly httpClient: HttpClient) {}

  async getRideDetail(rideId: string): Promise<GetRideDetailResponse> {
    const response = await this.httpClient.getJson<GetRideDetailResponse>(`/api/rides/${rideId}`)
    return response
  }

  async requestRide(body: RequestRideInput): Promise<RequestRideOutput> {
    const response = await this.httpClient.postJson<RequestRideInput, RequestRideOutput>(
      '/api/rides',
      body,
    )

    return {
      rideId: response.rideId,
    }
  }

  async getLatestRides(): Promise<GetLatestRidesResponde> {
    const response = (await this.httpClient.get(`api/rides`, {
      queryParams: {
        page: 1,
        perPage: 2,
        sortBy: 'created_at',
        sortDir: 'DESC',
      },
    })) as any
    return {
      items: response.items,
    }
  }
}

export type RequestRideInput = {
  passenger_id: string
  from_latitude: number
  from_longitude: number
  to_latitude: number
  to_longitude: number
}

export type RequestRideOutput = {
  rideId: string
}

export type GetRidesParams = {
  page?: number
  perPage?: number
  status?: string
  sortBy?: string
  sortDir?: 'DESC' | 'ASC'
}

export type GetLatestRidesResponde = {
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
