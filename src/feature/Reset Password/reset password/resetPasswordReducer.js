import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from './resetPasswordActionTypes';

const initialState = {
  message: '',
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        message: payload,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        message: payload,
      };
    default:
      return state;
  }
}
