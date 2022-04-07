# MEMIXER

An app that allows users to post ‘original content’ and other users can ‘remix’ that content by adding in additional elements to the "original content" as a base.

This will be built off of the Lens Protocol.

You can check the smart contracts at [packages/contracts](/packages/contracts)

You can check the frontend at [packages/frontend](/packages/frontend)

## Local development

### Contracts

1. Install [Foundry](https://github.com/gakonst/foundry#installation)

```bash
cd packages/contracts

foundry install # Install dependencies as git submodules
foundry build # Build smart contracts
foundry test # Run tests
```

### Front-end

1. Install [Node](https://nodejs.org/en/download/)
1. Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

```bash
cd packages/frontend

yarn install # Install dependencies
yarn dev # Start development server
```