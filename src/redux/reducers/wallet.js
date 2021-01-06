import { createReducer } from 'redux-act';
import { setWalletDataActions, userSignedOut } from '../actions';

const initialState = {
  pointsAmount: null,
  currencyAmount: null,
};

const walletReducer = createReducer({
  [setWalletDataActions]: (state, payload) => ({
    pointsAmount: payload.pointsAmount,
    currencyAmount: payload.currencyAmount,
  }),
  [userSignedOut]: () => ({
    ...initialState
  })
}, initialState);

export default walletReducer;
