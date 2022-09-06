import { chain } from "wagmi"

export const environmentsConfig = {
    polygon: {
        lensApiUrl: 'https://api.lens.dev',
        chain: chain.polygon,
        lensterUrl: 'https://lenster.xyz',
        appUrl: 'https://rememe.lol',
        collectModuleAddress: 'fillthis',
        lensHubAddress: 'fillThis'
    },
    mumbai: {
        lensApiUrl: 'https://api-mumbai.lens.dev',
        chain: chain.polygonMumbai,
        lensterUrl: 'https://testnet.lenster.xyz',
        appUrl: 'https://memixer.vercel.app/',
        collectModuleAddress: '0xa8CEb9108D659c675145BEBdaB8CE37ee12E974D',
        lensHubAddress: '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82'
    }
}

export const selectedEnvironment = process.env.NEXT_PUBLIC_SELECTED_CHAIN === 'polygon' ? environmentsConfig.polygon : environmentsConfig.mumbai