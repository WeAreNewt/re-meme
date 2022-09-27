import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content="re:meme - the on-chain meme remixer" />
        <meta property="twitter:title" content="re:meme - the on-chain meme remixer" />
        <meta property="og:description" content="Create memes, remix memes, and give recognition to all meme creators. The on-chain meme source of truth, thanks to the power of the Lens Protocol." />
        <meta property="twitter:description" content="Create memes, remix memes, and give recognition to all meme creators. The on-chain meme source of truth, thanks to the power of the Lens Protocol." />
        <meta name="twitter:site" content="@wearenewt" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
      </Head>
      <body className='home-bg min-h-screen font-mono text-neutral-black'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
