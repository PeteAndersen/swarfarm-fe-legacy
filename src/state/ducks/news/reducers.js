import { REHYDRATE } from "redux-persist/constants";
import types from "./types";

/* State shape
{
  isLoading: bool,
  error: string,
  articles: [
    {
      url: string,
      username: string,
      is_staff: boolean,
      public: boolean,
      timezone: string,
      server: integer,
    }
  ]
}
*/

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  articles: []
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
        articles: payload.results
      };
    case types.GET_NEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.errorMessage
      };
    default:
      return state;
  }
}
