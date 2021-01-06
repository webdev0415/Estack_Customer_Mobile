// Place here all endpoint addresses that app makes api calls to.
// for example:
// export const SIGN_UP_ENDPOINT = '/api/signup';
export const GET_VERIFY_ENDPOINT = '/auth/get-verify-email';
export const VERIFY_ENDPOINT = '/auth/verify-email';
export const APPLE_SIGN_UP_ENDPOINT = '/customer/singnup/apple/' // + token
export const APPLE_LOGIN_ENDPOINT = '/auth/apple/login/customer/'

export const SIGN_IN_ENDPOINT = '/auth/login/customer';
export const SIGN_UP_ENDPOINT = '/customer/signup';
export const TEST_AUTH_ENDPOINT = '';
export const REFRESH_ACCESS_TOKEN_ENPOINT = '/auth/refresh/customer';
export const USER_SELF_ENDPOINT = '/auth/self';
export const USER_CHANGE_PASSWORD_ENDPOINT = '/auth/reset-password/customer';
export const USER_DETAILS_ENDPOINT = '/customer/service';
export const GET_AVAILABLE_BUSINESSES_ENDPOINT = '/customer-tier/service/available-business';
export const GET_CURRENT_BUSINESS_ENDPOINT = '/customer-tier/service/business/'; //businessId
export const JOIN_USER_TO_STORE_ENDPOINT = '/customer-tier/service/join/'; //+storeId
export const GET_MY_MEMBERSHIPS_ENDPOINT = '/customer-tier/service/user-business';
export const CUSTOMER_WALLET_DATA_ENDPOINT = '/customer/service/wallet/data';
export const TRANSACTIONS_LOG_LIST_ENDPOINT = '/customer/service/transactions/logs-list';
export const TRANSACTION_TOTALS_ENDPOINT = '/customer/service/transactions/totals';

export const GET_COUPONS_LIST_ENDPOINT = '/coupon/service/coupons-list/'; //businessId;
export const CREATE_COUPON_ENDPOINT = '/coupon/service/create/'; //businessId;

export const REDEEM_COUPON_ENDPOINT = '/coupon/service/redeem/'; // + couponId;

export const GET_PASSWORD_ENDPOINT = '/auth/customer/get-password';

export const GOOGLE_SIGN_IN_ENDPOINT = '/auth/google/login/customer';
export const GOOGLE_SIGN_UP_ENDPOINT = '/customer/singnup/google/'; // + token

export const FACEBOOK_SIGN_IN_ENDPOIT = '/auth/fb/login/customer';
export const FACEBOOK_SIGN_UP_ENDPOINT = '/customer/singnup/fb/'; // + token

export const UPLOAD_IMAGE_ENDPOINT = '/customer/service/upload-avatar-image-customer';
