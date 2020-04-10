import * as actionTypes from './userArticleTypes';

const initialState = {
  userArticleLoading: false,
  articles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: [...action.articles],
        userArticleLoading: false,
      };
    case actionTypes.FETCH_ARTICLE_LOADING:
      return {
        ...state,
        userArticleLoading: true,
      };
    case actionTypes.FETCH_ARTICLE_FAIL:
      return {
        ...state,
        userArticleLoading: false,
        articles: [],
        error: action.error,
      };
    default:
      return state;
  }
};
