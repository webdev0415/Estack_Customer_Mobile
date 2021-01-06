import { createReducer } from 'redux-act';
import { setCouponsAction, clearCouponsAction, updateCouponAction } from '../actions';

const initialState = {
  coupons: null,
};

const couponsReducer = createReducer({
  [setCouponsAction]: (state, payload) => ({
    coupons: payload,
  }),
  [updateCouponAction]: (state, payload) => ({
    coupons: [...state.coupons.map((item) => item._id === payload._id ? payload : item)],
  }),
  [clearCouponsAction]: (state, payload) => ({
    ...initialState,
  })
}, initialState);

export default couponsReducer;
