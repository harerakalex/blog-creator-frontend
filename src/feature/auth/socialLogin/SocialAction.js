import jwtDecode from 'jwt-decode';
import * as actionTypes from './SocialActionTypes';

export const authSuccess = (user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  user
});

export const authFail = (error) => ({
  type: actionTypes.LOGIN_FAIL,
  error,
});

export const authUser = (token) => async (dispatch) => {
  try {
    const user = jwtDecode(token);
    const { username } = user;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    dispatch(authSuccess(user));
  } catch (err) {
    dispatch(authFail(err));
  }
};

export
const social = (source) => async (dispatch) => {
  try {
    window.location.replace(source);
  } catch (er) {
    dispatch(authFail(er));
  }
};
