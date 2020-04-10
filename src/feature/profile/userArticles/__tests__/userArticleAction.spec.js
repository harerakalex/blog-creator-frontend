import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Enzyme from 'enzyme';
import axios from 'axios';
import moxios from 'moxios';
import promiseMiddleware from 'redux-promise-middleware';
import Adapter from 'enzyme-adapter-react-16';
import * as actionTypes from '../userArticleTypes';
import {
  fetchArticles
} from '../UserArticleAction';

Enzyme.configure({ adapter: new Adapter() });
const middleware = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('Action types', () => {
  beforeEach(() => {
    moxios.install(axios);
    // storage = window.localStorage.setItem('token', 'hey malaba');
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  it('Should dispatch FETCH_ARTICLE_LOADING, FETCH_ARTICLE_SUCCESS action types', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: {
          data: {
            data: {
              articles: [{
                id: 1,
                slug: 'slug',
                description: 'desc',
              }],
            },
          },
        }
      });
    });

    const expectedActionLoading = actionTypes.FETCH_ARTICLE_LOADING;
    const expectedAction = actionTypes.FETCH_ARTICLE_SUCCESS;

    return store.dispatch(fetchArticles('eric')).then(() => {
      const dispatchedActions = store.getActions();

      const dispatchedTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedTypes[0]).toEqual(expectedActionLoading);
      expect(dispatchedActions[1].type).toEqual(expectedAction);
    });
  });
  it('Should dispatch FETCH_ARTICLE_LOADING, FETCH_ARTICLE_FAIL action types',
    async () => {
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 404,
          response: {
            error: 'Something wrong happened'
          }
        });
      });
      const expectedActionLoading = actionTypes.FETCH_ARTICLE_LOADING;
      const expectedAction = actionTypes.FETCH_ARTICLE_FAIL;

      return store.dispatch(fetchArticles()).then(() => {
        const dispatchedActions = store.getActions();

        const dispatchedTypes = dispatchedActions.map(action => action.type);
        expect(dispatchedTypes[0]).toEqual(expectedActionLoading);
        expect(dispatchedTypes[1]).toEqual(expectedAction);
      });
    });
});
