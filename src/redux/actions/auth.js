import { createAction } from 'redux-act';

export const getVerifyAction = createAction('GET_VERIFY_ACTION');
export const verifyAction = createAction('VERIFY_ACTION');

export const signUpAction = createAction('SIGN_UP');
export const userSignedUp = createAction('USER_SIGNED_UP');
export const signUpRequestFailedAction = createAction('SIGN_UP_REQUEST_FAILED');

export const signInAction = createAction('SIGN_IN');
export const userSignedIn = createAction('USER_SIGNED_IN');
export const signInRequestFailedAction = createAction('SIGN_IN_REQUEST_FAILED');

export const signOutAction = createAction('SIGN_OUT');
export const userSignedOut = createAction('USER_SIGNED_OUT');

export const initHeaderAction = createAction('INIT_HEADER');

export const accessTokenUpdatedAction = createAction('ACCESS_TOKEN_UPDATED');

export const testAuthAction = createAction('TEST_AUTH');
export const testAuthRequestFailedAction = createAction('TEST_AUTH_FAILED');
export const saveTokenAction = createAction('SAVE_TOKEN_ACTION');

export const sendOtpEmailAction = createAction('SEND_OTP_EMAItL_ACTION');

export const googleSignInAction = createAction('GOOGLE_SIGN_IN_ACTION');
export const instagramSignInAction = createAction('INSTAGRAM_SIGN_IN_ACTION');
export const facebookSignInAction = createAction('FACEBOOK_SIGN_IN_ACTION');

export const googleSignUpAction = createAction('GOOGLE_SIGN_UP_ACTION');
export const instagramSignUpAction = createAction('INSTAGRAM_SIGN_UP_ACTION');
export const facebookSignUpAction = createAction('FACEBOOK_SIGN_UP_ACTION');
export const appleSignUpAction = createAction('APPLE_SIGN_IN_ACTION');
export const appleLoginAction = createAction('APPLE_LOGIN_ACTION');
