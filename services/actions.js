import {
  loadAuth,
  removeHash,
  getLocalSession,
  setLocalSession,
  clearLocalSession,
  isValidSession,
  getLocalProfile,
  setLocalProfile,
  clearLocalProfile
} from './AuthLite';

import { log, logError } from './logging';

//--

const userLoginRequest = () => {
  clearLocalSession();
  clearLocalProfile();
  return { type: 'USER_LOGIN_REQUEST' };
};

const userLoginFailure = () => {
  return { type: 'USER_LOGIN_FAILURE' };
};

const userLogout = () => {
  clearLocalSession();
  clearLocalProfile();
  return { type: 'USER_LOGOUT' };
};

const requestUserLogin = () => {
  return dispatch => {
    dispatch(userLoginRequest());
    return new Promise(resolve => {
      loadAuth()
        .then(auth => auth.authorize())
        .catch(error => {
          logError('Unable to load Auth and use auth.authorize', error);
        })
        .then(resolve);
    });
  };
};

//--

const userSessionRequest = () => ({
  type: 'USER_SESSION_REQUEST'
});

const userSessionSuccess = (session, storeLocally = true) => {
  if (storeLocally) {
    setLocalSession(session);
  }
  return {
    type: 'USER_SESSION_SUCCESS',
    session
  };
};

const userSessionFailure = () => {
  clearLocalSession();
  return {
    type: 'USER_SESSION_FAILURE'
  };
};

//--

const userProfileRequest = () => ({
  type: 'USER_PROFILE_REQUEST'
});

const userProfileSuccess = (profile, storeLocally = true) => {
  if (storeLocally) {
    setLocalProfile(profile);
  }
  return {
    type: 'USER_PROFILE_SUCCESS',
    profile
  };
};

const userProfileFailure = () => {
  clearLocalProfile();
  return {
    type: 'USER_PROFILE_FAILURE'
  };
};

//--

function getInitialUserSession() {
  return function(dispatch) {
    return new Promise(resolve => {
      // Hash w/ access_token means user was just redirected from Auth0 after logging in
      const hash = window.location.hash;

      if (!hash.includes('access_token=')) {
        // Attempt to get prior session from LocalStorage
        const localSession = getLocalSession();
        if (!isValidSession(localSession)) {
          dispatch(userSessionFailure());
          return resolve();
        }

        log('found valid session in localstorage');
        dispatch(userSessionSuccess(localSession, false));

        // Attempt to get prior profile from LocalStorage
        const localProfile = getLocalProfile();
        if (!localProfile) {
          dispatch(userProfileFailure());
          return resolve({ session: localSession });
        }

        log('found profile in localstorage');
        dispatch(userProfileSuccess(localProfile, false));

        return resolve({ session: localSession, profile: localProfile });
      }

      // Request user session using access token
      dispatch(userSessionRequest());

      log('requesting session from Auth0 using access token');

      loadAuth()
        .then(auth => {
          auth.parseHash((error, authResult) => {
            removeHash();

            if (authResult && authResult.accessToken && authResult.idToken) {
              const session = {
                expiresAt: JSON.stringify(
                  authResult.expiresIn * 1000 + new Date().getTime()
                ),
                accessToken: authResult.accessToken,
                idToken: authResult.idToken
              };

              log('got Auth0 session');

              dispatch(userSessionSuccess(session));
              return resolve({ session });
            }

            dispatch(userSessionFailure());

            logError(error || 'Invalid authResult', { authResult, hash });
            resolve();
          });
        })
        .catch(error => {
          logError('Unable to load Auth and use auth.parseHash', error);
          resolve();
        });
    }).then(({ session, profile } = {}) => {
      // Valid session could not be fetched from access token or LocalStorage
      if (!session) return;

      // Profile already fetched
      if (profile) return;

      // Use access token to get user profile
      return fetchUserProfile(session.accessToken);
    });

    function fetchUserProfile(accessToken) {
      dispatch(userProfileRequest());
      return new Promise(resolve => {
        loadAuth()
          .then(auth => {
            auth.client.userInfo(accessToken, (error, profile) => {
              if (error || !profile) {
                logError('Unable to get profile from Auth0', {
                  error,
                  profile,
                  accessToken
                });
                dispatch(userProfileFailure());
                // Ensure that this access token isn't used again if the user refreshes?
                clearLocalSession();
              } else {
                dispatch(userProfileSuccess(profile));
              }
              return resolve();
            });
          })
          .catch(error => {
            logError('Unable to load Auth and use auth.client.userInfo', error);
            resolve();
          });
      });
    }
  };
}

export { getInitialUserSession, requestUserLogin, userLogout };
