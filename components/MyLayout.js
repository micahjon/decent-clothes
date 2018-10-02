import Head from 'next/head';
import Nav from './Nav';
import { Grommet, Box } from 'grommet';
import './global-styles.scss';
import { hpe } from 'grommet/themes';

const copyright = `© ${new Date().getFullYear()} Decent Clothes`;

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
    <Box align="center" pad="large" style={{ borderTop: '1px solid #f5f5f5', color: '#999' }}>
      {copyright}
    </Box>
  </Grommet>
);

export default Layout;
