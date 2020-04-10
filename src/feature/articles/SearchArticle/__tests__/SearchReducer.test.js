import { SEARCH_SUCCESS, SEARCH_ERROR } from '../SearchConstants';
import SearchResult, { initialState } from '../SearchReducer';
import mockData from '../../../../__mocks__/mockData';

describe('Search Article reducer', () => {
  const { payload } = mockData;
  it('Should test SEARCH_SUCCESS', () => {
    const reducer = SearchResult(initialState, {
      type: SEARCH_SUCCESS,
      payload: {
        payload
      }
    });
    expect(reducer.payload).toEqual(payload);
  });

  it('Should test SEARCH_ERROR', () => {
    const reducer = SearchResult(initialState, {
      type: SEARCH_ERROR,
      payload: 'No articles found at the moment'
    });
    expect(reducer.error).toEqual('No articles found at the moment');
  });
});
