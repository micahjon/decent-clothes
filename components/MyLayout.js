import Head from 'next/head';
import Nav from './Nav';
import { Grommet } from 'grommet';
import './global-styles.scss';
import { hpe } from 'grommet/themes';

const style = {
  // margin: '1em auto',
  // width: 'calc(100% - 2rem)',
  // maxWidth: 800,
};

const Layout = props => (
  <Grommet theme={hpe}>
    <Head>
      <title>
        {props.pageTitle ? `${props.pageTitle} | ` : ''}
        Decent Clothes
      </title>
    </Head>
    <Nav {...props} />
    {props.children}
  </Grommet>
);

export default Layout;
