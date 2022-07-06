import { create } from 'ipfs-http-client'

const auth =
    'Basic ' + Buffer.from(process.env.NEXT_PUBLIC_IPFS_INFURA_PROJECT_ID + ':' + process.env.NEXT_PUBLIC_IPFS_INFURA_SECRET).toString('base64');
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

export default client;
