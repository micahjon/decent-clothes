import Link from 'next/link';
import { Header, Box } from 'grommet';
import AccountNavItem from './AccountNavItem.js';

const Nav = () => (
  <header>
    <Box direction="row" pad="medium">
      {/* <Header /> */}
      <Link href="/">
        <a style={{ marginRight: 'auto', textTransform: 'uppercase' }}>Decent Clothes</a>
      </Link>
      {/* <Link href="/shop"> */}
      {/*   <a style={{ border: '1px solid', padding: '0 4px', borderRadius: '3px' }}>Shop</a> */}
      {/* </Link> */}
      <Link href="/about">
        <a>About</a>
      </Link>
      <AccountNavItem />
    </Box>
    <style jsx>{`
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
