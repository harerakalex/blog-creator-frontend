import * as actionTypes from './commentActionTypes';

const initialState = {
  commentLoading: '',
  comments: [],
  comment: null,
  commentError: null,
  puplish: '',
  publishFail: null,
  image: null,
  hasMoreComments: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMMENT_FETCH_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, ...action.comments],
        commentLoading: false,
      };
    case actionTypes.COMMENT_HASMORE:
      return {
        ...state,
        hasMoreComments: action.hasMoreComments,
      };
    case actionTypes.COMMENT_FETCH_ERROR:
      return {
        ...state,
        commentError: action.commentError,
        commentLoading: false,
      };
    case actionTypes.COMMENT_LOADING:
      return {
        ...state,
        commentLoading: true
      };
    case actionTypes.PUBLISH_SUCCESS:
      return {
        ...state,
        comments: [action.comment, ...state.comments]
      };
    case actionTypes.PUBLISH_FAIL:
      return {
        ...state,
        publishFail: action.error,
      };
    case actionTypes.COMMENT_UPDATE_SUCCESS: {
      const { commentId, newComment } = action.payload;
      const updatedComments = [...state.comments.map(e => {
        if (e.id === commentId) {
          e.comment = newComment;
        }
        return e;
      })];
      return {
        ...state,
        comments: updatedComments,
      };
    }
    case actionTypes.COMMENT_UPDATE_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.COMMENT_DELETE_SUCCESS: {
      const commentId = action.payload;
      const updatedComments = state
        .comments
        .filter(e => e.id !== commentId);
      return {
        ...state,
        comments: updatedComments,
      };
    }
    case actionTypes.COMMENT_DELETE_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
