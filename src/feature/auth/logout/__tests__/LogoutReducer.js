import * as actionTypes from '../LogoutActionTypes';
import logoutReducer, { initialState } from '../LogoutReducer';

describe('Logout reducer', () => {
  test('LOGOUT_SUCCESS', () => {
    const reducer = logoutReducer(initialState, {
      type: actionTypes.LOGOUT_SUCCESS,
      payload: {
        message: 'Successfully logged out.',
        isAuthenticated: false,
      },
    });

    expect(reducer.isAuthenticated).toBeFalsy();
    expect(reducer.message).toEqual(null);
  });
  test('LOGIN_ERROR', () => {
    const reducer = logoutReducer(initialState, {
      type: actionTypes.LOGOUT_ERROR,
      payload: 'Bad request!',
    });

    expect(reducer.error).toEqual('Bad request!');
  });
});
