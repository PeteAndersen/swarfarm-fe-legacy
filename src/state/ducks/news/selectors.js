import { createSelector } from "reselect";

const isLoading = state => state.news.isLoading;
const getArticles = state => state.news.articles;
const getArticleCount = state => state.news.articleCount;
const getPage = state => state.news.page;
const getPageSize = state => state.news.pageSize;

const getArticlePage = createSelector(
  [getArticles, getPage, getPageSize],
  (articles, page, pageSize) => {
    const articleArray = Object.values(articles);

    return articleArray
      .sort((a, b) => {
        const aPublishedOn = new Date(a.created);
        const bPublishedOn = new Date(b.created);

        if (a.sticky === b.sticky) {
          return aPublishedOn > bPublishedOn ? -1 : 1;
        } else if (a.sticky) {
          return -1;
        } else {
          return 1;
        }
      })
      .slice((page - 1) * pageSize, page * pageSize);
  }
);

const getPageCount = createSelector(
  [getArticleCount, getPageSize],
  (numArticles, pageSize) => {
    return Math.ceil(numArticles / pageSize);
  }
);

export default {
  isLoading,
  getArticlePage,
  getPage,
  getPageSize,
  getPageCount
};
