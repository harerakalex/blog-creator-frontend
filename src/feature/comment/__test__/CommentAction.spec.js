import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Enzyme from 'enzyme';
import axios from 'axios';
import moxios from 'moxios';
import promiseMiddleware from 'redux-promise-middleware';
import Adapter from 'enzyme-adapter-react-16';
import * as actionTypes from '../commentActionTypes';
import comments from './mockData';
import LocalStorage from '../../../__mocks__/localStorage';
import {
  fetchComments,
  publish,
  commentUpdate,
  commentDelete,
} from '../CommentAction';

Enzyme.configure({ adapter: new Adapter() });
const middleware = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middleware);
const slug = 'does';
const store = mockStore({});
let storage;

describe('Action types', () => {
  beforeEach(() => {
    moxios.install(axios);
    storage = window.localStorage.setItem('token', 'hey malaba');
    window.localStorage = new LocalStorage();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
    window.localStorage = storage;
  });
  it('Should dispatch COMMENT_LOADING, COMMENT_HASMORE and COMMENT_FETCH_SUCCESS action type', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: {
          data: {
            data: {
              comments,
              pages: 2
            },
          },
          pages: 2,
        }
      });
    });

    const expectedAction = actionTypes.COMMENT_FETCH_SUCCESS;
    const expectedActionLoading = actionTypes.COMMENT_LOADING;

    return store.dispatch(fetchComments(slug, 1, 2)).then(() => {
      const dispatchedActions = store.getActions();

      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes[0]).toEqual(expectedActionLoading);
      expect(dispatchedActions[1].type).toEqual(expectedAction);
    });
  });
  it('Should dispatch COMMENT_LOADING and COMMENT_HASMORE action types', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: {
          data: {
            data: {
              pages: 2
            },
          },
          pages: 2,
        }
      });
    });

    const expectedActionHasMore = actionTypes.COMMENT_HASMORE;
    const expectedActionLoading = actionTypes.COMMENT_LOADING;

    return store.dispatch(fetchComments(slug, 7, 2)).then(() => {
      const dispatchedActions = store.getActions();

      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes[0]).toEqual(expectedActionLoading);
      expect(dispatchedTypes[1]).toEqual(expectedActionHasMore);
    });
  });
  it('Should dispatch COMMENT_LOADING, COMMENT_FETCH_ERROR and COMMENT_FETCH_ERROR  type',
    async () => {
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 301,
          response: {
            error: 'Something wrong happened'
          }
        });
      });
      const expectedActionLoading = actionTypes.COMMENT_LOADING;
      const expectedAction = actionTypes.COMMENT_HASMORE;
      const expectedActionError = actionTypes.COMMENT_FETCH_ERROR;

      return store.dispatch(fetchComments([])).then(() => {
        const dispatchedActions = store.getActions();

        const dispatchedTypes = dispatchedActions.map(action => action.type);
        expect(dispatchedTypes[0]).toEqual(expectedActionLoading);
        expect(dispatchedTypes[1]).toEqual(expectedAction);
        expect(dispatchedTypes[2]).toEqual(expectedActionError);
      });
    });

  it('Should dispatch PUBLISH_SUCCESS action type', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 201,
        response: {
          articleComment: {
            id: 1,
            comment: 'comment'
          },
        }
      });
    });
    const expectedAction = actionTypes.PUBLISH_SUCCESS;
    return store.dispatch(publish('comment', 'slug')).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes[0]).toEqual(expectedAction);
    });
  });
  it('Should dispatch PUBLISH_FAIL action type', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 404,
        response: {
          error: 'You must be looged in to do this',
        }
      });
    });
    const expectedAction = actionTypes.PUBLISH_FAIL;
    return store.dispatch(publish('comment')).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes[0]).toEqual(expectedAction);
    });
  });
  it('Should dispatch COMMENT_UPDATE_SUCCESS action type', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: {
          updatedComment: {
            articleSlug: 'articleSlug',
            id: 1,
            comment: 'comment2',
          }
        }
      });
    });
    const expectedAction = actionTypes.COMMENT_UPDATE_SUCCESS;
    return store.dispatch(commentUpdate('comment', 'articleSlug', 1)).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes[0]).toEqual(expectedAction);
    });
  });
  it('Should dispatch COMMENT_UPDATE_FAIL action type', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 404,
        response: {
          error: 'Article not found'
        }
      });
    });
    const expectedAction = actionTypes.COMMENT_UPDATE_FAIL;
    return store.dispatch(commentUpdate()).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes[0]).toEqual(expectedAction);
    });
  });
  it('Should not dispatch COMMENT_UPDATE action type', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: {
          updatedComment: ''
        }
      });
    });
    return store.dispatch(commentUpdate('comment', 'articleSlug')).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions.length).toEqual(0);
    });
  });
  it('Should dispatch COMMENT_DELETE_SUCCESS action type', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: {
          message: 'Comment successfully deleted'
        }
      });
    });
    const expectedAction = actionTypes.COMMENT_DELETE_SUCCESS;
    return store.dispatch(commentDelete('articleSlug', 1)).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes[0]).toEqual(expectedAction);
    });
  });
  it('Should dispatch COMMENT_DELETE_FAIL action type', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 401,
        response: {
          message: 'You must logged to perform this action'
        }
      });
    });
    const expectedAction = actionTypes.COMMENT_DELETE_FAIL;
    return store.dispatch(commentDelete('articleSlug')).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes[0]).toEqual(expectedAction);
    });
  });
});
