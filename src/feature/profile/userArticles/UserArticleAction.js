import axios from 'axios';
import * as articleTypes from './userArticleTypes';
import { BACKEND_URL } from '../../../app/common/config/appConfig';

export const fetchArticleSuccess = (articles) => ({
  type: articleTypes.FETCH_ARTICLE_SUCCESS,
  articles,
});

export const fetchArticleFail = (error) => ({
  type: articleTypes.FETCH_ARTICLE_FAIL,
  error,
});

export const articleLoading = () => ({
  type: articleTypes.FETCH_ARTICLE_LOADING,
});

export const fetchArticles = (author) => async (dispatch) => {
  try {
    dispatch(articleLoading());
    const res = await axios
      .get(`${BACKEND_URL}/articles?author=${author}`);
    dispatch(fetchArticleSuccess(res.data.articles));
  } catch (err) {
    const error = (await err.response)
      ? err.response.data.error
      : 'Something went wrong';
    dispatch(fetchArticleFail(error));
  }
};
