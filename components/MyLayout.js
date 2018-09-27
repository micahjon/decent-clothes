import Head from 'next/head';
import Nav from './Nav';

const style = {
  // margin: '1em auto',
  // width: 'calc(100% - 2rem)',
  // maxWidth: 800,
};

const Layout = props => (
  <div style={style}>
    <Head>
      <title>
        {props.pageTitle ? `${props.pageTitle} | ` : ''}
        Decent Clothes
      </title>
    </Head>
    <Nav />
    {props.children}
  </div>
);

export default Layout;
