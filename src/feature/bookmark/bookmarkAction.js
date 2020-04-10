import axios from 'axios';
import { toast } from 'react-toastify';
import setAxiosConfig from '../../app/common/config/axiosConfig';
import {
  BOOKMARK_SUCCESS,
  BOOKMARK_FAIL,
  UNBOOKMARK_SUCCESS,
  UNBOOKMARK_FAIL,
  GET_BOOKMARKS_SUCCESS,
  GET_BOOKMARKS_FAIL
} from './bookmarkTypes';
import { BACKEND_URL } from '../../app/common/config/appConfig';

export const getBookmarks = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/bookmarks`, setAxiosConfig()
    );

    dispatch({
      type: GET_BOOKMARKS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMessage = (await error.response) ? error.response.data.error : 'Network Error';
    toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    dispatch({ type: GET_BOOKMARKS_FAIL, payload: errorMessage });
  }
};

export const bookmarking = (slug) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/bookmarks/${slug}`, {}, setAxiosConfig()
    );

    dispatch({
      type: BOOKMARK_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMessage = (await error.response) ? error.response.data.error : 'Network Error';
    toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    dispatch({ type: BOOKMARK_FAIL, payload: errorMessage });
  }
};

export const unbookmark = (slug, articleId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${BACKEND_URL}/bookmarks/${slug}`, setAxiosConfig()
    );

    dispatch({
      type: UNBOOKMARK_SUCCESS,
      payload: { message: res.data.message, articleId },
    });
  } catch (error) {
    const errorMessage = (await error.response) ? error.response.data.error : 'Network Error';
    toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
    dispatch({ type: UNBOOKMARK_FAIL, payload: errorMessage });
  }
};
