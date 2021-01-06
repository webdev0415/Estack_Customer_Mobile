import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import nav from '../../navigation/reducer';
import auth from './auth';
import user from './user';
import stores from './stores';
import transactions from './transactions';
import wallet from './wallet';
import coupons from './coupons';
import loader from './loader';

const reducer = combineReducers({
  form,
  nav,
  auth,
  user,
  stores,
  transactions,
  wallet,
  coupons,
  loader,
});

export default reducer;
