import moxios from 'moxios';
import appMockStore from '../../../../__mocks__/mockStoreConfig';
import getSingleArticle from '../GetSingleArticleAction';
import {
  GET_SINGLE_ARTICLE_SUCCESS,
  GET_SINGLE_ARTICLE_FAIL
} from '../../constants';

const store = appMockStore({});

describe('Create Article success', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  test('Should return GET_SINGLE_ARTICLE_SUCCESS action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });
    const expectedAction = [GET_SINGLE_ARTICLE_SUCCESS];
    return store.dispatch(getSingleArticle()).then(() => {
      const dispatchedActions = store.getActions();

      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expectedAction);
    });
  });
  test('Should return GET_SINGLE_ARTICLE_FAIL action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: 'No articles found at the monent'
        }
      });
    });
    const expectedAction = [GET_SINGLE_ARTICLE_FAIL];
    return store.dispatch(getSingleArticle()).then(() => {
      const dispatchedActions = store.getActions();

      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expectedAction);
    });
  });
});
