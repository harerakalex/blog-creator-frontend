import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../app/common/config/appConfig';
import { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL } from './forgotPasswordActionTypes';

const forgotPasswordAction = (email) => async (dispatch) => {
  const userMessage = {
    email,
  };
  try {
    const res = await axios.post(
      `${BACKEND_URL}/users/send-email`,
      userMessage,
    );
    const { message } = res.data;
    toast.success(message, { position: toast.POSITION.TOP_CENTER });
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: res.data,

    });
  } catch (error) {
    const erroMessage = (await error.response) ? error.response.data.error : 'Network Error';
    toast.error(erroMessage, { position: toast.POSITION.TOP_CENTER });
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: erroMessage });
  }
};

export default forgotPasswordAction;
