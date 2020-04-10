import { GET_ARTICLES_SUCCESS, GET_ARTICLES_FAIL } from '../../constants';
import GetAllArticleReducer, { initialState } from '../GetAllArticleReducer';
import mockData from '../../../../__mocks__/mockData';

describe('Get all Article reducer', () => {
  const { payload } = mockData;
  it('Should test GET_ARTICLES_SUCCESS', () => {
    const reducer = GetAllArticleReducer(initialState, {
      type: GET_ARTICLES_SUCCESS,
      payload: {
        payload
      }
    });
    expect(reducer.payload).toEqual(payload);
  });

  it('Should test GET_ARTICLES_FAIL', () => {
    const reducer = GetAllArticleReducer(initialState, {
      type: GET_ARTICLES_FAIL,
      payload: {
        error: 'No articles found at the moment'
      }
    });
    expect(reducer.error).toEqual('No articles found at the moment');
  });
});
