// Check whether the current time is past the
// access token's expiry time
const isLoggedIn = () => {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
};

// Clear access token and ID token from local storage
const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
};

// Load Auth0 and then login
const loadAuth0AndLogin = () => {
  import(/* webpackChunkName: "auth" */ '../services/Auth').then(({ default: auth }) => {
    auth.login();
  });
};

export { isLoggedIn, logout, loadAuth0AndLogin };
