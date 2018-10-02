import createHistory from 'history/createBrowserHistory';

export default createHistory();

//
// Playing with redux
//

const initialState = () => ({
  user: {
    isLoggedIn: false,
    isLoading: false,
    profile: {}, // Must contain email to be valid
  },
});

const reducer = (state = initialState(), action) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case 'LOGIN': {
      newState.user.isLoggedIn = true;
      return newState;
    }
    case 'LOGOUT': {
      newState.user.isLoggedIn = false;
      return newState;
    }
    case 'LOADING_USER_DATA': {
      newState.user.isLoading = true;
      return newState;
    }
    case 'LOADING_PROFILE????': {
      newState.user.profile = action.profile; // ???
      return newState;
    }
    default: {
      return newState;
    }
  }
};
