import {
  CLEAR_FOLLOW,
  CLEAR_FOLLOWERS,
  FOLLOW_AUTHOR_SUCCESS,
  FOLLOW_AUTHOR_FAIL,
  UNFOLLOW_AUTHOR_SUCCESS,
  UNFOLLOW_AUTHOR_FAIL,
  GET_FOLLOWING_AUTHOR_SUCCESS,
  GET_FOLLOWERS_AUTHOR_SUCCESS,
  GET_FOLLOWINGLIST_SUCCESS,
  CLEAR_FOLLOWING_LIST,
} from './followUnfollowTypes';

const initialState = {
  follow: undefined,
  following: [],
  followers: [],
  followingList: [],
};

const followReducers = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case CLEAR_FOLLOW: return {
      ...state,
      following: []
    };
    case CLEAR_FOLLOWERS: return {
      ...state,
      followers: []
    };
    case CLEAR_FOLLOWING_LIST: return {
      ...state,
      followingList: []
    };
    case GET_FOLLOWING_AUTHOR_SUCCESS: return {
      ...state,
      following: payload.data
    };
    case GET_FOLLOWERS_AUTHOR_SUCCESS: return {
      ...state,
      followers: payload.data
    };
    case GET_FOLLOWINGLIST_SUCCESS: return {
      ...state,
      followingList: payload.data
    };
    case FOLLOW_AUTHOR_SUCCESS: return {
      ...state,
      payload,
      following: [...state.following, payload.data]
    };
    case FOLLOW_AUTHOR_FAIL: return {
      ...state,
      payload
    };
    case UNFOLLOW_AUTHOR_SUCCESS: return {
      ...state,
      payload
    };
    case UNFOLLOW_AUTHOR_FAIL: return {
      ...state,
      payload
    };
    default: return state;
  }
};

export default followReducers;
