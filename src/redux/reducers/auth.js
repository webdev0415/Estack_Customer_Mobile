import { createReducer } from 'redux-act';
import { userSignedIn, userSignedOut, userSignedUp, saveTokenAction } from '../actions';

const initialState = {
  accessToken: null,
  refreshToken: null,
};

const authReducer = createReducer({
  [saveTokenAction]: (state, payload) => ({
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
  }),
  [userSignedIn]: (state, payload) => ({
    accessToken: payload.accessToken || state.accessToken,
    refreshToken: payload.refreshToken || state.refreshToken,
  }),
  [userSignedOut]: () => ({
    ...initialState,
  }),
}, initialState);

export default authReducer;
