import request from "services/api";

const getNews = () => {
  return request("get", "news/");
};

const getArticle = postID => {
  return request("get", `news/${postID}`);
};

export default {
  getNews,
  getArticle
};
