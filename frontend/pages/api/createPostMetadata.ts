import { create } from "ipfs-http-client";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid'
import { selectedEnvironment } from "../../lib/config/environments";
import { createRouter } from 'next-connect';
import { base64 } from "ethers/lib/utils";
import { verifyToken } from "../../lib/middleware/verifyToken";

const auth =
'Basic ' + Buffer.from(process.env.IPFS_PROJECT_ID + ':' + process.env.IPFS_API_KEY_SECRET).toString('base64')

const ipfsClient = create({
    headers: {
        authorization: auth
    },
    url: "https://ipfs.infura.io:5001/api/v0"
})

type ExtendedRequest  = {
    canvasState: string
    meme: string
} & NextApiRequest

const dataURItoUInt8Array = (data: string, type: string) => {
    const prunedInitialData = data.replace(`data:${type};base64,`, '')
    const decodedData = base64.decode(prunedInitialData)
    return decodedData
}

async function handlePost(req: ExtendedRequest, res: NextApiResponse) {
    const filesToUpload = [
        {
            path: 'meme',
            content: dataURItoUInt8Array(req.body.meme, 'image/jpeg')
        },
        {
            path: 'canvas_state.json',
            content: JSON.stringify(req.body.canvasState)
        }
    ]
    for await (const inputFile of ipfsClient.addAll(filesToUpload, { wrapWithDirectory: true })) {
        if(inputFile.path === "") {
            const metadata = {
                version: '1.0.0',
                metadata_id: uuidv4(),
                name: 'Created in re:meme',
                attributes: [],
                image: `ipfs://${inputFile.cid}/meme`,
                imageMimeType: 'image/jpeg',
                media: [
                    {
                        item: `ipfs://${inputFile.cid}/meme`,
                        type: 'image/jpeg'
                    }
                ],
                appId: selectedEnvironment.appId
            }
            const result = await ipfsClient.add(JSON.stringify(metadata))
            res.status(200).send(result.path)
        }
    }
}

const router = createRouter<ExtendedRequest, NextApiResponse>();

router
    .use(verifyToken)
    .post(handlePost)

export default router.handler({
    onError: (err, _, res) => {
        console.error(err)
        res.status(500).send('Internal server error')
    },
    onNoMatch: (_, res) => {
        res.status(405).send('Method not allowed')
    }
})

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4.5mb'
        }
    }
}