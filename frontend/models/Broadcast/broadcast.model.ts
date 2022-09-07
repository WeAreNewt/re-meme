export interface BroadcastData {
    broadcast: {
        txHash: string
    }
}

export interface BroadcastParams {
    request: {
        id: string
        signature: string
    }
}
