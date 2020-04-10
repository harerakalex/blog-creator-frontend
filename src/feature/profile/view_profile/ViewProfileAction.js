/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { BACKEND_URL } from '../../../app/common/config/appConfig';
import { RETRIEVE_PROFILE_SUCCESS, RETRIEVE_PROFILE_ERROR } from './ViewProfileConstants';


export const getProfile = profile => ({
  type: RETRIEVE_PROFILE_SUCCESS,
  payload: profile
});

export const sendError = profileError => ({
  type: RETRIEVE_PROFILE_ERROR,
  error: profileError
});

export const retrieveProfile = user => async dispatch => {
  try {
    const response = await axios.get(`${BACKEND_URL}/profiles/${user}`);
    dispatch(getProfile(response));
  } catch (error) {
    dispatch(sendError(error));
  }
};
