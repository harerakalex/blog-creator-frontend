/* eslint-disable import/named */
import followReducers, { initialState } from '../bookmarkReducer';
import {
  BOOKMARK_SUCCESS,
  BOOKMARK_FAIL,
  UNBOOKMARK_SUCCESS,
  UNBOOKMARK_FAIL,
  GET_BOOKMARKS_SUCCESS,
  GET_BOOKMARKS_FAIL
} from '../bookmarkTypes';

describe('BOOKMARK REDUCER', () => {
  test('BOOKMARK_SUCCESS', () => {
    const reducer = followReducers(initialState, {
      type: BOOKMARK_SUCCESS,
      payload: {},
      bookmarks: []
    });
    expect(reducer).toHaveProperty('bookmarks');
    expect(reducer).toHaveProperty('payload');
  });
  test('BOOKMARK_FAIL', () => {
    const reducer = followReducers(initialState, {
      type: BOOKMARK_FAIL,
      payload: {},
      bookmarks: []
    });
    expect(reducer).toHaveProperty('bookmarks');
    expect(reducer).toHaveProperty('payload');
  });
});

describe('UNBOOKMARK', () => {
  test('UNBOOKMARK_SUCCESS', () => {
    const reducer = followReducers({ ...initialState, bookmarks: [{ articleId: 1 }] }, {
      type: UNBOOKMARK_SUCCESS,
      payload: { articleId: 2 }
    });
    expect(reducer).toHaveProperty('bookmarks');
    expect(reducer).toHaveProperty('loading');
  });

  test('UNBOOKMARK_FAIL', () => {
    const reducer = followReducers(initialState, {
      type: UNBOOKMARK_FAIL,
      payload: {},
      bookmarks: []
    });
    expect(reducer).toHaveProperty('bookmarks');
    expect(reducer).toHaveProperty('payload');
  });
});

describe('GET_BOOKMARKS', () => {
  test('GET_BOOKMARKS_SUCCESS', () => {
    const reducer = followReducers(initialState, {
      type: GET_BOOKMARKS_SUCCESS,
      payload: {}
    });
    expect(reducer).toHaveProperty('bookmarks');
  });
  test('GET_BOOKMARKS_FAIL', () => {
    const reducer = followReducers(initialState, {
      type: GET_BOOKMARKS_FAIL,
      payload: {}
    });
    expect(reducer).toHaveProperty('bookmarks');
  });
});
