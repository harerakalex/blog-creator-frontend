import jwt from 'jsonwebtoken';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import { login } from '../LoginAction';
import { BACKEND_URL } from '../../../../app/common/config/appConfig';

const loginData = {
  email: 'carlos@gmail.com',
  password: 'User1234',
};
const fakeData = {
  email: 'carlos@gmail.com',
};

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

describe('Login should work', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
    store.clearActions();
  });
  test('Login success tests...', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Welcome, you are successfully logged in',
          data: {
            email: 'carlos@gmail.com',
            username: 'carlosG',
            token: jwt.sign({ id: 1 }, 'secret', { expiresIn: '1d' }),
          },
        },
      });
    });
    return store.dispatch(login(loginData)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });

  test('login testing error', () => {
    const expected = {
      data: {
        error: 'Something wrong',
      },
    };
    moxios.stubRequest(/.*/, {
      response: expected,
    });
    return store.dispatch(login(fakeData)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });

  test('login testing bad request', () => {
    moxios.stubRequest(`${BACKEND_URL}/users/login`, {
      status: 400,
      response: {
        data: {
          error: 'Bad Request',
        },
      },
    });
    return store.dispatch(login(fakeData)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
