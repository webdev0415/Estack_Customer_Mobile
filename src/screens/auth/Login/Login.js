import React from 'react';
import { Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AuthContainer from '../../../components/AuthContainer';
import LoginForm from '../../../components/Login/LoginForm';
import Loader from '../../../components/Loader';
import styles from './styles';

class Login extends React.Component {
  render() {
    const {
      email,
      signUp,
      password,
      onSubmit,
      disabled,
      appleLogin,
      onFbSignIn,
      emailError,
      emailHandler,
      passwordError,
      onGoogleSignIn,
      forgotPassword,
      passwordHandler,
      isVisibleSpinner,
    } = this.props;

    return (
      <AuthContainer
        children={
          <>
            <Loader/>
            <LoginForm
              email={email}
              password={password}
              disabled={disabled}
              onSubmit={onSubmit}
              emailError={emailError}
              appleLogin={appleLogin}
              onFbSignIn={onFbSignIn}
              emailHandler={emailHandler}
              passwordError={passwordError}
              onGoogleSignIn={onGoogleSignIn}
              passwordHandler={passwordHandler}
              forgotPassword={forgotPassword}
            />
            <Text style={styles.signup_link} onPress={signUp}>
              Not a member? Sign Up
            </Text>
          </>
        }
      />
    )
  }
}

export default Login;
