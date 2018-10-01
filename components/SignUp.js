import { login } from '../services/AuthLite';
import { Box, Button, Heading, Paragraph } from 'grommet';

const linkStyle = {};

class SignUp extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="outer">
        <Box align="center" pad="large">
          <Heading level={2} style={{ marginBottom: 0 }}>
            Request an Invite
          </Heading>
          <Paragraph>
            Sign up below and we'll send you an invitation as soon as we start taking&nbsp;orders!
          </Paragraph>
          <Button primary plain={false} onClick={login}>
            Request Invite
            <span> »</span>
          </Button>
        </Box>
        <style jsx>{`
          * {
            text-align: center;
          }
          span {
            line-height: 0;
            font-size: 1.25em;
          }
        `}</style>
      </div>
    );
  }
}

export default SignUp;
