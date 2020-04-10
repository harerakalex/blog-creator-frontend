import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import { logout } from '../LogoutAction';
import { BACKEND_URL } from '../../../../app/common/config/appConfig';
import LocalStorage from '../../../../__mocks__/localStorage';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

let storage;
const token = 'Invalid token';
describe('Logout Test', () => {
  beforeEach(() => {
    moxios.install(axios);
    storage = window.localStorage.setItem('token', token);
    window.localStorage = new LocalStorage();
  });
  afterEach(() => {
    moxios.uninstall(axios);
    store.clearActions();
    window.localStorage = storage;
  });
  test('Logout testing Something wrong', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        data: {
          message: 'Something wrong.',
        },
      });
    });
    return store.dispatch(logout()).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('Logout success tests...', () => {
    moxios.stubRequest(`${BACKEND_URL}/users/logout`, {
      status: 200,
      response: {
        data: {
          message: 'Successfully logged out.',
        },
      },
    });
    return store.dispatch(logout()).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('logout testing bad request', () => {
    moxios.stubRequest(`${BACKEND_URL}/users/logout`, {
      status: 400,
      response: {
        data: {
          error: 'Bad Request',
        },
      },
    });
    return store.dispatch(logout(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
