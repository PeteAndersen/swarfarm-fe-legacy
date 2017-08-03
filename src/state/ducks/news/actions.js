import types from './types';

const getNews = page => ({
  type: types.GET_NEWS,
  payload: {
    page,
  },
});

const getNewsSuccess = (articles, count) => ({
  type: types.GET_NEWS_COMPLETED,
  payload: {
    articles,
    count,
  },
});

const getNewsFailed = errors => ({
  type: types.GET_NEWS_FAILED,
  payload: {
    ...errors,
  },
});

const changePage = page => ({
  type: types.CHANGE_PAGE,
  payload: {
    page,
  },
});

export default {
  getNews,
  getNewsFailed,
  getNewsSuccess,
  changePage,
};
