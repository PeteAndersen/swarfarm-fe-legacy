import { createSelector } from "reselect";

const getArticles = state => state.news.articles;
const getPage = state => state.news.page;

const getNewsPage = createSelector([getArticles, getPage], (articles, page) => {
  const articleArray = Object.values(articles);

  return articleArray.sort((a, b) => {
    const aPublishedOn = new Date(a.created);
    const bPublishedOn = new Date(b.created);

    if (a.sticky === b.sticky) {
      return aPublishedOn > bPublishedOn ? -1 : 1;
    } else if (a.sticky) {
      return -1;
    } else {
      return 1;
    }
  });
});

export default {
  getNewsPage
};
