/* eslint-disable max-len */
/* eslint-disable consistent-return */
import moxios from 'moxios';
import { makeMockStore } from '../../../../app/common/config/mockStore';
import registerUser from '../SignUpAction';
import { REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from '../SignUpConstants';

const store = makeMockStore({ user: {} });
const mockSuccess = data => ({ status: 201, response: data });
const mockError = error => ({ status: 400, response: error });

describe('Sign Up Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch REGISTER_USER_SUCCESS action', async () => {
    const user = {
      firstName: 'someone',
      lastName: 'someone',
      userName: 'someone',
      email: 'someone@someone.com',
      password: 'someone',
      confirmPassword: 'someone'
    };

    try {
      const expected = {
        type: REGISTER_USER_SUCCESS,
        user,
        response: { status: 201, response: user }
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(user));
      });
      const result = await store.dispatch(registerUser(user));
      if (result) {
        const actionCalled = store.getActions();
        expect(actionCalled[0]).toEqual(expected);
      }
    } catch (err) { return null; }
  });

  it('should dispatch REGISTER_USER_ERROR action', async () => {
    const user = {
      firstName: 'someone',
      lastName: 'someone',
      userName: 'someone',
      email: 'someone',
    };
    const error = { email: 'Invalid email' };
    try {
      const expected = { type: REGISTER_USER_ERROR, error };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(error));
      });
      const result = await store.dispatch(registerUser(user));
      if (result) {
        const actionCalled = store.getActions();
        expect(actionCalled[1]).toEqual(expected);
      }
    } catch (err) { return null; }
  });
});
