import { column } from '../components/CommonStyles.js';
import Link from 'next/link';
import './global-styles.scss';
import dynamic from 'next/dynamic';

const linkStyle = {};

const isAuthenticated = () => {
  // Check whether the current time is past the
  // access token's expiry time
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
};

class Header extends React.Component {
  constructor() {
    super();
    // Don't call this.setState() here!
    this.state = { isAuthenticated: false };
  }

  componentDidMount() {
    this.setState({ isAuthenticated: isAuthenticated() });
  }

  login() {
    import(/* webpackChunkName: "auth" */ '../services/Auth').then(({ default: auth }) => {
      auth.login();
    });
  }

  logout() {
    import(/* webpackChunkName: "auth" */ '../services/Auth').then(({ default: auth }) => {
      auth.logout();
      this.setState({ isAuthenticated: false });
    });
  }

  render() {
    return (
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
          {this.state.isAuthenticated ? (
            <a onClick={this.logout.bind(this)}>Log out</a>
          ) : (
            <a onClick={this.login.bind(this)}>Log in</a>
          )}
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
  }
}

export default Header;
