import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import { starRating } from '../StarRatingAction';
import LocalStorage from '../../../../__mocks__/localStorage';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

let storage;
const token = 'Invalid token';
describe('Star Rating Test', () => {
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
  test('Star Rating  testing Something wrong', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {
            message: 'Successfully rated this article'
          }
        }
      });
    });
    return store.dispatch(starRating()).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('Star rating testing error', () => {
    const expected = {
      data: {
        error: 'Bad request',
      },
    };
    moxios.stubRequest(/.*/, {
      status: 400,
      response: expected,
    });
    return store.dispatch(starRating()).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('Star rating testing error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        data: {
          message: 'Something wrong',
        }
      });
    });
    return store.dispatch(starRating()).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
