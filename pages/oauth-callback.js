import { withRouter } from 'next/router';

class OAuthCallback extends React.Component {
  componentDidMount() {
    import(/* webpackChunkName: "auth" */ '../services/Auth').then(({ default: auth }) => {
      auth.handleAuthentication(() => {
        console.log('post auth callback....');
        const { router } = this.props;

        /**
         * todo -> get router working
         */
        window.location.href = '/';
      });
    });
  }

  render() {
    return <div>Logging you in...</div>;
  }
}

export default withRouter(OAuthCallback);
