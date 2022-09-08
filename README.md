# re:meme

re:meme is an app that allows users to post original content, such as memes. Other users can remix that content by adding in additional elements (e.g., text, images, drawings) to the original content as a base.

The rise of NFTs has drawn considerable interest on the value of canonical memes, with [major sales](https://mashable.com/article/classic-memes-sold-nft-prices) of the Doge NFT, nyan cat, Rare Pepes, and more.

re:meme is the first ever on-chain meme generator, built on top of Lens Protocol in order to preserve provenance, as well as crediting original meme creators and meme derivative creators. re:meme's on-chain nature gives full visibility into the original creation of meme, and the memes that build on top of it over time.

Memes are only the first step. This primitive can be extended to other media formats like music, video, and even sources for academic papers.

### Buidling

This experiment by Newt is entirely open source. Given the modular nature of smart contracts, re:meme can be integrated, enhanced, or forked by anyone. See [contributing](CONTRIBUTING.md) for more info on joining the Newt community to build with re:meme.


## Local development

### Front-end

Frontend is build with React with a canvas editor. Main features of the frontend are creating, discovering, and sharing on-chain memes.

1. Install [Node](https://nodejs.org/en/download/)
1. Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

```bash
cd packages/frontend

yarn install # Install dependencies
yarn dev # Start development server
```

See step-by-step guidance on /frontend/readme.md

### Lens API

re:meme uses the [Lens API](https://docs.lens.xyz/docs/introduction) in order to interact with the Lens Protocol. This allows the frontend to post memes as publications on Lens.

Each meme that you create is a publication on Lens, to create the actual post we call the [post create endpoint](https://docs.lens.xyz/docs/create-post-typed-data) in order to send the data in-chain.

An IPFS gateway is also used in order to upload and pin memes as content onto IPFS.

### Contracts

re:meme uses a custom [Collect Module](https://docs.lens.xyz/docs/icollectmodulesol) on Polygon to allow for the collection and ownership of publications as memes.

The custom collect module allows meme "owners" to update collect parameters such as `collect currency`, `collect amount`, `fund recipient`, `secondary royalty`, and `who can collect`. Two unique features of this collect module:
1. It is the first customizable collect module on Lens Protocol, meaning that collect parameters can be configured and modified after initialization.
1. It has an ERC-721 collection in the module. Meaning that there is an NFT associated with each meme; this NFT is the "ownership NFT", where the NFT holder is able to update the collect parameters. This means that the meme creator can send or sell the "ownership NFT" to another person, who is then able to update the collect parameters without the need to coorindate with the meme creator. This allows for the sale of the monetization rights of memes. Pretty huge.

The custom collect module is called `UpdatableOwnableFeeCollectModule`. You can discover and read the verified contract on [PolygonScan](https://polygonscan.com/address/0x432960b3209686cc69e2eec1dbbab52a1c0bf938) or on GitHub in the [Lens repository](https://github.com/lens-protocol/modules/blob/master/contracts/collect/UpdatableOwnableFeeCollectModule.sol).

Contract address: [0x432960b3209686cc69e2eec1dbbab52a1c0bf938](https://polygonscan.com/address/0x432960b3209686cc69e2eec1dbbab52a1c0bf938)

1. Install [Foundry](https://github.com/gakonst/foundry#installation)

```bash
cd packages/contracts

foundry install # Install dependencies as git submodules
foundry build # Build smart contracts
foundry test # Run tests
```

## User guide

We uploaded a step-by-step user guide for anyone (technical and non-technical peeps) to use re:meme. Check them out on Lenstube:

1. How to [discover and share memes](https://lenstube.xyz/watch/0xf803-0x02)
1. How to [remix memes](https://lenstube.xyz/watch/0xf803-0x03)
1. How to [create a brand new meme](https://lenstube.xyz/watch/0xf803-0x04)
1. How to [report content](https://lenstube.xyz/watch/0xf803-0x05)
1. How to [appeal content takedown](https://lenstube.xyz/watch/0xf803-0x06)


## License

[Link to code license](LICENSE.md)