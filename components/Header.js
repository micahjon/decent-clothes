import Link from 'next/link';
import './global-styles.scss';

const linkStyle = {};

const Header = () => (
  <div>
    <Link href="/">
      <a style={{ marginRight: 'auto' }}>Decent Clothes</a>
    </Link>
    <Link href="/about">
      <a>About</a>
    </Link>
    <Link href="/contact">
      <a>Contact</a>
    </Link>
    <style jsx>{`
      div {
        display: flex;
      }
      a {
        text-decoration: none;
        color: #987a4c;
        text-transform: uppercase;
        font-size: 14px;
      }
      a:not(:last-child) {
        margin-right: 1rem;
      }
    `}</style>
  </div>
);

export default Header;
