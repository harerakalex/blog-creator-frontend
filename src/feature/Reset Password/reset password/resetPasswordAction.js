import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../app/common/config/appConfig';
import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from './resetPasswordActionTypes';

const resetPasswordAction = (password, confirmPassword, token, props) => async (dispatch) => {
  const payload = {
    password,
    confirmPassword,
  };
  try {
    const res = await axios.post(
      `${BACKEND_URL}/users/reset-password/${token}`,
      payload,
    );
    const { message } = res.data;
    toast.success(message, { position: toast.POSITION.TOP_CENTER });
    setTimeout(() => {
      props.history.push('/Login');
    }, 1000);

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const erroMessage = (await error.response) ? error.response.data.error : 'Something went wrong';
    toast.error(erroMessage, { position: toast.POSITION.TOP_CENTER });
    dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response });
  }
};

export default resetPasswordAction;
