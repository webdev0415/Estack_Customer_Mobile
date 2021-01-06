import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { GoogleSigninButton, GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import InstagramLogin from 'react-native-instagram-login'
import appleAuth from '@invertase/react-native-apple-authentication';
import { SignInWithAppleButton } from 'react-native-apple-authentication'
import FBSDK from 'react-native-fbsdk';
const { LoginManager, AccessToken } = FBSDK;
import Dash from 'react-native-dash';
import TextInput from '../CustomInput';
import CustomButton from '../CustomButton';

import { images } from '../../constants/images';
import COLORS from '../../constants/colors';
import styles from './styles';

class LoginForm extends Component {

  componentDidMount() {
    GoogleSignin.configure();
  };

  handleResponse = async () => {
    const { appleLogin } = this.props;
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [
          appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME,
        ],
      });
      const test = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)
      console.log('test', test);
      console.log('appleAuthRequestResponse', appleAuthRequestResponse);
      appleLogin(appleAuthRequestResponse);
    } catch (error) {
      console.log('error', error);
      if (error.code === AppleAuthError.CANCELED) {
      }
      if (error.code === AppleAuthError.FAILED) {
        alert('Touch ID wrong');
      }
      if (error.code === AppleAuthError.INVALID_RESPONSE) {
        alert('Touch ID wrong');
      }
      if (error.code === AppleAuthError.NOT_HANDLED) {
      }
      if (error.code === AppleAuthError.UNKNOWN) {
        alert('Touch ID wrong');
      }
    }
  }

  googleOnCLick = async () => {

    let user;
    const isSignedIn = await GoogleSignin.isSignedIn();
    const currentUser = await GoogleSignin.getCurrentUser();
    user = await GoogleSignin.signIn();
    const { accessToken } = await GoogleSignin.getTokens();
    
    this.props.onGoogleSignIn({ token: accessToken, fullName: user.user.name, email: user.user.email });
  };

  onAppleButtonPress = async () => {
    // performs login request
    console.log('before')
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log('after')
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    console.log('credentialState', credentialState);
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  }

  fbLogin = async () => {
    const { onFbSignIn } = this.props;
    AccessToken.getCurrentAccessToken().then(res => console.log('res', res))
    LoginManager.logInWithPermissions(['public_profile','email']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login was cancelled');
          alert('Cancelled')
        } else {
          console.log('Login was successful with permissions: '
            + result.grantedPermissions.toString());
          AccessToken.getCurrentAccessToken().then((data) => {
              const { accessToken } = data;
              onFbSignIn({ token: accessToken });
            })
        }
      },
      function(error) {
        console.log('Login failed with error: ' + error);
      })
  };

  render() {
    const { email, disabled, onSubmit, emailError, emailHandler } = this.props;

    return (
      <View style={styles.card}>
          <Text style={styles.login_header}>
            Login
          </Text>
          <View style={styles.google_signin}>

            <TouchableOpacity onPress={this.googleOnCLick} style={{ marginRight: 10, marginLeft: 10 }}>
              <Image style={{ width: 40, height: 40, }} source={images['googleAuth']}  />
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => this.instagramLogin.show()} style={{ marginRight: 10, marginLeft: 10 }}>
              <Image style={{ width: 32, height: 32, borderRadius: 7 }} source={images['instagramAuth']}  />
            </TouchableOpacity> */}
            {Platform.OS === 'ios' ? <TouchableOpacity onPress={this.handleResponse} style={{ marginRight: 10, marginLeft: 10 }}>
              <Image style={{ width: 32, height: 32, borderRadius: 7 }} source={images['appleLogin']}  />
            </TouchableOpacity> : null}

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
            <Dash style={styles.dash} dashColor={COLORS.dashColor} dashThickness={1}/>
            <Text style={styles.loginButtonBelowText1}>
              or
            </Text>
            <Dash style={styles.dash} dashColor={COLORS.dashColor} dashThickness={1}/>
          </View>

          <View>
            <TextInput
              placeholder="Enter Email"
              onChangeText={emailHandler}
              value={email}
              autoCapitalize='none'
              onSubmitEditing={onSubmit}
              textContentType='emailAddress'
              keyboardType='email-address'
            />
            {emailError()}
            
          </View>
          <View style={styles.bottomContainer}>
            <CustomButton disabled={disabled} onPress={onSubmit} text='Login' />

          </View>
      </View>
    );
  }
}

export default LoginForm;
