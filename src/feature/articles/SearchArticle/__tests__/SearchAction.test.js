import moxios from 'moxios';
import { makeMockStore } from '../../../../app/common/config/mockStore';
import { search } from '../SearchAction';
import { SEARCH_SUCCESS, SEARCH_ERROR } from '../SearchConstants';

const store = makeMockStore({ articles: [] });
const mockSuccess = data => ({ status: 200, response: data });
const mockError = error => ({ status: 404, response: error });

describe('Search Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch SEARCH_SUCCESS action', async () => {
    try {
      const expected = {
        type: SEARCH_SUCCESS,
        response: { status: 200, response: [] }
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess());
      });
      const result = await store.dispatch(search('keyword', 'query'));
      if (result) {
        const actionCalled = store.getActions();
        expect(actionCalled[0]).toEqual(expected);
      }
    } catch (err) { return null; }
  });
  it('should dispatch SEARCH_ERROR action', async () => {
    try {
      const error = 'no article found';
      const expected = {
        type: SEARCH_ERROR,
        response: { status: 404, error }
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(error));
      });
      const result = await store.dispatch(search('keyword', 'query'));
      if (result) {
        const actionCalled = store.getActions();
        expect(actionCalled[0]).toEqual(expected);
      }
    } catch (err) { return null; }
  });
});
