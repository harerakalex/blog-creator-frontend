import { config } from 'dotenv';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UPDATE_ARTICLE_SUCCESS, UPDATE_ARTICLE_FAIL } from '../constants';
import { BACKEND_URL } from '../../../app/common/config/appConfig';
import setAxiosConfig from '../../../app/common/config/axiosConfig';

config();

const updateArticle = (
  {
    title, description, tags, category, body
  },
  slug
) => async dispatch => {
  const formData = {};
  formData.tags = tags || ' ';
  formData.category = category || ' ';
  formData.title = title;
  formData.description = description;
  formData.body = body;

  try {
    const res = await axios.put(
      `${BACKEND_URL}/articles/${slug}`,
      formData,
      setAxiosConfig()
    );
    dispatch({
      type: UPDATE_ARTICLE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const error = (await err.response)
      ? err.response.data.error
      : 'SERVER ERROR!  Please contact the administartor';
    dispatch({ type: UPDATE_ARTICLE_FAIL, payload: error });
    toast.error(error, { position: toast.POSITION.TOP_CENTER });
  }
};
export default updateArticle;
