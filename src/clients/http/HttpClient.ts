export type Headers = Record<string, string | number>

export type QueryParams = Record<string, string | number>

export type HttpOptions = {
  headers?: Headers
  queryParams?: QueryParams
}

export default interface HttpClient {
  get<R>(url: string, options?: HttpOptions): Promise<R>
  postJson<B, R>(url: string, data?: B, options?: HttpOptions): Promise<R>
  getJson<R>(url: string, options?: HttpOptions): Promise<R>
}
