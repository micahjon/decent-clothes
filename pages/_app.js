import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';

const getInitialUserState = () => ({
  isLoggedIn: false,
  isLoading: false,
  session: {},
  profile: {}, // Must contain email to be valid
});

const userReducer = (state = getInitialUserState(), action) => {
  console.log('got action', action.type);

  switch (action.type) {
    case 'USER_LOGIN': {
      return { ...state, isLoggedIn: true, isLoading: false, session: action.session };
    }
    case 'USER_LOGOUT': {
      return { ...state, isLoggedIn: false, isLoading: false };
    }
    case 'USER_LOADING': {
      return { ...state, isLoading: true };
    }
    case 'USER_PROFILE': {
      return { ...state, isLoading: false, profile: action.profile };
    }
    default: {
      if (!action.type.startsWith('@@')) console.error('Invalid action type', action);
      return state;
    }
  }
};

const reducer = combineReducers({
  user: userReducer,
});

/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
 * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */
const makeStore = (initialState, options) => {
  return createStore(reducer, initialState);
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp); // { debug: true }
