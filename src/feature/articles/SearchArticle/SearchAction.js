/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import * as searchActionTypes from './SearchConstants';
import { BACKEND_URL } from '../../../app/common/config/appConfig';

export const searchSuccess = data => ({
  type: searchActionTypes.SEARCH_SUCCESS,
  payload: data
});
export const searchError = error => ({
  type: searchActionTypes.SEARCH_ERROR,
  payload: error
});

export const search = (query, keyword) => async dispatch => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/articles?${keyword}=${query}&limit=4`
    );
    const { data } = response;
    dispatch(searchSuccess(data));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(searchError(message));
  }
};
