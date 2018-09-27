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

export { isLoggedIn, logout };
