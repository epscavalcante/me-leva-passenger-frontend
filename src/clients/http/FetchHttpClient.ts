import type HttpClient from './HttpClient'

export default class FetchHttpAdapter implements HttpClient {
  baseUrl: string

  constructor(readonly baseURL: string) {
    if (!baseURL) throw new Error('The baseURL is required')
    this.baseUrl = baseURL
  }

  async get(url: string): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}/${url}`)
    return response.json()
  }
}
