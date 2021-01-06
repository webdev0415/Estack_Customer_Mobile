import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions';
import OTP from './otp';

class OTPLogin extends Component {
  state = {
    code: '',
    email: '',
  };

  componentDidMount() {
    const email = this.props.navigation.getParam('email');
    this.setState({ email });
  }

  onCodeChange = (code) => this.setState({ code })

  onRetry = () => {
    this.props.onSendEmail({ email: this.state.email });
    Alert.alert('Success', 'Check your email, please.')
  };

  goBack = () => this.props.navigation.navigate('Login');

  onSubmit = (code) => this.props.onSignIn({ email: this.state.email, password: code })

  render() {
    const { code } = this.state;
    
    return (
      <OTP
        code={code}
        goBack={this.goBack}
        onRetry={this.onRetry}
        onSubmit={this.onSubmit}
        onCodeChange={this.onCodeChange}
      />
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  onSignIn: (payload) => dispatch(actions.signInAction(payload)),
  onSendEmail: (payload) => dispatch(actions.sendOtpEmailAction(payload)),
})

export default connect(null, mapDispatchToProps)(OTPLogin);