interface NftImage {
    contractAddress: string;
    tokenId: String;
    uri: string;
    chainId: number;
    verified: boolean
}

interface Media {
    url: string;
    mimeType?: string;
}

interface MediaSet {
    original: Media
}

type ProfileMedia = NftImage | MediaSet

export const isNftImage = (picture: ProfileMedia): picture is NftImage =>
    (picture as NftImage).contractAddress !== undefined

interface MemixerStats {
    totalFollowers?: number;
    totalFollowing?: number;
    totalPosts?: number;
    totalComments?: number;
    totalMirrors?: number;
    totalPublications?: number;
    totalCollects?: number;
    publicationsTotal?: number;
}

export interface User {
    id?: string;
    address: string;
    name?: string;
    picture?: ProfileMedia;
    coverPicture?: ProfileMedia;
    stats: MemixerStats;
    posts: any[];
    handle: string
}