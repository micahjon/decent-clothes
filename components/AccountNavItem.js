import { connect } from 'react-redux';
import Router from 'next/router';
import { Box, Menu } from 'grommet';
import { CaretDown } from 'grommet-icons';

import {
  getInitialUserSession,
  requestUserLogin,
  userLogout,
} from '../services/actions';

const mapStateToProps = ({ user }) => ({ user });

class AccountNavItem extends React.Component {
  componentDidMount() {
    this.props.dispatch(getInitialUserSession());
  }

  handleLogout() {
    this.props.dispatch(userLogout());
  }

  handleLogin() {
    this.props.dispatch(requestUserLogin());
  }

  render() {
    return (
      <div style={{ height: '24px' }}>
        {this.props.user.isLoading ? (
          <div>Loading....</div>
        ) : this.props.user.isLoggedIn ? (
          <Menu
            items={[
              {
                label: 'Take Measurements',
                onClick: () => Router.push('/measurements'),
              },
              { label: 'Place Order', onClick: () => Router.push('/order') },
              { label: 'Log out', onClick: this.handleLogout.bind(this) },
            ]}
            dropAlign={{
              right: 'right',
              top: 'bottom',
            }}
          >
            <Box direction="row">
              <figure
                style={{
                  backgroundImage: `url(${this.props.user.profile.picture})`,
                }}
              />
              <CaretDown
                size="xsmall"
                style={{ marginLeft: '.25rem', width: '.75rem' }}
              />
            </Box>
          </Menu>
        ) : (
          <a onClick={this.handleLogin.bind(this)}>Login</a>
        )}
        <style jsx>{`
          figure {
            border-radius: 50%;
            height: 1.5rem;
            width: 1.5rem;
            background-size: cover;
            margin: 0;
          }
          a {
            text-decoration: none;
            color: currentColor;

            cursor: pointer;
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
      </div>
    );
  }
}

export default connect(mapStateToProps)(AccountNavItem);
