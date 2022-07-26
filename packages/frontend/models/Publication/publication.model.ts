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
            freeCollectModule: { followerOnly: boolean }
        }
        referenceModule: {
            followerOnlyReferenceModule: boolean
        }
    }
}

export interface CreateCommentTypedData {

}

export interface CreateCommentTypedDataParams {

}

export interface GetPublicationParams {
    request: {
        publicationId: string
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
}

export interface GetPublicationData {
    publication: PublicationData
}