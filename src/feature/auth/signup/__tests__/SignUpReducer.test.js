import SignUpReducer from '../SignUpReducer';
import { REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from '../SignUpConstants';

const initState = {
  users: [{ firstname: 'Placide' }]
};

const user = { firstname: 'Placide' };

const actionSuccess = {
  type: REGISTER_USER_SUCCESS,
  user
};

const actionFailure = {
  type: REGISTER_USER_ERROR
};

describe('SignUp Reducer Tests', () => {
  it('should return an empty state', () => {
    const defaultState = SignUpReducer(undefined, {});
    expect(defaultState).toEqual({ users: [] });
  });
  it('should not update the state', () => {
    const newState = SignUpReducer(initState, actionFailure);
    expect(newState).toEqual(initState);
  });
  it('should return a new state', () => {
    const newState = SignUpReducer(initState, actionSuccess);
    expect(newState.users.firstname).toEqual('Placide');
  });
});
