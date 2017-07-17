import types from "./types";

/* State shape
{
  isLoading: bool,
  error: string,
  page: integer,
  pageSize: integer,
  articles: {}
    id: {
      url: string,
      title: string,
      body: boolean,
      created: timestamp,
      sticky: boolean
    }
  },
  articleCount: integer,
}
*/

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  page: 1,
  pageSize: 0,
  articles: {},
  articleCount: 0
};

export default function(state = INITIAL_STATE, { type: actionType, payload }) {
  switch (actionType) {
    case types.GET_NEWS:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.GET_NEWS_COMPLETED:
      return {
        ...state,
        isLoading: false,
        error: null,
        articles: payload.articles.reduce((allArticles, article) => {
          allArticles[article.id] = article;
          return allArticles;
        }, Object.assign({}, state.articles)),
        articleCount: payload.count,
        // Set pageSize to match how many items server returns
        pageSize:
          payload.articles.length > state.pageSize
            ? payload.articles.length
            : state.pageSize
      };
    case types.GET_NEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.errorMessage
      };
    case types.CHANGE_PAGE:
      return {
        ...state,
        page: payload.page
      };
    default:
      return state;
  }
}
