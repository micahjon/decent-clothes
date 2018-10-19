// Load Auth0 client library and initialize auth object
const loadAuth = () =>
  import(/* webpackChunkName: "auth" */ '../services/Auth').then(
    ({ default: auth }) => auth.webAuth
  );

const removeHash = () => {
  history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search
  );
};

//--

const sessionKey = 'user_session';

const getLocalSession = () => {
  return JSON.parse(localStorage.getItem(sessionKey));
};

const setLocalSession = session => {
  localStorage.setItem(sessionKey, JSON.stringify(session));
};

const clearLocalSession = () => {
  localStorage.removeItem(sessionKey);
};

const isValidSession = session => {
  return session && session.accessToken && Date.now() < session.expiresAt;
};

//--

const profileKey = 'user_profile';

const getLocalProfile = () => {
  return JSON.parse(localStorage.getItem(profileKey));
};

const setLocalProfile = session => {
  localStorage.setItem(profileKey, JSON.stringify(session));
};

const clearLocalProfile = () => {
  localStorage.removeItem(profileKey);
};

// const isLoggedIn = () => {
//   const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
// };

export {
  // isLoggedIn,
  removeHash,
  loadAuth,
  getLocalSession,
  clearLocalSession,
  setLocalSession,
  isValidSession,
  getLocalProfile,
  clearLocalProfile,
  setLocalProfile,
};
