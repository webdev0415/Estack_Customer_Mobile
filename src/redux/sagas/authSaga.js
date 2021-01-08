import { put, call, all, takeLatest } from "redux-saga/effects";
import { Alert } from "react-native";
import { StackActions } from "react-navigation";
import { GoogleSignin } from "@react-native-community/google-signin";

import * as endpoints from "../../constants/endpoints";
import api from "../../utils/axios";
import * as actions from "../actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

function* signUp({ payload }) {
  try {
    yield put(actions.turnOnSpinnerAction());
    const { data } = yield call(api.post, endpoints.SIGN_UP_ENDPOINT, payload);
    yield all([
      AsyncStorage.setItem("accessToken", data.accessToken),
      AsyncStorage.setItem("refreshToken", data.refreshToken),
      put(actions.saveTokenAction(data)),
      put(actions.getUserAction()),
      put(actions.turnOffSpinnerAction()),
      put(StackActions.replace({ routeName: "Root" }))
    ]);
  } catch (error) {
    console.log("signUp error>", error);
    yield put(actions.turnOffSpinnerAction());

    if (error.request.status === 400) alert("This email exists already");
    if (error.request.status === 409) alert("This email exists already");
  } finally {
    yield put(actions.turnOffSpinnerAction());
  }
}

function* signIn({ payload }) {
  try {
    yield put(actions.turnOnSpinnerAction());

    const { data } = yield call(api.post, endpoints.SIGN_IN_ENDPOINT, payload);
    yield all([
      AsyncStorage.setItem("accessToken", data.accessToken),
      AsyncStorage.setItem("refreshToken", data.refreshToken),
      put(actions.saveTokenAction(data)),
      put(actions.getUserAction()),
      put(actions.turnOffSpinnerAction())
    ]);

    if (payload.cb) payload.cd();
  } catch (error) {
    if (payload.cb) payload.cd();
    yield put(actions.turnOffSpinnerAction());
    console.log("signInError", error);

    if (error.request.status === 401)
      setTimeout(() => Alert.alert("Hm...", "Incorrect password"), 0);
    if (error.request.status === 404)
      setTimeout(() =>
        Alert.alert("Ooops!", "User with such email was not found")
      );
  }
}

function* logOut() {
  try {
    yield all([
      GoogleSignin.revokeAccess(),
      GoogleSignin.signOut(),
      AsyncStorage.removeItem("accessToken"),
      AsyncStorage.removeItem("refreshToken"),
      put(actions.userSignedOut()),
      put(actions.clearCouponsAction()),
      put(
        StackActions.push({
          routeName: "Login"
        })
      )
    ]);
  } catch (error) {
    console.log("logOutError>", error);
  }
}

function* googleSignIn({ payload }) {
  try {
    const { data } = yield call(
      api.post,
      endpoints.GOOGLE_SIGN_IN_ENDPOINT,
      payload
    );
    setTimeout(() => alert("Success"), 0);
    yield all([
      AsyncStorage.setItem("accessToken", data.accessToken),
      AsyncStorage.setItem("refreshToken", data.refreshToken),
      put(actions.saveTokenAction(data)),
      put(actions.getUserAction())
    ]);
  } catch (error) {
    console.log("googleSignInError", error);

    if (error.request.status === 401) {
      yield GoogleSignin.revokeAccess();
      yield GoogleSignin.signOut();
      setTimeout(
        () =>
          Alert.alert(
            "Hm...",
            "Some conflicts with your google account. Try to login."
          ),
        0
      );
    }

    if (error.request.status === 404)
      setTimeout(() =>
        Alert.alert("Ooops!", "User with such email was not found")
      );
  }
}

function* googleSignUp({ payload }) {
  try {
    const { token, fullName } = payload;

    const { data } = yield call(
      api.post,
      `${endpoints.GOOGLE_SIGN_UP_ENDPOINT}${token}`,
      { fullName }
    );
    setTimeout(() => alert("Success"), 0);

    yield all([
      AsyncStorage.setItem("accessToken", data.accessToken),
      AsyncStorage.setItem("refreshToken", data.refreshToken),
      put(actions.saveTokenAction(data)),
      put(actions.getUserAction())
    ]);
  } catch (error) {
    console.log("googleSignUpError", error);

    if (error.request.status === 409) {
      yield GoogleSignin.revokeAccess();
      yield GoogleSignin.signOut();
      setTimeout(() => alert("This email exists already"));
    }
  }
}

function* googleAuth({ payload }) {
  function cb() {
    StackActions.push({ routeName: "Otp", params: { email: payload.email } });
  }

  try {
    yield put(actions.turnOnSpinnerAction());
    const { data } = yield call(
      api.post,
      endpoints.GOOGLE_SIGN_IN_ENDPOINT,
      payload
    );
    setTimeout(() => alert("Success"), 0);
    yield all([
      AsyncStorage.setItem("accessToken", data.accessToken),
      AsyncStorage.setItem("refreshToken", data.refreshToken),
      put(actions.saveTokenAction(data)),
      put(actions.getUserAction()),
      put(actions.turnOffSpinnerAction())
    ]);
  } catch (error) {
    if (error.request.status === 400) {
      setTimeout(
        () =>
          Alert.alert(
            "Failed",
            "Google creds is not valid or google services is unavailable"
          ),
        0
      );
      yield put(actions.turnOffSpinnerAction());
    }
    if (error.request.status === 409) {
      yield GoogleSignin.revokeAccess();
      yield GoogleSignin.signOut();
      yield put(actions.turnOffSpinnerAction());
      yield put(actions.sendOtpEmailAction({ email: payload.email, cb }));
    }
    if (error.request.status === 401) {
      setTimeout(() => Alert.alert("Failed", "You are not a customer"), 0);
      yield put(actions.turnOffSpinnerAction());
    }
    if (error.request.status === 404) {
      try {
        const { data } = yield call(
          api.post,
          `${endpoints.GOOGLE_SIGN_UP_ENDPOINT}${payload.token}`,
          { fullName: payload.fullName }
        );

        yield all([
          AsyncStorage.setItem("accessToken", data.accessToken),
          AsyncStorage.setItem("refreshToken", data.refreshToken),
          put(actions.saveTokenAction(data)),
          put(actions.getUserAction()),
          put(actions.turnOffSpinnerAction())
        ]);
      } catch (error) {
        if (error.request.status === 400) {
          setTimeout(
            () =>
              Alert.alert(
                "Failed",
                "Google creds is not valid or google services is unavailable"
              ),
            0
          );
          yield put(actions.turnOffSpinnerAction());
        }
        if (error.request.status === 409) {
          yield GoogleSignin.revokeAccess();
          yield put(actions.turnOffSpinnerAction());
          yield GoogleSignin.signOut();
          yield put(actions.sendOtpEmailAction({ email: payload.email, cb }));
        }
      }
    }
  } finally {
    yield put(actions.turnOffSpinnerAction());
  }
}

function* facebookSignIn({ payload }) {
  try {
    yield put(actions.turnOnSpinnerAction());
    const { data } = yield call(
      api.post,
      endpoints.FACEBOOK_SIGN_IN_ENDPOIT,
      payload
    );
    yield all([
      AsyncStorage.setItem("accessToken", data.accessToken),
      AsyncStorage.setItem("refreshToken", data.refreshToken),
      put(actions.saveTokenAction(data)),
      put(actions.getUserAction()),
      put(actions.turnOffSpinnerAction())
    ]);
  } catch (error) {
    console.log("facebookSignInError", error);
    yield put(actions.turnOffSpinnerAction());

    if (error.request.status === 401)
      setTimeout(
        () =>
          Alert.alert(
            "Hm...",
            "Some conflicts with your google account. Try to login."
          ),
        0
      );
    if (error.request.status === 404)
      setTimeout(() =>
        Alert.alert("Ooops!", "User with such email was not found")
      );
  }
}

function* facebookSignUp({ payload }) {
  try {
    const { token, fullName } = payload;

    const { data } = yield call(
      api.post,
      `${endpoints.FACEBOOK_SIGN_UP_ENDPOINT}${token}`,
      { fullName }
    );

    yield all([
      AsyncStorage.setItem("accessToken", data.accessToken),
      AsyncStorage.setItem("refreshToken", data.refreshToken),
      put(actions.saveTokenAction(data)),
      put(actions.getUserAction())
    ]);
  } catch (error) {
    console.log("facebookSignUpError", error);

    if (error.request.status === 401)
      setTimeout(
        () =>
          Alert.alert(
            "Hm...",
            "Some conflicts with your facebook account. Try to login."
          ),
        0
      );
    if (error.request.status === 404)
      setTimeout(
        () =>
          Alert.alert(
            "Ooops...",
            "Please, add email to your facebook account."
          ),
        0
      );
    if (error.request.status === 409)
      setTimeout(() => alert("This email exists already"));
  }
}

function* getVerify({ payload }) {
  try {
    yield put(actions.turnOnSpinnerAction());
    yield call(api.post, endpoints.GET_VERIFY_ENDPOINT, payload);
    yield put(
      StackActions.push({
        routeName: "RegisterOtp",
        params: { email: payload.email, fullName: payload.fullName }
      })
    );
  } catch (error) {
    if (error.request.status === 409)
      setTimeout(
        () => Alert.alert("Failed", "This email is already exists"),
        100
      );
  } finally {
    yield put(actions.turnOffSpinnerAction());
  }
}

function* verify({ payload }) {
  try {
    yield put(actions.turnOnSpinnerAction());
    const { data } = yield call(api.post, endpoints.VERIFY_ENDPOINT, payload);
    if (data) {
      yield put(
        actions.signUpAction({
          code: data,
          email: payload.email,
          fullName: payload.fullName
        })
      );
    }
    console.log(data);
  } catch (error) {
    yield put(actions.turnOffSpinnerAction());
    if (error.request.status === 401) Alert.alert("Failed", "Wrong password");
  }
}

function* appleSignUp({ payload }) {
  try {
    yield put(actions.turnOffSpinnerAction());
    // const { data } = yield call(
    //   api.post,
    //   `${endpoints.APPLE_SIGN_UP_ENDPOINT}${payload.identityToken}`,
    //   {
    //     fullName: `${payload.fullName.givenName} ${payload.fullName.familyName}`
    //   }
    // );

    // const { data } = yield call(
    //   api.post,
    //   endpoints.APPLE_LOGIN_ENDPOINT,
    //   payload
    // );
    const { data } = yield call(
      api.post,
      `${endpoints.APPLE_SIGN_UP_ENDPOINT}${payload.token}`,
      { fullName: payload.fullName }
    );
    yield all([
      AsyncStorage.setItem("accessToken", data.accessToken),
      AsyncStorage.setItem("refreshToken", data.refreshToken),
      put(actions.saveTokenAction(data)),
      put(actions.getUserAction()),
      put(actions.turnOffSpinnerAction())
    ]);
  } catch (error) {
    console.log("appleSignIn error: ", error);
    if (error.request.status === 401)
      setTimeout(
        () =>
          Alert.alert(
            "Hm...",
            "Some conflicts with your account. Try to login."
          ),
        0
      );
    if (error.request.status === 500)
      setTimeout(
        () =>
          Alert.alert("Hm...", "Looks like apple did not provide your name."),
        0
      );
  } finally {
    yield put(actions.turnOffSpinnerAction());
  }
}

function* appleLogin({ payload }) {
  try {
    const { identityToken: token } = payload;
    yield put(actions.turnOnSpinnerAction());
    console.log("Apple Payload", payload);
    // const { data } = yield call(api.post, endpoints.APPLE_LOGIN_ENDPOINT, {
    //   token
    // });

    const { data } = yield call(
      api.post,
      endpoints.APPLE_LOGIN_ENDPOINT,
      payload
    );

    console.log("data", data);
    yield all([
      AsyncStorage.setItem("accessToken", data.accessToken),
      AsyncStorage.setItem("refreshToken", data.refreshToken),
      put(actions.saveTokenAction(data)),
      put(actions.getUserAction()),
      put(actions.turnOffSpinnerAction())
    ]);
  } catch (error) {
    console.log("appleLogin error: ", error);

    if (error.request.status === 401)
      yield put(actions.appleSignUpAction(payload));
    //setTimeout(() => Alert.alert('Hm...', 'Some conflicts with your google account. Try to login.'), 0);
    if (error.request.status === 404) {
      yield put(actions.appleSignUpAction(payload));
    }
  } finally {
    yield put(actions.turnOffSpinnerAction());
  }
}

export default function* authSagas() {
  yield all([
    takeLatest(actions.getVerifyAction, getVerify),
    takeLatest(actions.verifyAction, verify),

    takeLatest(actions.signUpAction, signUp),
    takeLatest(actions.signInAction, signIn),
    takeLatest(actions.signOutAction, logOut),
    takeLatest(actions.googleSignInAction, googleAuth),
    takeLatest(actions.googleSignUpAction, googleAuth),
    takeLatest(actions.facebookSignInAction, facebookSignIn),
    takeLatest(actions.facebookSignUpAction, facebookSignUp),
    takeLatest(actions.appleSignUpAction, appleSignUp),
    takeLatest(actions.appleLoginAction, appleLogin)
  ]);
}
