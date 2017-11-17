import { persistReducer } from 'redux-persist';
import localForage from 'localforage';
import types from './types';

/* State shape
{
  isLoading: bool,
  isAuthenticated: bool,
  error: string,
  token: string,
  refresh_token: string,
  user: {
    url: string,
    username: string,
    is_staff: boolean,
    public: boolean,
    timezone: string,
    server: integer,
  },
}
*/

const INITIAL_STATE = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
  token: null,
  refresh_token: null,
  user: null
};

const persistConfig = {
  key: 'auth',
  storage: localForage,
  whitelist: ['isAuthenticated', 'token', 'refresh_token', 'user']
};

const reducer = persistReducer(
  persistConfig,
  (state = INITIAL_STATE, { type: actionType, payload }) => {
    switch (actionType) {
      case types.LOGIN:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case types.LOGIN_COMPLETED:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: true,
          error: null,
          token: payload.token,
          refresh_token: payload.refresh_token,
          user: payload.user
        };
      case types.LOGIN_FAILED:
        return {
          ...state,
          isLoading: false,
          error: payload.error
        };
      case types.LOGOUT:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: false,
          error: null,
          token: null,
          refresh_token: null,
          user: null
        };
      case types.REFRESH_JWT:
        return state;
      case types.REFRESH_JWT_COMPLETED:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: true,
          error: null,
          token: payload.token,
          refresh_token: payload.refresh_token,
          user: payload.user
        };
      case types.REFRESH_JWT_FAILED:
        return {
          ...state,
          isLoading: false,
          error: payload
        };
      default:
        return state;
    }
  }
);

export default reducer;
