export const parseIpfs = (url: string) => {
    if(url.startsWith('ipfs://')) {
        return url.replace('ipfs://', "https://lens.infura-ipfs.io/ipfs/")
    }
    return url
}
