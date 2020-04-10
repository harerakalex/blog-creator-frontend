import { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL } from './forgotPasswordActionTypes';

const initialState = {
  message: '',
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        message: payload,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        message: payload,
      };
    default:
      return state;
  }
}
