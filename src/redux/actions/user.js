import { createAction } from 'redux-act';

export const setUserAction = createAction('SET_USER_ACTION');
export const clearUserAction = createAction('CLEAR_USER_ACTION');

export const getUserAction = createAction('GET_USER_ACTION');
export const getAuthSelfAction = createAction('GET_AUTH_SELF_ACTION');
export const changePasswordAction = createAction('RESET_PASSWORD_ACTION');

export const updateUserDetailsAction = createAction('UPDATE_USER_DETAILS_ACTION');
export const uploadImageAction = createAction('UPLOAD_IMAGE_ACTION');

export const setImageAction = createAction('SET_IMAGE_ACTION');

export const turnOnSpinnerAction = createAction('TURN_ON_SPINNER_ACTION');
export const turnOffSpinnerAction = createAction('TURN_OFF_SPINNER_ACTION');
