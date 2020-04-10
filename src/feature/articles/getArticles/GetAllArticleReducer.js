import { GET_ARTICLES_SUCCESS, GET_ARTICLES_FAIL, LOADING } from '../constants';

export const initialState = {
  articles: [],
  loading: true
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false
      };
    case GET_ARTICLES_FAIL:
      return { ...state, ...payload, loading: false };
    case LOADING:
      return { ...state, ...payload };
    default:
      return {
        ...state
      };
  }
};
