import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const INITIAL_STATE = { error: null, isAuthenticated: false, user: null}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: null, isAuthenticated: true, user: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    case UNAUTH_USER:
      return { ...state, error: null, isAuthenticated: false, user: null};
    default:
      return state;
  }
}
