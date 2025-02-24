import type HttpClient from '@/clients/http/HttpClient'

export default class RideService {
  constructor(private readonly httpClient: HttpClient) {}

  async getRides(params?: GetRidesParams): Promise<GetRidesResponse> {
    const response = await this.httpClient.get<{ items: []; total: number }>(`api/rides`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      queryParams: {
        ...(params?.status && { status: params.status }),
        ...(params?.page && { page: params.perPage }),
        ...(params?.perPage && { perPage: Number(params.perPage) }),
        ...(params?.sortBy && { sortBy: params.sortBy }),
        ...(params?.sortDir && { sortDir: params.sortDir as 'DESC' | 'ASC' }),
      },
    })
    return {
      items: response.items,
      total: response.total,
    }
  }

  async getRideById(rideId: string): Promise<any> {
    const response = await this.httpClient.get(`api/rides/${rideId}`)
    return response
  }
}

export type GetRidesParams = {
  page?: number
  perPage?: number
  status?: string
  sortBy?: string
  sortDir?: 'DESC' | 'ASC'
}

export type GetRideByIdResponse = {}

export type GetRidesResponse = {
  items: GetRidesItemResponse[]
  total: number
}

export type GetRidesItemResponse = {
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
}
