import { createAction } from 'redux-act';

export const getCouponsAction = createAction('GET_COUPONS_ACTION');
export const setCouponsAction = createAction('SET_COUPONS_ACTION');
export const createCouponAction = createAction('CREATE_COUPON_ACTION');
export const clearCouponsAction = createAction('CLEAR_COUPONS_ACTION');
export const redeemCouponAction = createAction('REDEEM_COUPON_ACTION');

export const updateCouponAction = createAction('UPDATE_COUPON_ACTION');

export const notificationAction = createAction('NOTIFICATION_ACTION');
