type Headers = Record<string, string | number>

type QueryParams = Record<string, string | number>

export type HttpOptions = {
  headers?: Headers
  queryParams?: QueryParams
}

export default interface HttpClient {
  get<R>(url: string, options?: HttpOptions): Promise<R>
}
