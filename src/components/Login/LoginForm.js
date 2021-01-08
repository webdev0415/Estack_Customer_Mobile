import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes
} from "@react-native-community/google-signin";
import InstagramLogin from "react-native-instagram-login";
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRealUserStatus,
  AppleAuthCredentialState,
  AppleAuthRequestOperation
} from "@invertase/react-native-apple-authentication";
import { SignInWithAppleButton } from "react-native-apple-authentication";
import FBSDK from "react-native-fbsdk";
const { LoginManager, AccessToken } = FBSDK;
import Dash from "react-native-dash";
import TextInput from "../CustomInput";
import CustomButton from "../CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images } from "../../constants/images";
import COLORS from "../../constants/colors";
import styles from "./styles";

class LoginForm extends Component {
  constructor() {
    super();
    this.authCredentialListener = null;
    this.user = null;

    this.state = {
      credentialStateForUser: -1
    };
  }

  componentDidMount() {
    //GoogleSignin.configure();
  }

  handleResponse1 = async () => {
    const { appleLogin } = this.props;
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
      });
      const test = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );
      console.log("test", test);
      console.log("appleAuthRequestResponse", appleAuthRequestResponse);
      //Hiren appleLogin(appleAuthRequestResponse);

      let fullName = appleAuthRequestResponse.fullName.givenName
        ? appleAuthRequestResponse.fullName.givenName
        : "" + appleAuthRequestResponse.fullName.familyName
        ? appleAuthRequestResponse.fullName.familyName
        : "";
      appleLogin({
        token: appleAuthRequestResponse.identityToken,
        fullName: fullName,
        email: appleAuthRequestResponse.email
      });
    } catch (error) {
      console.log("error", error);
      if (error.code === AppleAuthError.CANCELED) {
      }
      if (error.code === AppleAuthError.FAILED) {
        alert("Touch ID wrong");
      }
      if (error.code === AppleAuthError.INVALID_RESPONSE) {
        alert("Touch ID wrong");
      }
      if (error.code === AppleAuthError.NOT_HANDLED) {
      }
      if (error.code === AppleAuthError.UNKNOWN) {
        alert("Touch ID wrong");
      }
    }
  };

  handleResponse = async () => {
    console.warn("Beginning Apple Authentication");

    // start a login request
    try {
      // const appleAuthRequestResponse = await appleAuth.performRequest({
      //   requestedOperation: AppleAuthRequestOperation.LOGIN,
      //   requestedScopes: [
      //     AppleAuthRequestScope.EMAIL,
      //     AppleAuthRequestScope.FULL_NAME
      //   ]
      // });
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
      });

      console.log("appleAuthRequestResponse", appleAuthRequestResponse);

      const {
        user: newUser,
        email,
        fullName,
        nonce,
        identityToken,
        realUserStatus /* etc */
      } = appleAuthRequestResponse;

      this.user = newUser;

      this.fetchAndUpdateCredentialState()
        .then(res => this.setState({ credentialStateForUser: res }))
        .catch(error =>
          this.setState({ credentialStateForUser: `Error: ${error.code}` })
        );

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        console.log(nonce, identityToken);
      } else {
        // no token - failed sign-in?
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.warn(
        `Apple Authentication Completed, ${this.user}, ${email}, ${fullName.givenName}, ${fullName.familyName}`
      );

      let apple_user = null;

      if (this.user && email) {
        apple_user = {
          id: this.user,
          token: identityToken,
          email: email ? email : "",
          first_name: fullName.givenName ? fullName.givenName : "",
          last_name: fullName.familyName ? fullName.familyName : ""
        };

        await AsyncStorage.setItem("apple_user", JSON.stringify(apple_user));
      } else if (this.user) {
        const str_apple_user = await AsyncStorage.getItem("apple_user");
        console.log("Saved apple ", str_apple_user);
        if (str_apple_user) {
          const apple_user_saved = JSON.parse(str_apple_user);
          console.log("Saved APple Object ", apple_user_saved);
          const apple_user_new = {
            id: this.user
          };

          if (apple_user_saved.id === apple_user_new.id) {
            apple_user = {
              id: this.user,
              token: identityToken,
              email: apple_user_saved.email ? apple_user_saved.email : "",
              first_name: apple_user_saved.first_name
                ? apple_user_saved.first_name
                : "",
              last_name: apple_user_saved.last_name
                ? apple_user_saved.last_name
                : ""
            };
          }
        }
      } else {
        console.log("No case matching");
      }

      // if (apple_user) this.signInAppleHandler(apple_user);

      if (apple_user)
        this.props.appleLogin({
          token: apple_user.token,
          fullName: apple_user.first_name + " " + apple_user.last_name,
          email: apple_user.email
        });
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn("User canceled Apple Sign in.");
      } else {
        console.error(error);
      }
    }
  };

  fetchAndUpdateCredentialState = async () => {
    if (this.user === null) {
      this.setState({ credentialStateForUser: "N/A" });
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(
        this.user
      );
      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        this.setState({ credentialStateForUser: "AUTHORIZED" });
      } else {
        this.setState({ credentialStateForUser: credentialState });
      }
    }
  };

  googleOnCLick = async () => {
    let user;
    const isSignedIn = await GoogleSignin.isSignedIn();
    const currentUser = await GoogleSignin.getCurrentUser();
    user = await GoogleSignin.signIn();
    const { accessToken } = await GoogleSignin.getTokens();

    this.props.onGoogleSignIn({
      token: accessToken,
      fullName: user.user.name,
      email: user.user.email
    });
  };

  onAppleButtonPress = async () => {
    // performs login request
    console.log("before");
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    });
    console.log("after");
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );
    console.log("credentialState", credentialState);
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  };

  fbLogin = async () => {
    const { onFbSignIn } = this.props;
    AccessToken.getCurrentAccessToken().then(res => console.log("res", res));
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login was cancelled");
          alert("Cancelled");
        } else {
          console.log(
            "Login was successful with permissions: " +
              result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;
            onFbSignIn({ token: accessToken });
          });
        }
      },
      function(error) {
        console.log("Login failed with error: " + error);
      }
    );
  };

  render() {
    const { email, disabled, onSubmit, emailError, emailHandler } = this.props;

    return (
      <View style={styles.card}>
        <Text style={styles.login_header}>Login</Text>
        <View style={styles.google_signin}>
          <TouchableOpacity
            onPress={this.googleOnCLick}
            style={{ marginRight: 10, marginLeft: 10 }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={images["googleAuth"]}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => this.instagramLogin.show()} style={{ marginRight: 10, marginLeft: 10 }}>
              <Image style={{ width: 32, height: 32, borderRadius: 7 }} source={images['instagramAuth']}  />
            </TouchableOpacity> */}
          {Platform.OS === "ios" ? (
            <TouchableOpacity
              onPress={this.handleResponse}
              style={{ marginRight: 10, marginLeft: 10 }}
            >
              <Image
                style={{ width: 32, height: 32, borderRadius: 7 }}
                source={images["appleLogin"]}
              />
            </TouchableOpacity>
          ) : null}

          {/* <InstagramLogin
              ref={ref => (this.instagramLogin = ref)}
              appId='703368500416266'
              appSecret='39d0f9d7abc3df06618f11464dcbffbf'
              redirectUrl='estackk.com'
              scopes={['user_profile']}
              onLoginSuccess={value => console.log('login', value)}
              onLoginFailure={(data) => console.log('Error', data)}
            /> */}

          {/* <TouchableOpacity onPress={this.fbLogin} style={{ marginRight: 10, marginLeft: 10, }}>
              <Image style={{ width: 32, height: 32, }} source={images['facebookAuth']}  />
            </TouchableOpacity> */}
        </View>
        <View style={styles.hairline}>
          <Dash
            style={styles.dash}
            dashColor={COLORS.dashColor}
            dashThickness={1}
          />
          <Text style={styles.loginButtonBelowText1}>or</Text>
          <Dash
            style={styles.dash}
            dashColor={COLORS.dashColor}
            dashThickness={1}
          />
        </View>

        <View>
          <TextInput
            placeholder="Enter Email"
            onChangeText={emailHandler}
            value={email}
            autoCapitalize="none"
            onSubmitEditing={onSubmit}
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          {emailError()}
        </View>
        <View style={styles.bottomContainer}>
          <CustomButton disabled={disabled} onPress={onSubmit} text="Login" />
        </View>
      </View>
    );
  }
}

export default LoginForm;
