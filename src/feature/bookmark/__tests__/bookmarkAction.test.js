import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import {
  getBookmarks, bookmarking, unbookmark
} from '../bookmarkAction';
import LocalStorage from '../../../__mocks__/localStorage';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

let storage;
const token = 'Invalid token';
describe('Bookmark ActionCreator', () => {
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
  it('should dispatch BOOKMARK_SUCCESS action when given correct inputs', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'Bookmark added successfully'
      });
    });
    const expectedAction = [{ payload: 'Bookmark added successfully', type: 'BOOKMARK_SUCCESS' }];
    return store.dispatch(bookmarking()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch BOOKMARK_FAIL action when given wrong inputs', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'bad request'
      });
    });
    const expectedAction = [{ payload: undefined, type: 'BOOKMARK_FAIL' }];
    return store.dispatch(bookmarking()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});


describe('Unbookmark ActionCreator', () => {
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
  it('should dispatch UNBOOKMARK_SUCCESS action when given correct inputs', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: 'Bookmark deleted successfully'
        }
      });
    });
    const expectedAction = [{ payload: { articleId: undefined, message: undefined }, type: 'UNBOOKMARK_SUCCESS' }];
    return store.dispatch(unbookmark()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch UNBOOKMARK_FAIL action when given inputs are wrong', () => {
    const expected = {
      data: {
        error: 'Bad request',
      },
    };
    moxios.stubRequest(/.*/, {
      status: 400,
      response: expected,
    });
    const expectedAction = [{ payload: undefined, type: 'UNBOOKMARK_FAIL' }];
    return store.dispatch(unbookmark()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch UNBOOKMARK_FAIL action when given there is no network', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        data: {
          message: 'Network Error',
        }
      });
    });
    const expectedAction = [{ payload: 'Network Error', type: 'UNBOOKMARK_FAIL' }];
    return store.dispatch(unbookmark()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('GET BOOKMARKS ActionCreator', () => {
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
  it('should dispatch GET_BOOKMARKS_SUCCESS action when given correct inputs', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });
    const expectedAction = [{ payload: undefined, type: 'GET_BOOKMARKS_SUCCESS' }];
    return store.dispatch(getBookmarks()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch GET_BOOKMARKS_FAIL action when given inputs are wrong', () => {
    const expected = {
      data: {
        error: 'Bad request',
      },
    };
    moxios.stubRequest(/.*/, {
      status: 400,
      response: expected,
    });
    const expectedAction = [{ payload: undefined, type: 'GET_BOOKMARKS_FAIL' }];
    return store.dispatch(getBookmarks()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
