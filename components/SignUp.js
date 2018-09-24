import { column } from '../components/CommonStyles.js';

const linkStyle = {};

const SignUp = () => (
  <div className="outer">
    <div className="inner" style={column}>
      <h2>Request an Invite</h2>
      <p>Sign up below, and we'll send you an invite once we start taking orders!</p>
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
