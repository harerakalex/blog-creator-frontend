import moxios from 'moxios';
import { makeMockStore } from '../../../../app/common/config/mockStore';
import deleteArticle from '../DeleteAction';

const store = makeMockStore({ article: {} });
describe('Delete Article tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('Should dispatch DELETE_ARTICLE_FAIL action', () => {
    const error = 'No articles the moment';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: {
          data: {
            error: 'You can not delete someones article!!!'
          }
        }
      });
    });
    const expected = ['DELETE_ARTICLE_FAIL'];
    return store.dispatch(deleteArticle(error)).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expected);
    });
  });
  test('Should dispatch DELETE_ARTICLE_SUCCESS action', () => {
    const slug = 'No articles the moment';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Successfully deleted'
        }
      });
    });
    const expected = ['DELETE_ARTICLE_SUCCESS'];
    return store.dispatch(deleteArticle(slug)).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expected);
    });
  });
});
