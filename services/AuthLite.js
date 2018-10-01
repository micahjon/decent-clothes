import * as actions from './actions';

// Load Auth0 client library and initialize auth object
const loadAuth = callback => {
  import(/* webpackChunkName: "auth" */ '../services/Auth').then(({ default: auth }) => {
    callback(auth.webAuth);
  });
};

const getAccessToken = () => localStorage.getItem('access_token');

const getStoredProfile = () => JSON.parse(localStorage.getItem('user_profile'));
const storeProfile = profile => localStorage.setItem('user_profile', JSON.stringify(profile));

const removeHash = () => {
  history.pushState('', document.title, window.location.pathname + window.location.search);
};

const getSessionData = () => ({
  accessToken: localStorage.getItem('access_token'),
  idToken: localStorage.getItem('id_token'),
  expiresAt: localStorage.getItem('expires_at'),
});

// Check whether the current time is past the
// access token's expiry time
const isLoggedIn = () => {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt && getAccessToken();
};

// Clear access token and ID token from local storage
const logout = dispatch => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('user_profile');
  dispatch(actions.userLogout);
};

const initialLoginFlow = (user, dispatch) => {
  handleLoginCallback(dispatch)
    .then(() => {
      if (isLoggedIn()) {
        dispatch({
          type: 'USER_LOGIN',
          session: getSessionData(),
        });
        return getUserProfile(dispatch).then(profile => {
          dispatch({
            type: 'USER_PROFILE',
            profile,
          });
        });
      }
    })
    .catch(error => {
      console.log('Authentication error:', error);
      dispatch(actions.userLogout);
    });
};

// Process oAuth callback and store info related to login in LocalStorage
const handleLoginCallback = dispatch => {
  return new Promise((resolve, reject) => {
    const hash = window.location.hash;
    if (!hash.includes('access_token=')) return resolve();

    dispatch(actions.userLoading);

    loadAuth(auth => {
      auth.parseHash((error, authResult) => {
        removeHash();

        if (authResult && authResult.accessToken && authResult.idToken) {
          // Set the time that the access token will expire at
          let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
          localStorage.setItem('access_token', authResult.accessToken);
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('expires_at', expiresAt);
          return resolve();
        }

        console.error(error || 'Invalid authResult', { authResult, hash });
        reject(error || new Error('Invalid authResult'));
      });
    });
  });
};

// Get user data
const getUserProfile = dispatch => {
  return new Promise((resolve, reject) => {
    if (!isLoggedIn()) return reject(new Error('Not logged in'));

    const storedProfile = getStoredProfile();
    if (storedProfile && storedProfile.email) {
      return resolve(storedProfile);
    }

    dispatch(actions.userLoading);

    const accessToken = getAccessToken();
    loadAuth(auth => {
      auth.client.userInfo(accessToken, (error, profile) => {
        if (error || !profile) {
          console.error(error || 'Invalid profile', { accessToken, profile });
          return reject(error || new Error('Invalid profile'));
        }

        resolve(profile);
        storeProfile(profile);
      });
    });
  });
};

// Redirect user to Auth0 login page
const login = () => {
  loadAuth(auth => auth.authorize());
};

export { isLoggedIn, login, logout, handleLoginCallback, getUserProfile, initialLoginFlow };
