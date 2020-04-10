import axios from 'axios';
import { DELETE_ARTICLE_SUCCESS, DELETE_ARTICLE_FAIL } from '../constants';
import setAxiosConfig from '../../../app/common/config/axiosConfig';
import { BACKEND_URL } from '../../../app/common/config/appConfig';

const deleteArticle = slug => async dispatch => {
  try {
    await axios.delete(`${BACKEND_URL}/articles/${slug}`, setAxiosConfig());
    dispatch({
      type: DELETE_ARTICLE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: DELETE_ARTICLE_FAIL
    });
  }
};

export default deleteArticle;
