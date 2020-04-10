
import * as searchActionTypes from './SearchConstants';

export const initialState = {
  articles: [],
  error: null,
};

const Search = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case searchActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        ...payload,
        error: null,
      };
    case searchActionTypes.SEARCH_ERROR:
      return {
        articles: [],
        error: payload,
      };
    default:
      return {
        ...state
      };
  }
};

export default Search;
