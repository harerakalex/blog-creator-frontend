import social from '../SocialReducer';
import * as actionTypes from '../SocialActionTypes';

describe('Test social reducer', () => {
  it('Should test the Social login LOGIN_SUCCESS', () => {
    const action = {
      type: actionTypes.LOGIN_SUCCESS,
      user: {},
    };
    const reducer = social({}, action);
    expect(reducer.success).toBeTruthy();
  });
  it('Should test the Social login LOGIN_FAIL', () => {
    const action = {
      type: actionTypes.LOGIN_FAIL,
      user: {},
    };
    const reducer = social({}, action);
    expect(reducer).toHaveProperty('error');
  });
});
