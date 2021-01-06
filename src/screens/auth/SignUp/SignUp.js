import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { GoogleSigninButton, GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import InstagramLogin from 'react-native-instagram-login'
import appleAuth from '@invertase/react-native-apple-authentication';
import FBSDK from 'react-native-fbsdk';
const { LoginManager, AccessToken } = FBSDK;
import Dash from 'react-native-dash';

import { images } from '../../../constants/images';
import AuthContainer from '../../../components/AuthContainer';
import TextInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import COLORS from '../../../constants/colors';
import styles from './styles';

class SignUp extends Component {
  handleResponse = async () => {
    const { appleLogin } = this.props;
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [
          appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME
        ],
      });
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
  };

  render() {
    const {
      email,
      fullName,
      goToLogin,
      isDisabled,
      renderError,
      appleLogin,
      emailHandler,
      googleSignUp,
      fullNameHandler,
      onSubmitHandler,
      facebookSignUp,
    } = this.props;

    return (
      <AuthContainer
        children={
          <>
          <View style={styles.card}>
            <Text style={styles.login_header}>Register</Text>
            <View style={styles.google_signin}>

            
            <TouchableOpacity onPress={googleSignUp} style={{ marginRight: 10, marginLeft: 10 }}>
              <Image style={{ width: 40, height: 40, }} source={images['googleAuth']}  />
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => this.instagramLogin.show()} style={{ marginRight: 10, marginLeft: 10 }}>
              <Image style={{ width: 32, height: 32, borderRadius: 7 }} source={images['instagramAuth']}  />
            </TouchableOpacity> */}
            {Platform.OS === 'ios' ? <TouchableOpacity onPress={this.handleResponse} style={{ marginRight: 10, marginLeft: 10 }}>
              <Image style={{ width: 32, height: 32, borderRadius: 7 }} source={images['appleLogin']}  />
            </TouchableOpacity> : null }
            {/* <InstagramLogin
              ref={ref => (this.instagramLogin = ref)}
              appId='2582872151823369'
              appSecret='afd30f4dd50e6ac44797cccfb2c5ab9e'
              redirectUrl='estackk.com'
              scopes={['user_profile']}
              onLoginSuccess={value => console.log('login', value)}
              onLoginFailure={(data) => console.log('Error', data)}
            /> */}

            {/* <TouchableOpacity onPress={facebookSignUp} style={{ marginRight: 10, marginLeft: 10, }}>
              <Image style={{ width: 32, height: 32, }} source={images['facebookAuth']}  />
            </TouchableOpacity> */}

            </View>
            <View style={styles.hairline}>
              <Dash style={styles.dash} dashColor={COLORS.dashColor} dashThickness={1} />
              <Text style={styles.loginButtonBelowText1}>or</Text>
              <Dash style={styles.dash} dashColor={COLORS.dashColor} dashThickness={1} />
            </View>

            <TextInput
              placeholder="Full Name"
              onChangeText={fullName => fullNameHandler(fullName)}
              value={fullName}
              autoCapitalize='none'
            />
            { renderError('fullName') }

            <TextInput
              placeholder="Enter Email"
              autoCompleteType="email"
              onChangeText={email => emailHandler(email)}
              value={email}
              autoCapitalize='none'
              textContentType='emailAddress'
              keyboardType='email-address'
            />
            { renderError('email') }

            <View style={{ flex: 1, marginBottom: 7, justifyContent: 'flex-end', alignItems: 'center' }}> 
            <CustomButton disabled={isDisabled} onPress={onSubmitHandler} text='Register' />
            </View>

          </View>

          <Text style={styles.forgot_password} onPress={goToLogin}>
            Existing Member? Login
          </Text>
        </>
        }
      />
    );
  }
}

export default SignUp;
