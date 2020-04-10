import {
  LIKE_ARTICLE_SUCCESS,
  LIKE_ARTICLE_FAIL,
  DISLIKE_ARTICLE_FAIL,
  DISLIKE_ARTICLE_SUCCESS,
  GET_SINGLE_ARTICLE_SUCCESS,
  GET_SINGLE_ARTICLE_FAIL,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAIL,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAIL
} from '../constants';

export const initialState = {
  article: {},
  deleted: false,
  updated: false,
  loading: true
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIKE_ARTICLE_SUCCESS:
    case DISLIKE_ARTICLE_SUCCESS:
    case GET_SINGLE_ARTICLE_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        deleted: true
      };
    case UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        ...payload,
        updated: true
      };
    case LIKE_ARTICLE_FAIL:
    case DISLIKE_ARTICLE_FAIL:
    case GET_SINGLE_ARTICLE_FAIL:
      return { ...state, ...payload };
    case DELETE_ARTICLE_FAIL:
      return { ...state, deleted: false };
    case UPDATE_ARTICLE_FAIL:
      return { ...state, ...payload, updated: false };
    default:
      return {
        ...state
      };
  }
};
