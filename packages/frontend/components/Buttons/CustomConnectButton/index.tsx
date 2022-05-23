import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

type CustomConnectButtonProps = {
  onSuccessfullyConnected: () => void
}

export const CustomConnectButton/* : React.FC<{}> */ = ({ onSuccessfullyConnected }: CustomConnectButtonProps) => {
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
        return (
          <>
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <div>
                    <button className="flex items-center px-6 py-2 bg-purple border-4 border-black border-solid rounded-full space-x-3 comic-border-mini" onClick={openConnectModal} type="button">
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8.05103" r="7" fill="#FF0000" stroke="black" strokeWidth="2" />
                      </svg>
                      <span className='font-bold'>Connect Wallet</span>
                    </button>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <button className="flex items-center px-6 py-2 bg-purple border-4 border-black border-solid rounded-full space-x-3 comic-border-mini" onClick={openChainModal} type="button">
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8.05103" r="7" fill="#FF0000" stroke="black" strokeWidth="2" />
                    </svg>
                    <span className='font-bold'>Wrong Network</span>
                  </button>
                );
              }

              return (
                <button className="flex items-center px-6 py-2 bg-white border-4 border-black border-solid rounded-full space-x-3 comic-border-mini" onClick={openAccountModal} type="button">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.50073" cy="8.05103" r="7" fill="#23C146" stroke="black" strokeWidth="2" />
                  </svg>
                  <span className='font-bold tracking-wide'>{account.displayName}</span>
                </button>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  )
}