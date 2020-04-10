import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR
} from '../update_profile/UpdateProfileConstants';
import {
  RETRIEVE_PROFILE_SUCCESS,
  RETRIEVE_VISITED_PROFILE_SUCCESS,
  RETRIEVE_VISITED_PROFILE_ERROR,
  RETRIEVE_PROFILE_ERROR
} from '../view_profile/ViewProfileConstants';

const initState = { profile: [], visitedProfile: [] };

const ProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case RETRIEVE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.data.data
      };
    case RETRIEVE_VISITED_PROFILE_SUCCESS:
      return {
        ...state,
        visitedProfile: action.payload
      };
    case RETRIEVE_VISITED_PROFILE_ERROR:
      return {
        ...state
      };
    case RETRIEVE_PROFILE_ERROR:
      return state;
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.data.data
      };
    case UPDATE_PROFILE_ERROR:
      return state;
    default:
      return state;
  }
};

export default ProfileReducer;
