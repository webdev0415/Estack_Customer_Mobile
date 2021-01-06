import { createAction } from 'redux-act';

export const getTransactionsAction = createAction('GET_TRANSACTIONS_ACTION');
export const setTransactionsAction = createAction('SET_TRANSACTIONS_ACTION');

export const getTransactionTotalsAction = createAction('GET_TRANSACTIN_TOTALS_ACTIONS');
export const setTransactionTotalsAction = createAction('SET_TRANSACTION_TOTALS_ACTION');
