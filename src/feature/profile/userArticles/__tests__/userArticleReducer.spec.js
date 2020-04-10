import article from '../UserArticlesReducer';
import * as actionTypes from '../userArticleTypes';

describe('CommentReducer', () => {
  const initialState = {
    articles: [{
      id: 1,
      slug: 'slug',
      description: 'desc',
    }],
  };

  it('Should test FETCH_ARTICLE_SUCCESS action type', () => {
    const action = {
      type: actionTypes.FETCH_ARTICLE_SUCCESS,
      articles: initialState.articles,
      userArticleLoading: false,
    };
    const reducer = article([{
      id: 1,
      slug: 'slug',
      description: 'desc',
    }], action);
    expect(reducer.articles).toBeTruthy();
  });
  it('Should test if articles are being loaded', () => {
    const action = {
      type: actionTypes.FETCH_ARTICLE_LOADING,
      userArticleLoading: true,
    };
    const reducer = article(initialState.articles, action);
    expect(reducer.userArticleLoading).toBeTruthy();
  });
  it('Should return COMMENT_FETCH_ERROR action type', () => {
    const action = {
      type: actionTypes.FETCH_ARTICLE_FAIL,
      error: 'An error occured',
    };
    const reducer = article(initialState, action);
    expect(reducer.error).toEqual('An error occured');
  });
});
