import * as authTypes from './LogoutActionTypes';

export const initialState = {
  message: null,
  error: null,
};

const Logout = (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.LOGOUT_ERROR:
      return {
        ...state,
        error: payload,
      };
    case authTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        payload,
        isAuthenticated: false,
        loggedIn: false,
      };
    default:
      return state;
  }
};
export default Logout;
