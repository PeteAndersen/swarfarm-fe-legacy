import request from "services/api";

export default {
  getNewsList: () => {
    return request("get", "news/");
  }
};
