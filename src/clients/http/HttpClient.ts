export default interface HttpClient {
  get(url: string, options?: unknown): Promise<unknown>
}
