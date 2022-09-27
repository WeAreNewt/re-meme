import {
    getDefaultWallets,
    DisclaimerComponent
  } from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
import { configureChains } from 'wagmi';
import { createClient } from 'wagmi';
import { selectedEnvironment } from './environments';

const { chains, provider } = configureChains(
    [selectedEnvironment.chain],
    [
      publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 're:meme',
    chains,
});
  
const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

export { chains }

export default wagmiClient;
