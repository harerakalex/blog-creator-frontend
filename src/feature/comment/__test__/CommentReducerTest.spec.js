import Comment from '../CommentReducer';
import * as actionTypes from '../commentActionTypes';
import comments from './mockData';

describe('CommentReducer', () => {
  const initialState = {
    comments: [{ id: 1, comment: 'comment' }],
  };
  const initialState2 = {
    comments: [{ id: 1, comment: 'comment' },
      { id: 2, comment: 'comment 2' }],
  };
  it('Should test COMMENT_FETCH_SUCCESS action type', () => {
    const action = {
      type: actionTypes.COMMENT_FETCH_SUCCESS,
      comments: comments.comments,
      commentLoading: false,
    };
    const reducer = Comment(comments, action);
    expect(reducer.comments).toBeTruthy();
  });
  it('Should if error is in the store', () => {
    const action = {
      type: actionTypes.COMMENT_FETCH_ERROR,
      commentLoading: false,
      commentError: 'An error occured',
    };
    const reducer = Comment({}, action);
    expect(reducer).toHaveProperty('commentError');
  });
  it('Should update if store has more comments', () => {
    const action = {
      type: actionTypes.COMMENT_HASMORE,
      hasMoreComments: true,
    };
    const reducer = Comment(comments.comments, action);
    expect(reducer.hasMoreComments).toEqual(true);
  });
  it('Should tell if comments are being loaded', () => {
    const action = {
      type: actionTypes.COMMENT_LOADING,
      commentLoading: true,
    };
    const reducer = Comment(comments.comments, action);
    expect(reducer.commentLoading).toBeTruthy();
  });
  it('Should add a comment to the store', () => {
    const action = {
      type: actionTypes.PUBLISH_SUCCESS,
      comment: { id: 1, comment: 'updated' }
    };
    const reducer = Comment(initialState, action);
    expect(reducer.comments)
      .toEqual([action.comment, ...initialState.comments]);
  });
  it('Should fail attempting to add a comment', () => {
    const action = {
      type: actionTypes.PUBLISH_FAIL,
      error: 'error'
    };
    const reducer = Comment(initialState, action);
    expect(reducer.publishFail).toEqual('error');
  });
  it('Should update a comment in the store', () => {
    const action = {
      type: actionTypes.COMMENT_UPDATE_SUCCESS,
      payload: { commentId: 1, newComment: 'new comment' }
    };
    const reducer = Comment(initialState2, action);
    expect(reducer.comments).toEqual([{
      id: 1,
      comment: 'new comment'
    },
    { id: 2, comment: 'comment 2' }]);
  });
  it('Should fail attempting to update a comment', () => {
    const action = {
      type: actionTypes.COMMENT_UPDATE_FAIL,
      error: 'error'
    };
    const reducer = Comment(initialState, action);
    expect(reducer.error).toEqual('error');
  });
  it('Should delete a comment from the store', () => {
    const action = {
      type: actionTypes.COMMENT_DELETE_SUCCESS,
      payload: 1
    };
    const reducer = Comment(initialState, action);
    expect(reducer.comments).toEqual([]);
  });
  it('Should fail to delete a comment from the store', () => {
    const action = {
      type: actionTypes.COMMENT_DELETE_FAIL,
      error: 'error now'
    };
    const reducer = Comment(initialState, action);
    expect(reducer.error).toEqual('error now');
  });
});
