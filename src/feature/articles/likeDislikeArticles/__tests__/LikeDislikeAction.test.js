import moxios from 'moxios';
import { makeMockStore } from '../../../../app/common/config/mockStore';
import { likeArticle, dislikeArticle } from '../LikeDislikeAction';
import mockArticle from '../../../../__mocks__/mockData';

const store = makeMockStore({ article: {} });
describe('Like Article Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('Should dispatch LIKE_ARTICLE_FAIL action', () => {
    const error = 'No articles the moment';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          data: {
            error: 'Unable to like this article'
          }
        }
      });
    });
    const expected = ['LIKE_ARTICLE_FAIL'];
    return store.dispatch(likeArticle(error)).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expected);
    });
  });
});

describe('Dislike Article Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  it('Should dispatch DISLIKE_ARTICLE_FAIL action', async () => {
    const error = 'No articles the moment';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          data: {
            error: 'Unable to like this article'
          }
        }
      });
    });
    const expected = ['DISLIKE_ARTICLE_FAIL'];
    return store.dispatch(dislikeArticle(error)).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expected);
    });
  });
});

describe('Like and Dislike sucess  Article Actions ', () => {
  beforeEach(() => moxios.install());
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  const slug = 'Should dispatch GET_SINGLE_ARTICLE_SUCCESS-3244';
  it('Should dispatch LIKE_ARTICLE_SUCCESS action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {
            message: 'You have successfully liked'
          }
        }
      });
    });
    const expected = ['LIKE_ARTICLE_SUCCESS'];
    await store.dispatch(likeArticle(slug));
    const dispatchedActions = store.getActions();
    const dispatchedTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedTypes).toEqual(expected);
  });
  it('Should dispatch  DISLIKE_ARTICLE_SUCCESS action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {
            article: mockArticle.article
          }
        }
      });
    });
    const expected = ['DISLIKE_ARTICLE_SUCCESS'];
    return store.dispatch(dislikeArticle(slug)).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes).toEqual(expected);
    });
  });
});
describe('SERVER ERROR', () => {
  it('Should return an error', async () => {
    const slug = 'Should dispatch GET_SINGLE_ARTICLE_SUCCESS-3244';
    const expected = [
      {
        payload: 'jwt malformed',
        type: 'DISLIKE_ARTICLE_FAIL'
      }
    ];
    await store.dispatch(dislikeArticle(slug));
    expect(store.getActions()).toEqual(expected);
  });
});
