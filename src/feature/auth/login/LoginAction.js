import axios from 'axios';
import jwt from 'jwt-decode';
import { toast } from 'react-toastify';
import * as userActionTypes from './LoginActionTypes';
import { BACKEND_URL } from '../../../app/common/config/appConfig';

export const loginSuccess = (token, user, message) => ({
  type: userActionTypes.LOGIN_SUCCESS,
  payload: { token, user, message },
});
export const loginError = (error) => ({
  type: userActionTypes.LOGIN_ERROR,
  payload: error,
});

export const login = (email, password) => async (dispatch) => {
  const loginData = {
    email,
    password,
  };
  try {
    const send = await axios.post(`${BACKEND_URL}/users/login`, loginData);
    const { data } = send;
    const { token } = data.data;
    const user = jwt(token);
    localStorage.setItem('token', token);
    localStorage.setItem('username', user.username);
    const { message } = data;
    toast.success(message, { position: toast.POSITION.TOP_CENTER });
    dispatch(loginSuccess(token, user, message));
  } catch (error) {
    const message = (await error.response) ? error.response.data.error : 'Something wrong';
    toast.error(message, { position: toast.POSITION.TOP_CENTER });
    dispatch(loginError(message));
  }
};
