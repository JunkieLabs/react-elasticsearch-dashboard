export interface ModelAuthLogin {
    email: string,
    password: string
}

export interface ModelAuthLoginResponse {
    isLoggedIn: boolean
    token?: string
}
export interface ModelAuthTokenParsed {
    token: string
}