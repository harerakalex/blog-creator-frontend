import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ARTICLES_SUCCESS, GET_ARTICLES_FAIL, LOADING } from '../constants';
import { BACKEND_URL } from '../../../app/common/config/appConfig';

const getAllArticles = (page) => async dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: true
    });
    const res = await axios.get(`${BACKEND_URL}/articles?page=${page}&limit=10`);

    dispatch({
      type: GET_ARTICLES_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const error = (await err.response)
      ? err.response.data.error
      : 'SERVER ERROR!  Please contact the administartor';
    dispatch({ type: GET_ARTICLES_FAIL, payload: error });
    toast.error(error, { position: toast.POSITION.TOP_CENTER });
  }
};

export default getAllArticles;
