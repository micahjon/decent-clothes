import { column } from '../components/CommonStyles.js';
import Layout from '../components/MyLayout.js';

class OAuthCallback extends React.Component {
  componentDidMount() {
    import(/* webpackChunkName: "auth" */ '../services/Auth').then(({ default: auth }) => {
      auth.handleAuthentication(() => {
        window.location.href = '/';
      });
    });
  }

  render() {
    return (
      <Layout pageTitle="Our Story">
        <article style={column}>
          <p>Logging you in...</p>
        </article>
        <style jsx>{`
          p {
            text-align: center;
            margin: 4rem 0;
          }
        `}</style>
      </Layout>
    );
  }
}

export default OAuthCallback; // withRouter();
