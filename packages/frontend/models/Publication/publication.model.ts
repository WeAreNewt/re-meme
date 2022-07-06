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
