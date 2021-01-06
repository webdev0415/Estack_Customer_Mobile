import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import Login from './Login';
import ErrorMessage from '../../../components/ErrorMessage';
import validator from '../../../validators/auth-validator';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    errors: {},

    isVisibleSpinner: false,
  }

  turnOffSpinner = () => this.setState({ isVisibleSpinner: false });

  validate = () => {
    const { email, password } = this.state;
    const errors = validator({ email, password });
    this.setState({ errors });
  };

  emailHandler = email => this.setState({ email }, () => this.validate());

  passwordHandler = password => this.setState({ password }, () => this.validate());

  emailError = () => {
    if (this.state.errors.email)
      return <ErrorMessage error={this.state.errors.email} />
  }

  passwordError = () => {
    if (this.state.errors.password)
      return <ErrorMessage error={this.state.errors.password} />
  };

  // forgotPassword = () => this.props.navigation.navigate('ForgotPassword');

  signUp = () => this.props.navigation.navigate('Signup');

  onGoToOtp = () => this.props.navigation.navigate('Otp', { email: this.state.email });

  onSubmit = () => {
    const { email, errors } = this.state;

    this.validate();
    !errors.email && this.props.onSendEmail({ email, cb: this.onGoToOtp });

  }

  render() {
    const { email, password, isVisibleSpinner } = this.state;
    const { onGoogleSignIn, onFbSignIn, appleLogin } = this.props;
    const disabled = this.state.errors.email || this.state.email.length === 0

    return (
      <Login
        email={email}
        password={password}
        disabled={disabled}
        signUp={this.signUp}
        onSubmit={this.onSubmit}
        emailError={this.emailError}
        onGoogleSignIn={onGoogleSignIn}
        appleLogin={appleLogin}
        onFbSignIn={onFbSignIn}
        emailHandler={this.emailHandler}
        passwordError={this.passwordError}
        isVisibleSpinner={isVisibleSpinner}
        forgotPassword={this.forgotPassword}
        passwordHandler={this.passwordHandler}
      />
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  onSignIn: (payload) => dispatch(actions.signInAction(payload)),
  onSendEmail: (payload) => dispatch(actions.sendOtpEmailAction(payload)),
  onGoogleSignIn: (payload) => dispatch(actions.googleSignInAction(payload)),
  onFbSignIn: (payload) => dispatch(actions.facebookSignInAction(payload)),
  appleLogin: (payload) => dispatch(actions.appleLoginAction(payload)),
});

export default connect(null, mapDispatchToProps)(LoginScreen);
