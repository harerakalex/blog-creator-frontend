import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_SINGLE_ARTICLE_SUCCESS,
  GET_SINGLE_ARTICLE_FAIL
} from '../constants';
import { BACKEND_URL } from '../../../app/common/config/appConfig';

const getSingleArticle = slug => async dispatch => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/articles/${slug}`);
    dispatch({
      type: GET_SINGLE_ARTICLE_SUCCESS,
      payload: data
    });
  } catch (err) {
    const error = (await err.response)
      ? err.response.data.error
      : 'SERVER ERROR!  Please contact the administartor';
    dispatch({ type: GET_SINGLE_ARTICLE_FAIL, payload: error });
    toast.error(error, { position: toast.POSITION.TOP_CENTER });
  }
};

export default getSingleArticle;
