import { Web3Storage } from 'web3.storage'

const client = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN || '',
    endpoint: new URL('https://api.web3.storage')
})

export default client;
