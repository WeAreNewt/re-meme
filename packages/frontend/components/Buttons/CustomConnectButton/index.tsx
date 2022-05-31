import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import useWindowDimensions from '../../../hooks/window-dimensions.hook';

type CustomConnectButtonProps = {
  onSuccessfullyConnected: () => void
}

export const CustomConnectButton/* : React.FC<{}> */ = ({ onSuccessfullyConnected }: CustomConnectButtonProps) => {
  const { height, width } = useWindowDimensions();
  const data = useAccount();

  useEffect(() => {
    if (data.data != null) {
      onSuccessfullyConnected();
    }
  }, [])

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {

        const getBtnTextByState = () => {
          if (!mounted || !account || !chain) return "Connect Wallet";
          if (chain.unsupported) return "Wrong Network";
          return account.displayName;
        }

        const getBtnStyles = () => {
          if (!mounted || !account || !chain) return "flex items-center px-2 lg:px-6 py-2 bg-purple border-3 border-black border-solid rounded-full space-x-3 comic-border-mini";
          return "flex items-center px-2 lg:px-6 py-2 bg-white border-3 border-black border-solid rounded-full space-x-3 comic-border-mini";
        }

        const getBtnfuncs = () => {
          if (!mounted || !account || !chain) openConnectModal();
          if (chain?.unsupported) openChainModal();
          else openAccountModal();
        }

        return (
          <button className={getBtnStyles()} onClick={getBtnfuncs} type="button">
            {
              width > 850 ?
                !mounted || !account || !chain || chain.unsupported ?
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8.05103" r="7" fill="#FF0000" stroke="black" strokeWidth="2" />
                  </svg>
                  :
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.50073" cy="8.05103" r="7" fill="#23C146" stroke="black" strokeWidth="2" />
                  </svg>
                : null
            }
            {
              width > 850 ? <span className='font-bold'>{getBtnTextByState()}</span>
                :
                <div className='relative'>
                  <div className='absolute -top-2 left-5'>
                    {
                      !mounted || !account || !chain || chain.unsupported ?
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8.05103" r="7" fill="#FF0000" stroke="black" strokeWidth="2" />
                        </svg>
                        :
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8.50073" cy="8.05103" r="7" fill="#23C146" stroke="black" strokeWidth="2" />
                        </svg>
                    }
                  </div>
                  <Image src="/assets/icons/wallet.svg" className='mt-1' width={width > 850 ? "20" : "24"} height={width > 850 ? "20" : "24"} />
                </div>
            }
          </button>
        );
      }}
    </ConnectButton.Custom>
  )
}