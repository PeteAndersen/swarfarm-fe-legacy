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
  user: null,
}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case types.LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGIN_COMPLETED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        token: action.payload.token,
        refresh_token: action.payload.refresh_token,
        user: action.payload.user,
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case types.LOGOUT:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        error: null,
        token: null,
        refresh_token: null,
        user: null,
      };
    case types.LOGOUT_COMPLETED:
      return {
        ...state,
        isLoading: false
      };
    case types.REFRESH_JWT:
      return {
        ...state,
        isLoading: true,
      };
    case types.REFRESH_JWT_COMPLETED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        token: action.payload.token,
        refresh_token: action.payload.refresh_token,
        user: action.payload.user,
      };
    case types.REFRESH_JWT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
