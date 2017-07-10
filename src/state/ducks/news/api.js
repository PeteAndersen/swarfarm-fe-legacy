import request from "services/api";

const getNews = (page = null) => {
  let endpoint = "news/";

  if (page) {
    endpoint += `?page=${page}`;
  }
  return request("get", endpoint);
};

const getArticle = postID => {
  return request("get", `news/${postID}`);
};

export default {
  getNews,
  getArticle
};
