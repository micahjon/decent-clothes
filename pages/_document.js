import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Alegreya:700|Fira+Sans"
            rel="stylesheet"
            type="text/css"
          />
          <meta
            name="google-site-verification"
            content="taWifGRhg1p5PJ6vWZ8JgRQukYdxdTdfLc15zs23nqc"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
