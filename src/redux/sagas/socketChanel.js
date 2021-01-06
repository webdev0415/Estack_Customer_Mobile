import {
  take,
  call,
  apply,
  fork,
  all,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as actions from '../actions';
import SocketIOClient from 'socket.io-client';
import { sendLocalNotification } from '../../utils/notification';

import * as endpoints from '../../constants/endpoints';

let SOCKET = null;

function createSocketChannel(socket, store) {
  return eventChannel((emit) => {
    const errorHandler = (errorEvent) => {
      console.log('errorHandler');
      emit(new Error(errorEvent));
    };

    const eventHandler = (event) => {
      console.log('event', event);
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(event);
    };

    socket.on('receiveFrom', eventHandler);
    socket.on('error', errorHandler);
    socket.on('connection');
    socket.on('COUPON_ACCEPTED', (coupon) => {
      store.dispatch(actions.updateCouponAction(coupon));
      store.dispatch(actions.notificationAction({ coupon, type: 'coupon'}));
    });
    socket.on('COUPON_DENIED', (coupon) => {
      store.dispatch(actions.updateCouponAction(coupon));
    });
    socket.on('POINT_GRANTED', (granted) => {
      store.dispatch(actions.notificationAction({
        title: 'Points war granted',
        text: `You have earned ${granted.points} points at ${granted.brandName}`,
        type: 'point',
      }));
      // sendLocalNotification({ title: 'Points war granted', text: `You have earned ${granted.points} points at ${granted.brandName}` });
      store.dispatch(actions.getWalletDataActions());
    });
    const unsubscribe = () => {
      socket.off('receiveFrom', eventHandler);
    };

    return unsubscribe;
  });
}

function* emitResponse(socket) {
  yield apply(socket, socket.emit, ['message received']);
}

function* watchSocketChannel(store) {
  if (!SOCKET) {
    SOCKET = yield call(SocketIOClient, 'http://estackk-api-lb-925393001.ap-southeast-1.elb.amazonaws.com', { transports: ['websocket'] });
    // SOCKET = yield call(SocketIOClient, 'http://134.249.227.172:8001', { transports: ['websocket'] });
    const socketChannel = yield call(createSocketChannel, SOCKET, store);
    while (true) {
      try {
        yield take(socketChannel);
        yield fork(emitResponse, SOCKET);
      } catch (err) {
        console.log('socket error: ', err);
        yield fork(watchSocketChannel);
      }
    }
  }
}

export default function* initSocket(store) {
  yield all([
    fork(watchSocketChannel, store),
  ]);
}
