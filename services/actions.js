const userLogin = session => ({
  type: 'USER_LOGIN',
  session,
});

const userLoading = {
  type: 'USER_LOADING',
};

const userLogout = {
  type: 'USER_LOGOUT',
};

const userProfile = profile => ({
  type: 'USER_PROFILE',
  profile,
});

// const loginAction = () => ({
//   type: 'USER_LOGIN',
// });
//
// const loginAction = () => ({
//   type: 'USER_LOGIN',
// });

export { userLogin, userLoading, userLogout, userProfile };
