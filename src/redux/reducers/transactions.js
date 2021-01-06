import { createReducer } from 'redux-act';
import { userSignedOut, setTransactionsAction, setTransactionTotalsAction } from '../actions';

const initialState = {
  transactions: null,
  earned: null,
  spent: null,
};

const authReducer = createReducer({
  [setTransactionsAction]: (state, payload) => ({
    ...state,
    transactions: payload,
  }),
  [setTransactionTotalsAction]: (state, payload) => ({
    ...state,
    earned: payload.earned,
    spent: payload.spent,
  }),
  [userSignedOut]: () => ({
    ...initialState,
  }),
}, initialState);

export default authReducer;
