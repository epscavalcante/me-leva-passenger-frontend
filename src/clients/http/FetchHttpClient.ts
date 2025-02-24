import type { HttpOptions } from './HttpClient'
import type HttpClient from './HttpClient'

export default class FetchHttpAdapter implements HttpClient {
  baseUrl: string

  constructor(readonly baseURL: string) {
    if (!baseURL) throw new Error('The baseURL is required')
    this.baseUrl = baseURL
  }

  async get<R>(url: string, options?: HttpOptions): Promise<R> {
    const headers = new Headers()
    if (options?.headers) {
      for (const header of Object.keys(options.headers)) {
        headers.append(header, String(options.headers[header]))
      }
    }

    const _url = new URL(url, this.baseUrl)
    if (options?.queryParams) {
      for (const param of Object.keys(options.queryParams)) {
        _url.searchParams.append(param, String(options.queryParams[param]))
      }
    }

    const request = new Request(_url, {
      method: 'GET',
      headers,
    })
    const response = await fetch(request)

    return response.json()
  }
}
