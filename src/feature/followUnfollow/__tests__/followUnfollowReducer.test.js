/* eslint-disable import/named */
import followReducers, { initialState } from '../followUnfollowReducer';
import {
  FOLLOW_AUTHOR_SUCCESS,
  FOLLOW_AUTHOR_FAIL,
  UNFOLLOW_AUTHOR_SUCCESS,
  UNFOLLOW_AUTHOR_FAIL,
  GET_FOLLOWING_AUTHOR_SUCCESS,
  CLEAR_FOLLOW,
  CLEAR_FOLLOWERS,
  CLEAR_FOLLOWING_LIST,
  GET_FOLLOWERS_AUTHOR_SUCCESS,
  GET_FOLLOWINGLIST_SUCCESS
} from '../followUnfollowTypes';

describe('FOLLOW AUTHOR', () => {
  test('FOLLOW AUTHOR SUCCESS', () => {
    const reducer = followReducers(initialState, {
      type: FOLLOW_AUTHOR_SUCCESS,
      follow: undefined,
      payload: {},
      following: []
    });
    expect(reducer).toHaveProperty('following');
    expect(reducer).toHaveProperty('payload');
  });

  test('FOLLOW AUTHOR FAIL', () => {
    const reducer = followReducers(initialState, {
      type: FOLLOW_AUTHOR_FAIL,
      follow: undefined,
      payload: {},
      following: []
    });
    expect(reducer).toHaveProperty('following');
    expect(reducer).toHaveProperty('payload');
  });
});

describe('GET FOLLOWING', () => {
  test('UNFOLLOW AUTHOR SUCCESS', () => {
    const reducer = followReducers(initialState, {
      type: UNFOLLOW_AUTHOR_SUCCESS,
      follow: undefined,
      payload: {},
      following: []
    });
    expect(reducer).toHaveProperty('following');
    expect(reducer).toHaveProperty('payload');
  });

  test('UNFOLLOW AUTHOR FAIL', () => {
    const reducer = followReducers(initialState, {
      type: UNFOLLOW_AUTHOR_FAIL,
      follow: undefined,
      payload: {},
      following: []
    });
    expect(reducer).toHaveProperty('following');
    expect(reducer).toHaveProperty('payload');
  });
});

describe('GET FOLLOWING', () => {
  test('GET FOLLOWING SUCCESS', () => {
    const reducer = followReducers(initialState, {
      type: GET_FOLLOWING_AUTHOR_SUCCESS,
      follow: undefined,
      payload: {}
    });
    expect(reducer).toHaveProperty('following');
  });
});

describe('CLEAR FOLLOWING', () => {
  test('CLEAR FOLLOWING', () => {
    const reducer = followReducers(initialState, {
      type: CLEAR_FOLLOW,
      follow: undefined,
    });
    expect(reducer).toHaveProperty('following');
  });
});

describe('CLEAR_FOLLOWERS', () => {
  test('CLEAR_FOLLOWERS', () => {
    const reducer = followReducers(initialState, {
      type: CLEAR_FOLLOWERS,
      follow: undefined,
    });
    expect(reducer).toHaveProperty('followers');
  });
});

describe('CLEAR_FOLLOWING_LIST', () => {
  test('CLEAR_FOLLOWING_LIST', () => {
    const reducer = followReducers(initialState, {
      type: CLEAR_FOLLOWING_LIST,
      follow: undefined,
    });
    expect(reducer).toHaveProperty('followingList');
  });
});

describe('GET_FOLLOWERS_AUTHOR_SUCCESS', () => {
  test('GET_FOLLOWERS_AUTHOR_SUCCESS', () => {
    const reducer = followReducers(initialState, {
      type: GET_FOLLOWERS_AUTHOR_SUCCESS,
      follow: undefined,
      payload: {}
    });
    expect(reducer).toHaveProperty('followers');
  });
});
describe('GET_FOLLOWINGLIST_SUCCESS', () => {
  test('GET_FOLLOWINGLIST_SUCCESS', () => {
    const reducer = followReducers(initialState, {
      type: GET_FOLLOWINGLIST_SUCCESS,
      follow: undefined,
      payload: {}
    });
    expect(reducer).toHaveProperty('followingList');
  });
});
