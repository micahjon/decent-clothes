import { column } from '../components/CommonStyles.js';
import Link from 'next/link';
import './global-styles.scss';

const linkStyle = {};

const Header = () => (
  <header>
    <div style={column}>
      <Link href="/">
        <a style={{ marginRight: 'auto', textTransform: 'uppercase' }}>Decent Clothes</a>
      </Link>
      <Link href="/shop">
        <a style={{ border: '1px solid', padding: '0 4px', borderRadius: '3px' }}>Shop</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/login">
        <a>Sign in</a>
      </Link>
    </div>
    <style jsx>{`
      header {
        // background: white;
        padding: 1rem 0;
      }
      div {
        display: flex;
        color: #987a4c;
      }
      a {
        text-decoration: none;
        color: currentColor;
        font-size: 14px;
      }
      a:not(:last-child) {
        margin-right: 1rem;
      }
      svg {
        display: inline-block;
        width: 16px;
        height: 16px;
        stroke-width: 0;
        stroke: currentColor;
        fill: currentColor;
      }
    `}</style>
  </header>
);

export default Header;
