import { CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_FAIL } from '../constants';

export const initialState = {
  article: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        ...payload
      };
    case CREATE_ARTICLE_FAIL:
      return { ...state, ...payload };
    default:
      return {
        ...state
      };
  }
};
