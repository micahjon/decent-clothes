import { connect } from 'react-redux';
import { Box, Button, Heading, Paragraph } from 'grommet';
import { requestUserLogin } from '../services/actions';

class SignUp extends React.Component {
  componentDidMount() {}

  handleLogin() {
    this.props.dispatch(requestUserLogin());
  }

  render() {
    return (
      <Box align="center" pad="large">
        <Heading level={2} style={{ marginBottom: 0 }}>
          Request an Invite
        </Heading>
        <Paragraph>
          Sign up below and we'll send you an invitation as soon as we start
          taking&nbsp;orders!
        </Paragraph>
        <Button primary plain={false} onClick={this.handleLogin.bind(this)}>
          Request Invite
          <span> »</span>
        </Button>
        <style jsx>{`
          * {
            text-align: center;
          }
          span {
            line-height: 0;
            font-size: 1.25em;
          }
        `}</style>
      </Box>
    );
  }
}

export default connect()(SignUp);
