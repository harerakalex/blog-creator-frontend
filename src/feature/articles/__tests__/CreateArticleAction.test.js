import axios from 'axios';
import moxios from 'moxios';
import appMockStore from '../../../__mocks__/mockStoreConfig';
import createArticle from '../createArticle/createArticleAction';
import { CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_FAIL } from '../constants';
import LocalStorage from '../../../__mocks__/localStorage';

const store = appMockStore({});

let storage;
const token = 'Invalid token';

describe('Create Article success', () => {
  beforeEach(() => {
    moxios.install(axios);
    storage = window.localStorage.setItem('token', token);
    window.localStorage = new LocalStorage();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  test('Should return CREATE_ARTICLE_SUCCESS action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201
      });
    });
    const mockArticles = {
      title: 'So I the last one standing',
      description: 'I knew that would happen soon but i kept it inside',
      body: 'I knew that would happen soon but i kept it inside'
    };

    const expectedAction = [CREATE_ARTICLE_SUCCESS];
    return store.dispatch(createArticle(mockArticles)).then(() => {
      const dispatchedActions = store.getActions();

      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expectedAction);
    });
  });

  test('login testing error', () => {
    const expected = {
      status: 400,
      error: 'SERVER ERROR!  Please contact the administartor'
    };
    moxios.stubRequest(/.*/, {
      response: expected
    });
    const mockArticles = {
      description: 'I knew that would happen soon but i kept it inside',
      body: 'I knew that would happen soon but i kept it inside'
    };
    return store.dispatch(createArticle(mockArticles)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});

describe('Create article fail', () => {
  beforeEach(() => {
    moxios.install(axios);
    storage = window.localStorage.setItem('token', token);
    window.localStorage = new LocalStorage();
  });
  afterEach(() => {
    moxios.uninstall(axios);
    store.clearActions();
  });

  test('Should return CREATE_ARTICLE_FAIL action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          error: 'Bad request'
        }
      });
    });
    const mockArticles = {
      title: 'So I the last one standing',
      description: 'I knew that would happen soon but i kept it inside',
      body: 'I knew that would happen soon but i kept it inside'
    };
    const expectedAction = [CREATE_ARTICLE_FAIL];
    return store.dispatch(createArticle(mockArticles)).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expectedAction);
    });
  });

  test('Should return CREATE_ARTICLE_FAIL action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          error: 'SERVER ERROR!  Please contact the administartor',
          data: {
            error: 'title is requiredB'
          }
        }
      });
    });
    const expected = {
      status: 400,
      error: 'SERVER ERROR!  Please contact the administartor'
    };
    moxios.stubRequest('/.*', {
      response: expected
    });
    const mockArticles = {
      title: 'So I the last one standing',
      description: 'I knew that would happen soon but i kept it inside',
      body: 'I knew that would happen soon but i kept it inside'
    };
    const expectedAction = [CREATE_ARTICLE_FAIL];
    return store.dispatch(createArticle(mockArticles)).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expectedAction);
    });
  });
});
