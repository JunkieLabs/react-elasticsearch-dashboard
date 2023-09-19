export interface ModelAuthLogin {
    email: string,
    password: string
}

export interface ModelAuthLoginResponse {
    isLoggedIn: boolean
}
export interface ModelAuthTokenParsed {
    token: string
}