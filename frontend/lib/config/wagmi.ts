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
/*
const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{' '}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and
    acknowledge you have read and understand the protocol{' '}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);
*/
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
