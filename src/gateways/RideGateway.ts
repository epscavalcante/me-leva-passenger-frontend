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
    const response = await this.httpClient.postJson<RequestRideApiInput, RequestRideApiOutput>(
      '/api/rides',
      {
        passenger_id: body.passengerId,
        from_latitude: body.fromLatitude,
        from_longitude: body.fromLongitude,
        to_latitude: body.toLatitude,
        to_longitude: body.toLongitude,
      },
    )

    return {
      rideId: response.ride_id,
    }
  }

  async getLatestRides(): Promise<GetLatestRidesResponde> {
    const response = (await this.httpClient.get(`api/rides`, {
      queryParams: {
        page: 1,
        per_age: 2,
        sort_by: 'created_at',
        sort_dir: 'DESC',
      },
    })) as any

    // onde faço a conversão para camelCase
    return {
      items: response.items,
    }
  }
}

export type RequestRideApiInput = {
  passenger_id: string
  from_latitude: number
  from_longitude: number
  to_latitude: number
  to_longitude: number
}

export type RequestRideInput = {
  passengerId: string
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
