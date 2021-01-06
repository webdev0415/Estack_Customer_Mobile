import React, { Component } from 'react';
import ForgotPassword from './ForgotPassword';
import validator from '../../../validators/auth-validator';

class ForgotPasswordScreen extends Component {
  state = {
    email: '',
    error: '',
  };

  goToLogin = () => this.props.navigation.navigate('Login');

  onEmailHandler = (email) => {
    const { email: error} = validator({ email });
    this.setState({ email, error: error || '' });
  };

  resetPassword = () => {
    alert('You`ll get a new password on your email in few minutes');
    this.props.navigation.navigate('Login');
  };


  render() {
    const { email, error } = this.state;
    const disabled = error.length !== 0 || email.length === 0;

    return (
      <ForgotPassword
        email={email}
        error={error}
        disabled={disabled}
        goToLogin={this.goToLogin}
        resetPassword={this.resetPassword}
        onEmailHandler={this.onEmailHandler}
      />
    );
  }
};

export default ForgotPasswordScreen;
