export type HttpOptions = {
  headers?: { [key: string]: string | number }
  queryParams?: Record<string, string | number>
}

export default interface HttpClient {
  get<R>(url: string, options?: HttpOptions): Promise<R>
}
