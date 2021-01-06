import { AsyncStorage } from 'react-native'
import { StackActions } from 'react-navigation';
import { put as sagaPut, call, select, all } from 'redux-saga/effects';

import api from '../../utils/axios';
import * as endpoints from '../../constants/endpoints';
import * as actions from '../actions';

const Authorization = (token) => ({
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

function* updateAccessTokenByRefresh(payload) {
  const refreshToken = yield AsyncStorage.getItem('refreshToken');

  try {
    const { endpoint, request, data, options } = payload;
    const { data: token }  = yield call(api.post, endpoints.REFRESH_ACCESS_TOKEN_ENPOINT, { token: refreshToken });
    yield AsyncStorage.setItem('accessToken', token.accessToken);
    return request === 'get'
    ? yield call(api[request], endpoint, Authorization(token.accessToken) )
    : yield call(api[request], endpoint, data || {}, options || {}, Authorization(token.accessToken));
  } catch (error) {
    console.log('updateAccessTokenByRefresh', error)
    if (error.request.status === 401) {
      yield sagaPut(actions.signOutAction());
    }
  }
}

export function* get(endpoint, options) {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    return yield call(api.get, endpoint, Authorization(accessToken));

  } catch (error) {
    console.log('getError', error)
    if (error.request.status === 401)
      return yield updateAccessTokenByRefresh({ request: 'get', endpoint, options });
  } 
};

export function* post(endpoint, data, options) {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    return yield call(api.post, endpoint, data, options || {}, Authorization(accessToken));
  } catch (error) {
    if (error.request.status === 401)
      return yield updateAccessTokenByRefresh({ request: 'post', endpoint, data, options })
  }
};

export function* put(endpoint, data, options) {
  const accessToken = yield AsyncStorage.getItem('accessToken');

  try {
    return yield call(api.put, endpoint, data || {}, options || {}, Authorization(accessToken));
  } catch (error) {
    if (error.request.status === 401)
      return yield updateAccessTokenByRefresh({ request: 'put', endpoint, data, options })
  }
};

export function* patch(endpoint, data, options) {
  const accessToken = yield AsyncStorage.getItem('accessToken');
  try {
    const data = yield call(api.patch, endpoint, data, Authorization(accessToken));
    if (data) return data;
  } catch (error) {
    if (error.request.status === 401)
      return yield updateAccessTokenByRefresh({ request: 'patch', endpoint, data, options })

    if (error.request.status === 403)
      alert('Wrong current password!');
    
    console.log('ERROR', error)
  }
}