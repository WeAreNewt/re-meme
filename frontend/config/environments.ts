import { chain } from "wagmi"

export const environmentsConfig = {
    polygon: {
        lensApiUrl: 'https://api.lens.dev',
        chain: chain.polygon,
        lensterUrl: 'https://lenster.xyz',
        appUrl: 'https://rememe.lol',
        collectModuleAddress: 'fillthis',
        lensHubAddress: 'fillThis',
        appId: process.env.NEXT_PUBLIC_APP_ID || 're:meme'
    },
    mumbai: {
        lensApiUrl: 'https://api-mumbai.lens.dev',
        chain: chain.polygonMumbai,
        lensterUrl: 'https://testnet.lenster.xyz',
        appUrl: 'https://memixer.vercel.app',
        collectModuleAddress: '0xA78E4a4D0367f0f4674130F0Bb2653957ab5917e',
        lensHubAddress: '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82',
        appId: process.env.NEXT_PUBLIC_APP_ID || 're:meme'
    }
}

export const selectedEnvironment = process.env.NEXT_PUBLIC_SELECTED_CHAIN === 'polygon' ? environmentsConfig.polygon : environmentsConfig.mumbai