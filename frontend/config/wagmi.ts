import {
    apiProvider,
    configureChains,
    getDefaultWallets,
  } from '@rainbow-me/rainbowkit';
import { createClient } from 'wagmi';
import { selectedEnvironment } from './environments';

const { chains, provider } = configureChains(
    [selectedEnvironment.chain],
    [
      apiProvider.fallback()
    ]
);
  
const { connectors } = getDefaultWallets({
    appName: 'Memixer',
    chains
});
  
const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

export { chains }

export default wagmiClient;
