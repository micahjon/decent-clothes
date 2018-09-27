import { column } from '../components/CommonStyles.js';
import { isLoggedIn, logout, loadAuth0AndLogin } from '../services/AuthLite';

const linkStyle = {};

const SignUp = () => (
  <div className="outer">
    <div className="inner" style={column}>
      <h2>Request an Invite</h2>
      <p>Sign up below, and we'll send you an invite once we start taking orders!</p>
      <button onClick={loadAuth0AndLogin}>Get Invited</button>
    </div>
    <style jsx>{`
      .outer {
        // padding: 1rem 0;
      }
      .inner {
      }
      h2,
      p {
        text-align: center;
      }
    `}</style>
  </div>
);

export default SignUp;
