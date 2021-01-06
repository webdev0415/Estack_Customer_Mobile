import { fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import userSaga from './userSaga';
import socketChanel from './socketChanel';

export default function* rootSaga(store) {
  yield fork(authSaga);
  yield fork(userSaga);
  yield fork(socketChanel, store);
};
