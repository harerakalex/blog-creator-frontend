import axios from 'axios';
import moxios from 'moxios';
import appMockStore from '../../../../__mocks__/mockStoreConfig';
import updateArticle from '../UpdateArticleAction';
import { UPDATE_ARTICLE_SUCCESS, UPDATE_ARTICLE_FAIL } from '../../constants';
import LocalStorage from '../../../../__mocks__/localStorage';

const store = appMockStore({});

let storage;
const token = 'Invalid token';

describe('Update Article Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
    storage = window.localStorage.setItem('token', token);
    window.localStorage = new LocalStorage();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  test('Should return UPDATE_ARTICLE_SUCCESS action', () => {
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

    const expectedAction = [UPDATE_ARTICLE_SUCCESS];
    return store.dispatch(updateArticle(mockArticles)).then(() => {
      const dispatchedActions = store.getActions();

      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expectedAction);
    });
  });

  test('Server error testing error', () => {
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
    return store.dispatch(updateArticle(mockArticles)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });

  test('Should return UPDATE_ARTICLE_FAIL action', () => {
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
    const expectedAction = [UPDATE_ARTICLE_FAIL];
    return store.dispatch(updateArticle(mockArticles)).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expectedAction);
    });
  });

  test('Should return UPDATE_ARTICLE_FAIL action', () => {
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
      body:
        'I knew that would happen soon but i kept it inside not to harm anyome'
    };
    const expectedAction = [UPDATE_ARTICLE_FAIL];
    return store.dispatch(updateArticle(mockArticles)).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expectedAction);
    });
  });
});
