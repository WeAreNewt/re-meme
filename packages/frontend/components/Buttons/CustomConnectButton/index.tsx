import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import useWindowDimensions from '../../../hooks/window-dimensions.hook';


export const CustomConnectButton : React.FC = () => {
  const { width } = useWindowDimensions();

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
          if (!mounted || !account || !chain) return "icon-btn-connect-wallet lg:btn-connect-wallet";
          return "icon-btn lg:btn-wallet-connected";
        }

        const getBtnfuncs = () => {
          if (!mounted || !account || !chain) openConnectModal();
          if (chain?.unsupported) openChainModal();
          else openAccountModal();
        }

        return (
          <button className={getBtnStyles()} onClick={getBtnfuncs} type="button">
            <div className="hidden lg:block">
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
            <span className="hidden lg:block">{getBtnTextByState()}</span>
            <div className='relative lg:hidden'>
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
              <img src="/assets/icons/wallet.svg" className='icon lg:w-[20px] lg:h-[20px]' />
            </div>
          </button>
        );
      }}
    </ConnectButton.Custom>
  )
}