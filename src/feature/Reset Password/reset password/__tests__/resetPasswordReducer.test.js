/* eslint-disable import/named */
import resetPasswordReducers, { initialState } from '../resetPasswordReducer';
import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from '../resetPasswordActionTypes';

describe('forgot password reducer', () => {
  test('EMAIL_SENT_SUCCESSFULLY', () => {
    const reducer = resetPasswordReducers(initialState, {
      type: RESET_PASSWORD_SUCCESS,
      message: { payload: { sendEmail: 'raymond@gmail.com' } }
    });
    expect(reducer).toHaveProperty('message');
  });
  test('EMAIL_FAILED_TO_BE_SENT', () => {
    const reducer = resetPasswordReducers(initialState, {
      type: RESET_PASSWORD_FAIL,
      message: { payload: { sendEmail: 'raymondsdf' } }
    });
    expect(reducer).toHaveProperty('message');
  });
});
