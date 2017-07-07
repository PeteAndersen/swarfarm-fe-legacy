import types from "./types";

const getNews = () => ({
  type: types.GET_NEWS,
  payload: {
    username,
    password
  }
});

const getNewsSuccess = articles => ({
  type: types.GET_NEWS_COMPLETED,
  payload: {
    articles
  }
});

const getNewsFailed = errors => ({
  type: types.GET_NEWS_FAILED,
  payload: {
    ...errors
  }
});

export default {
  getNews,
  getNewsFailed,
  getNewsSuccess
};
