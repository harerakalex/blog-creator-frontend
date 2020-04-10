/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../app/common/config/appConfig';
import { UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR } from './UpdateProfileConstants';

export const updateProfile = profile => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: profile
});

export const sendError = profileError => ({
  type: UPDATE_PROFILE_ERROR,
  error: profileError
});

export const updateUserProfile = (user, profile, closeModal) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        authorization: token,
        'content-type': 'multipart/form-data'
      }
    };
    const { bio, image } = profile;
    const formData = new FormData();
    if (bio !== null) formData.append('bio', bio);
    if (image !== null) formData.append('image', image);
    const response = await axios.put(`${BACKEND_URL}/profiles/${user}`, formData, config);
    dispatch(updateProfile(response));
    toast.success(response.data.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    closeModal();
  } catch (error) {
    dispatch(sendError(error));
    toast.error(error.response.data.error, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
};
