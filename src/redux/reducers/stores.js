import { createReducer } from 'redux-act';
import {
  setAvailableShopsAction,
  setCurrentStoreAction,
  clearCurrentStoreAction,
  setMyMemberShipsAction,
  userSignedOut,
} from '../actions';

const initialState = {
  availableShops: null,
  currentShop: null,
  myMemberShips: null,
};

const storesReducer = createReducer({
  [setAvailableShopsAction]: (state, payload) => ({
    ...state,
    availableShops: payload
  }),
  [setCurrentStoreAction]: (state, payload) => ({
    ...state,
    currentShop: payload,
  }),
  [clearCurrentStoreAction]: (state, payload) => ({
    ...state,
    currentShop: null,
  }),
  [setMyMemberShipsAction]: (state, payload) => ({
    ...state,
    myMemberShips: payload,
  }),
  [userSignedOut]: (state, payload) => ({
    ...initialState,
  })
}, initialState);

export default storesReducer;
