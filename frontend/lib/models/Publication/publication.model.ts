import { User } from "../User/user.model"

export interface CreatePostTypedData {
    createPostTypedData: {
        id: string
        expiresAt: string
        typedData: {
            types: {
                PostWithSig: {
                    name: string
                    type: string
                }[]
            }
            domain: {
                name: string
                chainId: number
                version: string
                verifyingContract: string
            }
            value: {
                nonce: number
                deadline: string
                profileId: string
                contentURI: string
                collectModule: string
                collectModuleInitData: string
                referenceModule: string
                referenceModuleInitData: string
            }
        }
    }
}

export interface CreatePostTypedDataParams {
    request: {
        profileId: string
        contentURI: string
        collectModule: {
            freeCollectModule?: { followerOnly: boolean }
            unknownCollectModule?: {
                contractAddress: string,
                data: string
            }
        }
        referenceModule: {
            followerOnlyReferenceModule: boolean
        }
    }
}

export interface CreateCommentTypedData {
    createCommentTypedData: {
        id: string
        expiresAt: string
        typedData: {
            types: {
                CommentWithSig: {
                    name: string
                    type: string
                }[]
            }
            domain: {
                name: string
                chainId: number
                version: string
                verifyingContract: string
            }
            value: {
                nonce: number
                deadline: string
                profileId: string
                profileIdPointed: string
                pubIdPointed: string
                contentURI: string
                referenceModuleData: string
                collectModule: string
                collectModuleInitData: string
                referenceModule: string
                referenceModuleInitData: string
            }
        }
    }
}

export interface CreateCommentTypedDataParams {
    request: {
        profileId: string
        publicationId: string
        contentURI: string
        collectModule: {
            freeCollectModule?: { followerOnly: boolean }
            unknownCollectModule?: {
                contractAddress: string,
                data: string
            }
        }
        referenceModule: {
            followerOnlyReferenceModule: boolean
        }
    }
}

export interface GetPublicationParams {
    request: {
        publicationId?: string
        txHash?: string
    }
}

interface MetadataMedia {
    original: {
        url: string
        mimeType: string
    }
}

interface PublicationMetadata {
    media: MetadataMedia[]
    content: string
    attributes: string[]
    description: string
    name: string
}

export interface PublicationData {
    id: string,
    profile: User,
    createdAt: number,
    stats: {
        totalAmountOfComments: number
    },
    metadata: PublicationMetadata
    collectModule: {
        contractAddress: string,
        collectModuleReturnData: string
        type: string
    }
}

export interface GetPublicationData {
    publication: PublicationData
}

export interface GetPublicationsParams {
    request: {
        commentsOf?: string
        sources?: string[]
        limit?: number
        cursor?: string
    }
}

export interface GetPublicationsData {
    publications: {
        items: PublicationData[]
        pageInfo: {
            prev: string
            next: string
            totalCount: number
        }
    }
}

export interface ExplorePublicationsParams {
    request: {
        sources?: string[]
        sortCriteria?: string
        limit?: number
        timestamp?: number
        publicationTypes?: string[]
    }
}

export interface ExplorePublicationsData {
    explorePublications: {
        items: PublicationData[]
        pageInfo: {
            prev: string
            next: string
            totalCount: number
        }
    }
}


export interface HasTxBeenIndexedParams {
    request: {
        txHash?: string
    }
}

export interface HasTxBeenIndexedData {
    hasTxHashBeenIndexed: {
        indexed: boolean
    }
}
