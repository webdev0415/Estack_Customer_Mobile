import { createAction } from 'redux-act';

export const getAvailableShopsAction = createAction('GET_AVAILABLE_SHOPS_ACTION');
export const setAvailableShopsAction = createAction('SET_AVAILABLE_SHOPS_ACTION');

export const getCurrentStoreAction = createAction('GET_CURRENT_STORE_ACTION');
export const setCurrentStoreAction = createAction('SET_CURRENT_STORE_ACTION');
export const clearCurrentStoreAction = createAction('CLEAR_CURRENT_STORE_ACTION');

export const getMyMemberShipsAction = createAction('GET_MY_MEMBER_SHIPS_ACTION');
export const setMyMemberShipsAction = createAction('SET_MY_MEMBER_SHIPS_ACTION');

export const joinToStoreAction = createAction('JOIN_TO_STORE_ACTION');