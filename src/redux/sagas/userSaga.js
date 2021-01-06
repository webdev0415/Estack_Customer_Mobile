import {
  put,
  call,
  all,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { Alert } from 'react-native';
import { StackActions } from 'react-navigation';
import _, { take } from 'lodash';
import moment from 'moment';
import geolocation from '@react-native-community/geolocation'

import * as endpoints from '../../constants/endpoints';
import api from '../../utils/axios';
import * as actions from '../actions';
import { AsyncStorage } from 'react-native';

import { sendLocalNotification } from '../../utils/notification';

const Authorization = (token) => ({
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const userId = state => state.user.userId;
const isNotifications = state => state.user.notifications;

function* updateAccessTokenByRefresh(payload) {
  const refreshToken = yield AsyncStorage.getItem('refreshToken');

  try {
    const { next, pl } = payload;
    
    const { data } = yield call(api.post, endpoints.REFRESH_ACCESS_TOKEN_ENPOINT, { token: refreshToken });

    yield all([
      AsyncStorage.setItem('accessToken', data.accessToken),
      next({payload: pl}),
    ]);
  } catch (error) {
    console.log('updateAccessTokenByRefreshError', error);
    if (error.request.status === 401) {
      yield all([
        AsyncStorage.multiRemove(['accessToken', 'refreshToken']),
        put(StackActions.push({ routeName: 'Login' })),
      ])
    } else {
      yield all([
        AsyncStorage.multiRemove(['accessToken', 'refreshToken']),
        put(StackActions.push({ routeName: 'Login' })),
      ])
    }
  }
}

function* getAuthSelf() {
  const accessToken = yield AsyncStorage.getItem('accessToken');
  
  try {
    const { data } = yield call(api.get, endpoints.USER_SELF_ENDPOINT, Authorization(accessToken));

    yield all([
      getUserDetails({ _id: data._id }),
      put(StackActions.replace({ routeName: 'Main' })),
    ]);
  } catch (error) {
    console.log('getAuthSelf', error)
    if (error.request.status === 401 || error.request.status === 404 ) yield updateAccessTokenByRefresh({ next: getAuthSelf });
  }
}

function* getUserDetails(payload) {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    const { _id } = payload;
    const { data } = yield call(api.get, `${endpoints.USER_DETAILS_ENDPOINT}/${_id}`, Authorization(accessToken))

    yield put(actions.setUserAction(data));
  } catch (error) {
    console.log('getUserDetailsError', error);
    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: getAuthSelf });
  }
}

function* changePassword({ payload }) {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    const { data } = yield call(api.patch, endpoints.USER_CHANGE_PASSWORD_ENDPOINT, payload, Authorization(accessToken));
    yield all([
      AsyncStorage.multiSet([['accessToken', data.accessToken],['refreshToken', data.refreshToken]]),
      yield getAuthSelf(),
    ]);
    alert('Password changed successfully.');
  } catch (error) {
    if (error.request.status === 403)
      alert('Wrong current password!');
      
    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: changePassword });
  }
};

function* updateUserDetails({ payload }) {
  const accessToken = yield AsyncStorage.getItem('accessToken');
  const _id = yield select(userId);

  try {
    const { data } = yield call(api.patch, endpoints.USER_DETAILS_ENDPOINT, payload, Authorization(accessToken));
    yield put(actions.setUserAction(data));
  } catch (error) {
    console.log('errorUpdateUserDetails', error);

    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: updateUserDetails, pl: payload });
  }
};

function* getAvailableShops() {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    const { data } = yield call(api.get, endpoints.GET_AVAILABLE_BUSINESSES_ENDPOINT, Authorization(accessToken));

    yield put(actions.setAvailableShopsAction(data));
  } catch (error) {
    console.log('getAvailableShopsError', error);

    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: getAvailableShops });
  }
};

function* getCurrentStoreInfo({ payload }) {
  const accessToken = yield AsyncStorage.getItem('accessToken');
  const { _id } = payload;
  
  try {
    const { data } = yield call(api.get, `${endpoints.GET_CURRENT_BUSINESS_ENDPOINT}${_id}`, Authorization(accessToken));
    let currentShop = data;
    if (_.isEmpty(data.customerTier)) {
      currentShop = _.omit(data, 'customerTier');
    }
    yield put(actions.setCurrentStoreAction(currentShop));
  } catch (error) {
    console.log('getCurrentStoreInfo', error);

    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: getAvailableShops, pl: payload });

  }
};

function* joinUserToStore({ payload }) {
  const accessToken = yield AsyncStorage.getItem('accessToken');
  const { _id } = payload;

  try {
    yield call(api.put, `${endpoints.JOIN_USER_TO_STORE_ENDPOINT}${_id}`, {}, Authorization(accessToken));
    const { data } = yield call(api.get, `${endpoints.GET_CURRENT_BUSINESS_ENDPOINT}${_id}`, Authorization(accessToken));
    
    yield put(actions.setCurrentStoreAction(data));

    yield all([
      getMyMemberShips(),
      getAvailableShops(),
    ])
  } catch (error) {
    console.log('joinUserToStoreError', error);

    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: joinUserToStore, pl: payload });

  }
};

function* getMyMemberShips() {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    const { data } = yield call(api.get, endpoints.GET_MY_MEMBERSHIPS_ENDPOINT, Authorization(accessToken));

    yield put(actions.setMyMemberShipsAction(data));
  } catch (error) {
    console.log('getMyMemberShipsError', error);

    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: getMyMemberShips });
  }
};

function* getTransactions({ payload }) {
  const accessToken = yield AsyncStorage.getItem('accessToken');
  
  try {
    const { from, to, type } = payload;

    const start = from.trim() !== '' ? `start=${moment(from).unix()}` : '';
    const end = to.trim() !== '' ? `&end=${moment(to).unix()}` : '';
    let typeCase = '';
    switch (type) {
      case 'Redeemed':
        typeCase = '&type=COUPON_CREATED';
        break;
      case 'Earned':
        typeCase = '&type=POINTS_EARNED'
      default: typeCase = '';
    }

    const { data } = yield call(api.get, `${endpoints.TRANSACTIONS_LOG_LIST_ENDPOINT}?${start}${end}${typeCase}` , Authorization(accessToken));
    yield put(actions.setTransactionsAction(data));
  } catch (error) {
    console.log('getTransactionsActionsError', error);

    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: getTransactions });
  }
};

function* getWalletData() {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    const { data } = yield call(api.get, endpoints.CUSTOMER_WALLET_DATA_ENDPOINT, Authorization(accessToken));
    yield put(actions.setWalletDataActions(data));
  } catch (error) {
    console.log('getWalletDataError', error);

    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: getWalletData });
  }
};

function* getTransactionTotals() {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    const { data } = yield call(api.get, endpoints.TRANSACTION_TOTALS_ENDPOINT, Authorization(accessToken));
    yield put(actions.setTransactionTotalsAction(data));
  } catch (error) {
    console.log('getTransactionTotalsError', error);

    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: getTransactionTotals });
  }
};

function* getCoupons({ payload }) {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    const { businessId } = payload;

    const { data: coupons } = yield call(api.get, `${endpoints.GET_COUPONS_LIST_ENDPOINT}${businessId}`, Authorization(accessToken));
    yield put(actions.setCouponsAction(coupons));
    
  } catch (error) {
    console.log('createCouponError', error);

    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: getCoupons, pl: payload });
  }
}

function* createCoupon({ payload }) {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    const { businessId, cost } = payload;
    alert('Wait please, we creating your coupon ')

    yield call(api.post,`${endpoints.CREATE_COUPON_ENDPOINT}${businessId}`, { cost }, Authorization(accessToken)),
    yield put(actions.getCurrentStoreAction({ _id: businessId }));
    yield put(actions.getCouponsAction({ businessId }));
    yield put(actions.getWalletDataActions());
    yield put(actions.getMyMemberShipsAction());
    
    setTimeout(() => alert('Coupon was created!'), 100)
  } catch (error) {
    console.log('createCouponError', error);
    alert('Your coupon wasn`t create(')
    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: createCoupon, pl: payload });
    
    if (error.request.status === 404) {
      Alert.alert('Failed', 'Looks like business is not active now. Try again later(');
    }
  }
};

function* redeemCoupon({ payload }) {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    const { _id, coords } = payload;
    //test coords { lat: "37.775316", lng: "-122.4196261" }

    const { data } = yield call(api.put, `${endpoints.REDEEM_COUPON_ENDPOINT}${_id}`, coords, Authorization(accessToken));
    yield put(actions.updateCouponAction(data));

  } catch (error) {
    console.log('redeemCouponError', error);

    if (error.request.status === 400)
      Alert.alert('Hm...', 'Looks like you`re too far from pos.');

    if (error.request.status === 401)
      yield updateAccessTokenByRefresh({ next: createCoupon, pl: payload });

    if (error.request.status === 404) {
      Alert.alert('Failed', 'Looks like business is not active now. Try again later(');
    }

    if (error.request.status === 500)
      Alert.alert('Hm...', 'Can not redeem coupon. Try again later.');
  }
};

function* sendEmail({ payload }) {
  try {
    const { email, cb } = payload;
    yield put(actions.turnOnSpinnerAction());
    const { data } = yield call(api.post, endpoints.GET_PASSWORD_ENDPOINT, { email });

    if (data === true) {
      yield put(actions.turnOffSpinnerAction());
      if (cb) yield put(StackActions.push({ routeName: 'Otp', params: { email }, }));
    } else {
      yield put(actions.turnOffSpinnerAction());
      setTimeout(() => Alert.alert('Ooops...', 'Can not find your email. Check it, please, and try again.'), 0);
    }
  } catch (error) {
    console.log('sendEmailError', error);
    yield put(actions.turnOffSpinnerAction());
    if (error.request.status === 500)
      Alert.alert('Error', 'Server doesn`t work now. Try again later.');
    
    if (error.request.status === 401) {
      setTimeout(() => Alert.alert('Failed', 'You are not a customer'), 0)
    }
  } finally {
    yield put(actions.turnOffSpinnerAction());
  }
}

function* uploadImage({ payload }) {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    const { formData } = payload
    const { data } = yield call(api.post, endpoints.UPLOAD_IMAGE_ENDPOINT, formData, Authorization(accessToken));
    yield put(actions.setImageAction(data.image));
    // Alert.alert('Success', 'Reload your app to see new avatar');
  } catch (error) {
    console.log('ERRORRRR', error);
    if (error.request.status === 401)
    yield updateAccessTokenByRefresh({ next: createCoupon, pl: payload });

  }
};

function* notification({ payload }) {
  const accessToken = yield AsyncStorage.getItem('accessToken');
  const nots = yield select(isNotifications);

  try {
    if (nots === true) {
      if (payload.type === 'coupon') {
        const { data } = yield call(api.get, `${endpoints.GET_CURRENT_BUSINESS_ENDPOINT}${payload.coupon.businessId}`, Authorization(accessToken));
        sendLocalNotification({ title: 'Coupon approved', text: `You have successfully redeemed coupon at ${data.business.brandName}` });  
      } else {
        sendLocalNotification({ title: payload.title, text: payload.text });  
      }
    }
  } catch (error) {
    console.log(error);

    if (error.request.status === 401)
    yield updateAccessTokenByRefresh({ next: notification, pl: payload });

  }
}

export default function* authSagas() {
  geolocation.setRNConfiguration({ skipPermissionRequests: false });

  yield all([
    takeLatest(actions.getUserAction, getAuthSelf),
    takeLatest(actions.changePasswordAction, changePassword),
    takeLatest(actions.updateUserDetailsAction, updateUserDetails),
    takeLatest(actions.getAvailableShopsAction, getAvailableShops),
    takeLatest(actions.getCurrentStoreAction, getCurrentStoreInfo),
    takeLatest(actions.joinToStoreAction, joinUserToStore),
    takeLatest(actions.getMyMemberShipsAction, getMyMemberShips),
    takeLatest(actions.getTransactionsAction, getTransactions),
    takeLatest(actions.getWalletDataActions, getWalletData),
    takeLatest(actions.getTransactionTotalsAction, getTransactionTotals),
    takeLatest(actions.createCouponAction, createCoupon),
    takeLatest(actions.getCouponsAction, getCoupons),
    takeLatest(actions.redeemCouponAction, redeemCoupon),
    takeLatest(actions.sendOtpEmailAction, sendEmail),
    takeLatest(actions.uploadImageAction, uploadImage),
    takeLatest(actions.notificationAction, notification),
  ]);
};