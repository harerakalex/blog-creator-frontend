/* eslint-disable import/named */
import forgotPasswordReducers, { initialState } from '../forgotPasswordReducers';
import { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL } from '../forgotPasswordActionTypes';

describe('forgot password reducer', () => {
  test('EMAIL_SENT_SUCCESSFULLY', () => {
    const reducer = forgotPasswordReducers(initialState, {
      type: FORGOT_PASSWORD_SUCCESS,
      message: { payload: { sendEmail: 'raymond@gmail.com' } }
    });
    expect(reducer).toHaveProperty('message');
  });
  test('EMAIL_FAILED_TO_BE_SENT', () => {
    const reducer = forgotPasswordReducers(initialState, {
      type: FORGOT_PASSWORD_FAIL,
      message: { payload: { sendEmail: 'raymondsdf' } }
    });
    expect(reducer).toHaveProperty('message');
  });
});
