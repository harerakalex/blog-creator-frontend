import axios from 'axios';
import { toast } from 'react-toastify';
import { REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from './SignUpConstants';
import { BACKEND_URL } from '../../../app/common/config/appConfig';

const registerUser = user => async dispatch => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword
    } = user;
    const response = await axios.post(`${BACKEND_URL}/users/signup`, {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword
    });
    dispatch({
      type: REGISTER_USER_SUCCESS,
      user,
      response
    });
    toast.success(response.data.message, {
      position: toast.POSITION.TOP_CENTER
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_ERROR,
      error
    });
    toast.error(error.response.data.error, {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export default registerUser;
