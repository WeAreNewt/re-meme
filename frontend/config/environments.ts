import { chain } from "wagmi"

export const environmentsConfig = {
    polygon: {
        lensApiUrl: 'https://api.lens.dev',
        chain: chain.polygon,
        lensterUrl: 'https://lenster.xyz',
        appUrl: 'https://rememe.lol'
    },
    mumbai: {
        lensApiUrl: 'https://api-mumbai.lens.dev',
        chain: chain.polygonMumbai,
        lensterUrl: 'https://testnet.lenster.xyz',
        appUrl: 'https://memixer.vercel.app/'
    }
}

export const selectedEnvironment = process.env.NEXT_PUBLIC_SELECTED_CHAIN === 'polygon' ? environmentsConfig.polygon : environmentsConfig.mumbai