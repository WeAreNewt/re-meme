export const parseIpfs = (url: string) => {
    if(url.startsWith('ipfs://')) {
        return url.replace('ipfs://', "https://ipfs.infura.io/ipfs/")
    }
    return url
}
