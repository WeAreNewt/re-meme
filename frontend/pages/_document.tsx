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
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <body className='home-bg min-h-screen'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
