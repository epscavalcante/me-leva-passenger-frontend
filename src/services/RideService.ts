import type HttpClient from '@/clients/http/HttpClient'
import Utils from '@/utils'

export default class RideService {
  constructor(private readonly httpClient: HttpClient) {}

  async getRides(params?: GetRidesParams): Promise<GetRidesResponse> {
    const response = await this.httpClient.get<{ items: []; total: number }>(`api/rides`, {
      queryParams: {
        page: params?.page,
        status: params?.status,
        perPage: params?.perPage,
        sortBy: params?.sortBy,
        sortDir: params?.sortDir,
      },
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
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

type GetRidesParams = {
  page?: number
  status?: string | null
  perPage?: number
  sortBy?: string
  sortDir?: 'DESC' | 'ASC'
}

export type GetRidesResponse = {
  items: []
  total: number
}

export type GetRideByIdResponse = {}
