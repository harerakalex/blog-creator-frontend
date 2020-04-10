import * as actionTypes from '../LoginActionTypes';
import loginReducer, { initialState } from '../LoginReducer';

describe('Auth reducer', () => {
  test('LOGIN_SUCCESS', () => {
    const reducer = loginReducer(initialState, {
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        message: 'Welcome, you are successfully logged in',
        isAuthenticated: true,
      },
    });

    expect(reducer.isAuthenticated).toBeTruthy();
    expect(reducer.isLogging).toBeFalsy();
    expect(reducer.message).toEqual('Welcome, you are successfully logged in');
  });
  test('LOGIN_ERROR', () => {
    const reducer = loginReducer(initialState, {
      type: actionTypes.LOGIN_ERROR,
      payload: 'Bad request!',
    });

    expect(reducer.error).toEqual('Bad request!');
  });
  test('NO_ACTION', () => {
    const reducer = loginReducer(initialState, {
      type: '@@INIT',
      payload: {
        isAuthenticated: false,
        message: null,
        error: null,
      },
    });

    expect(reducer.error).toEqual(null);
    expect(reducer.isAuthenticated).toBeFalsy();
    expect(reducer.message).toEqual(null);
  });
});
