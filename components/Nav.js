import Link from 'next/link';
import { Header, Box } from 'grommet';
import AccountNavItem from './AccountNavItem.js';
import ReactSVG from 'react-svg';

const Nav = () => (
  <header>
    <Box direction="row" pad="medium" align="center">
      {/* <Header /> */}
      <Link href="/">
        <a style={{ marginRight: 'auto' }}>
          <ReactSVG
            src="/static/stacked-logo-1.svg"
            svgStyle={{ height: '2rem', fill: 'currentColor' }}
          />
        </a>
      </Link>
      {/* <Link href="/shop"> */}
      {/*   <a style={{ border: '1px solid', padding: '0 4px', borderRadius: '3px' }}>Shop</a> */}
      {/* </Link> */}
      <Link href="/about">
        <a>About</a>
      </Link>
      {/* <Link href="/order"> */}
      {/*   <a>Place Order</a> */}
      {/* </Link> */}
      <AccountNavItem />
    </Box>
    <style jsx>{`
      header {
        border-bottom: 1px solid #f5f5f5;
      }
      a {
        text-decoration: none;
        color: currentColor;
        cursor: pointer;
      }
      a:not(:last-child) {
        margin-right: 1rem;
      }
    `}</style>
  </header>
);

export default Nav;
