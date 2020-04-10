import axios from 'axios';
import { BACKEND_URL } from '../../../app/common/config/appConfig';
import {
  RETRIEVE_VISITED_PROFILE_SUCCESS,
  RETRIEVE_VISITED_PROFILE_ERROR
} from '../view_profile/ViewProfileConstants';

const getOtherUserProfile = user => async dispatch => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/profiles/${user}`);

    dispatch({
      type: RETRIEVE_VISITED_PROFILE_SUCCESS,
      payload: data.data
    });
  } catch (error) {
    dispatch({
      type: RETRIEVE_VISITED_PROFILE_ERROR,
      payload: error
    });
  }
};

export default getOtherUserProfile;
