import { combineReducers } from 'redux';

const getInitialUserState = () => ({
  isLoggedIn: false,
  isLoading: false,
  session: {},
  profile: {} // Must contain email to be valid
});

const userReducer = (state = getInitialUserState(), action) => {
  console.log('got action', action.type);

  switch (action.type) {
    case 'USER_LOGOUT':
    case 'USER_LOGIN_FAILURE':
    case 'USER_SESSION_FAILURE':
    case 'USER_PROFILE_FAILURE':
      return getInitialUserState();

    case 'USER_LOGIN_REQUEST':
    case 'USER_SESSION_REQUEST':
    case 'USER_PROFILE_REQUEST':
      return { ...state, isLoading: true };

    case 'USER_SESSION_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        session: action.session
      };

    case 'USER_PROFILE_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        profile: action.profile
      };

    default: {
      if (!action.type.startsWith('@@'))
        console.error('Invalid action type', action);
      return state;
    }
  }
};

const rootReducer = combineReducers({
  user: userReducer
});

export default rootReducer;
