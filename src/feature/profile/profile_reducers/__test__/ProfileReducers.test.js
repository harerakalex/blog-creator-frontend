import ProfileReducer from '../ProfileReducers';
import {
  RETRIEVE_PROFILE_SUCCESS,
  RETRIEVE_PROFILE_ERROR
} from '../../view_profile/ViewProfileConstants';
import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR
} from '../../update_profile/UpdateProfileConstants';

const initState = { profile: [] };

const expected = {
  profile: {
    userName: 'someone',
    bio: 'someone@someone.com',
    image: 'someone'
  }
};

const profile = {
  userName: 'someone',
  bio: 'someone@someone.com',
  image: 'someone'
};

const retrieveProfileSuccessAction = {
  type: RETRIEVE_PROFILE_SUCCESS,
  payload: {
    data: {
      data: profile
    }
  }
};

const retrieveProfileFailureAction = {
  type: RETRIEVE_PROFILE_ERROR,
  error: 'username not found'
};

const updateProfileSuccessAction = {
  type: UPDATE_PROFILE_SUCCESS,
  payload: {
    data: {
      data: profile
    }
  }
};

const updateProfileFailureAction = {
  type: UPDATE_PROFILE_ERROR,
  error: 'invalid image'
};

// const retrieveProfileError = {
//   type: RETRIEVE_PROFILE_ERROR
// };

describe('Profile Reducer Tests', () => {
  it('should return an empty state', () => {
    const defaultState = ProfileReducer(undefined, {});
    expect(defaultState).toEqual({ profile: [], visitedProfile: [] });
  });

  it('should return a profile from retrieve profile success action', () => {
    const newState = ProfileReducer(initState, retrieveProfileSuccessAction);
    expect(newState).toEqual(expected);
  });
  it('should return an empty state from retrieve profile failure action', () => {
    const newState = ProfileReducer(initState, retrieveProfileFailureAction);
    expect(newState).toEqual(initState);
  });
  it('should return an updated profile from update profile success action', () => {
    const newState = ProfileReducer(initState, updateProfileSuccessAction);
    expect(newState).toEqual(expected);
  });
  it('should return an empty state from update profile failure action', () => {
    const newState = ProfileReducer(initState, updateProfileFailureAction);
    expect(newState).toEqual(initState);
  });
});
