import type HttpClient from '@/config/clients/http/HttpClient'

export default interface AccountGateway {
  signin(body: SigninInput): Promise<SigninOutput>
  signup(body: SingupInput): Promise<SingupOutput>
}

export class AccountHttpGateway implements AccountGateway {
  constructor(private readonly httpClient: HttpClient) {}

  async signin(body: SigninInput): Promise<SigninOutput> {
    const response = await this.httpClient.postJson<SigninApiInput, SigninApiOutput>(
      `/api/signin`,
      {
        email: body.email,
        password: body.password,
      },
    )
    return {
      accessToken: response.access_token,
    }
  }

  async signup(body: SingupInput): Promise<SingupOutput> {
    const response = await this.httpClient.postJson<SingupApiInput, SingupApiOutput>(
      `/api/signup`,
      {
        first_name: body.firstName,
        last_name: body.lastName,
        phone: body.phone,
        email: body.email,
        is_driver: body.isDriver,
        is_passenger: body.isPassenger,
        password: body.password,
      },
    )
    return {
      accountId: response.account_id,
    }
  }
}

export type SigninApiInput = {
  email: string
  password: string
}

export type SigninInput = SigninApiInput

export type SigninApiOutput = {
  access_token: string
}

export type SigninOutput = {
  accessToken: string
}

export type SingupApiInput = {
  first_name: string
  last_name: string
  email: string
  phone: string
  is_passenger: boolean
  is_driver: boolean
  password: string
}

export type SingupInput = {
  firstName: string
  lastName: string
  email: string
  phone: string
  isPassenger: boolean
  isDriver: boolean
  password: string
}

export type SingupApiOutput = {
  account_id: string
}

export type SingupOutput = {
  accountId: string
}
