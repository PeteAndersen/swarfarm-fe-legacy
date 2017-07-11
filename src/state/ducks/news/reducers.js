import types from "./types";

/* State shape
{
  isLoading: bool,
  error: string,
  page: integer,
  articles: {}
    id: {
      url: string,
      title: string,
      body: boolean,
      created: timestamp,
      sticky: boolean
    }
  }
}
*/

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  page: 1,
  articles: {}
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
        }, state.articles)
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
