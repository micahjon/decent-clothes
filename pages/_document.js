import Document, { Head, Main, NextScript } from 'next/document';
// import { extractCritical } from 'emotion-server';

export default class MyDocument extends Document {
  // static getInitialProps({ renderPage }) {
  //   const page = renderPage();
  //   const styles = extractCritical(page.html);
  //   return { ...page, ...styles };
  // }

  // constructor(props) {
  //   super(props);
  //   const { __NEXT_DATA__, ids } = props;
  //   if (ids) {
  //     __NEXT_DATA__.ids = ids;
  //   }
  // }

  // <style dangerouslySetInnerHTML={{ __html: this.props.css }} />

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400|Alegreya:700"
            rel="stylesheet"
            type="text/css"
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
