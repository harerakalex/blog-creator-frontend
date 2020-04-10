/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import { toast } from 'react-toastify';
import * as starActionTypes from './StarRatinConstants';
import { BACKEND_URL } from '../../../app/common/config/appConfig';
import getSingleArticle from '../getSingleArticle/GetSingleArticleAction';

export const starRatingSuccess = message => ({
  type: starActionTypes.STAR_RATING_SUCCESS,
  payload: message
});
export const starRatingError = error => ({
  type: starActionTypes.STAR_RATING_ERROR,
  payload: error
});

export const starRating = (rate, id, slug) => async dispatch => {
  const rateData = {
    rate
  };
  const token = localStorage.getItem('token');
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  };
  try {
    const response = await axios.post(
      `${BACKEND_URL}/articles/${id}/rate`,
      rateData,
      axiosConfig
    );
    const { data } = response;
    const { message } = data;
    dispatch(starRatingSuccess(message));
    dispatch(getSingleArticle(slug));
  } catch (error) {
    const message = (await error.response)
      ? error.response.data.error
      : 'Something wrong';
    toast.error(message, { position: toast.POSITION.TOP_CENTER });
    dispatch(starRatingError(message));
  }
};
