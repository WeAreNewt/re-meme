export interface JwtTokens {
    accessToken: string
    refreshToken: string
}

export interface ChallengeData {
    challenge: {
        text: string
    }
}

export interface ChallengeParams {
    request: {
        address: string
    }
}

export interface AuthenticateData {
    authenticate: JwtTokens
}

export interface AuthenticateParams {
    request: {
        address: string
        signature: string
    }
}

export interface RefreshData {
    data: {
        refresh: JwtTokens
    }
}

export interface RefreshDataParams {
    request: {
        refreshToken: string
    }
}

export interface VerifyData {
    verify: boolean
}

export interface VerifyParams {
    request: {
        accessToken: string
    }
}
