import axios from 'axios';
import * as commentTypes from './commentActionTypes';
import { BACKEND_URL } from '../../app/common/config/appConfig';

export const commentFetchSuccess = (comments) => ({
  type: commentTypes.COMMENT_FETCH_SUCCESS,
  comments,
});

export const commentLoading = () => ({
  type: commentTypes.COMMENT_LOADING,
});

export const hasMore = (hasMoreComments) => ({
  type: commentTypes.COMMENT_HASMORE,
  hasMoreComments,
});

export const commentFetchFail = (commentError) => ({
  type: commentTypes.COMMENT_FETCH_ERROR,
  commentError,
});

// Pass in the comment

export const publishSuccess = (comment) => ({
  type: commentTypes.PUBLISH_SUCCESS,
  comment,
});

export const publishFail = (error) => ({
  type: commentTypes.PUBLISH_FAIL,
  error,
});

export const commentUpdateSuccess = (commentId, newComment) => ({
  type: commentTypes.COMMENT_UPDATE_SUCCESS,
  payload: {
    commentId,
    newComment,
  }
});

export const commentUpdateFail = (error) => ({
  type: commentTypes.COMMENT_UPDATE_FAIL,
  error,
});

export const commentDeleteSuccess = (commentId) => ({
  type: commentTypes.COMMENT_DELETE_SUCCESS,
  payload: commentId,
});

export const commentDeleteFail = (error) => ({
  type: commentTypes.COMMENT_DELETE_FAIL,
  error,
});

export const fetchComments = (articleSlug, page, limit) => async (dispatch) => {
  try {
    dispatch(commentLoading());
    const p = page || 1;
    const l = limit || 2;
    const res = await axios
      .get(`${BACKEND_URL}/articles/${articleSlug}/comments?page=${p}&limit=${l}`);
    const { data } = res;
    const comments = data.data;
    if (comments && (p <= data.pages)) {
      dispatch(commentFetchSuccess(comments));
    } else {
      dispatch(hasMore(false));
    }
  } catch (err) {
    const error = (await err.response)
      ? err.response.data.error
      : 'Something went wrong';
    dispatch(hasMore(false));
    dispatch(commentFetchFail(error));
  }
};

export const publish = (comment, articleSlug) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const userComment = { comment };
    const res = await axios.post(`${BACKEND_URL}/articles/${articleSlug}/comments`, userComment,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });
    const { articleComment } = res.data;
    if (articleComment) {
      dispatch(publishSuccess(articleComment));
    }
  } catch (err) {
    const error = (await err.response)
      ? err.response.data.error
      : 'Something went wrong';
    dispatch(publishFail(error));
  }
};

export const commentUpdate = (comment, articleSlug, commentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const userComment = { comment };
    const res = await axios.patch(`${BACKEND_URL}/articles/${articleSlug}/comments/${commentId}`, userComment,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });
    const { updatedComment } = res.data;
    if (updatedComment) {
      dispatch(commentUpdateSuccess(commentId, comment));
    }
  } catch (err) {
    const error = (await err.response)
      ? err.response.data.error
      : 'Something went wrong';
    dispatch(commentUpdateFail(error));
  }
};

export const commentDelete = (articleSlug, commentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.delete(`${BACKEND_URL}/articles/${articleSlug}/comments/${commentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });
    const { message } = res.data;
    if (message) {
      dispatch(commentDeleteSuccess(commentId));
    }
  } catch (err) {
    const error = (await err.response)
      ? err.response.data.error
      : 'Something went wrong';
    dispatch(commentDeleteFail(error));
  }
};
