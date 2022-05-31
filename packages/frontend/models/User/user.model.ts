interface Picture {
    contractAddress?: string;
    tokenId?: string;
    uri?: string;
    verified?: boolean;
}

interface MemixerStats {
    totalFollowers?: number;
    totalFollowing?: number;
    totalPosts?: number;
    totalComments?: number;
    totalMirrors?: number;
    totalPublications?: number;
    totalCollects?: number;
}

export interface User {
    id?: string;
    address: string;
    name?: string;
    picture?: Picture;
    coverPicture?: Picture;
    stats: MemixerStats;
    posts: any[];
}