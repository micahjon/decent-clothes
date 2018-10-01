import { connect } from 'react-redux';
import { login, logout, initialLoginFlow } from '../services/AuthLite';
import { Box, Menu } from 'grommet';
import { CaretDown } from 'grommet-icons';

const mapStateToProps = ({ user }) => ({ user });

// const mapDispatchToProps = {
//   loginAction,
// };

class AccountNavItem extends React.Component {
  componentDidMount() {
    initialLoginFlow(this.props.user, this.props.dispatch);
  }

  handleLogout() {
    // console.log('logout disabled...');
    logout(this.props.dispatch);
    // this.setState({ isAuthenticated: false });
  }

  render() {
    return (
      <div>
        {this.props.user.isLoading ? (
          <div>Loading....</div>
        ) : this.props.user.isLoggedIn ? (
          <Menu
            items={[
              { label: 'Account', onClick: () => alert('Coming soon!') },
              { label: 'Log out', onClick: this.handleLogout.bind(this) },
            ]}
            dropAlign={{
              right: 'right',
              top: 'bottom',
            }}
          >
            <Box direction="row">
              <figure style={{ backgroundImage: `url(${this.props.user.profile.picture})` }} />
              <CaretDown size="xsmall" style={{ marginLeft: '.25rem', width: '.75rem' }} />
            </Box>
          </Menu>
        ) : (
          <a onClick={login}>Log in</a>
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
