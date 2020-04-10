import * as authTypes from './LoginActionTypes';
import checkAuthUser from './CheckAuthUser';

const user = checkAuthUser();

export const initialState = {
  message: null,
  error: null,
  ...user,
};

const Login = (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.LOGIN_ERROR:
      return {
        ...state,
        error: payload,
      };
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loggedIn: true,
      };
    default:
      return state;
  }
};
export default Login;
