import { CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_FAIL } from '../constants';
import createArticleReducer, {
  initialState
} from '../createArticle/createArticleReducer';

describe('Create Article reducer', () => {
  it('Should test CREATE_ARTICLE_SUCCESS', () => {
    const reducer = createArticleReducer(initialState, {
      type: CREATE_ARTICLE_SUCCESS,
      payload: {
        title: 'So I the last one standing',
        description: 'I knew that would happen soon but i kept it inside',
        body: 'I knew that would happen soon but i kept it inside'
      }
    });
    expect(reducer.title).toEqual('So I the last one standing');
    expect(reducer.description).toEqual(
      'I knew that would happen soon but i kept it inside'
    );
    expect(reducer.body).toEqual(
      'I knew that would happen soon but i kept it inside'
    );
  });

  it('Should test CREATE_ARTICLE_FAIL', () => {
    const reducer = createArticleReducer(initialState, {
      type: CREATE_ARTICLE_FAIL,
      payload: {
        error: 'Title is required'
      }
    });
    expect(reducer.error).toEqual('Title is required');
  });

  it('Should test No_ACTION/DEFAULT', () => {
    const reducer = createArticleReducer(initialState, {
      payload: {}
    });
    expect(reducer.article).toEqual({});
  });
});
