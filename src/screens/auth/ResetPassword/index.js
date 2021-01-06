import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import ErrorMessage from '../../../components/ErrorMessage';
import ResetPassword from './ResetPassword';
import { StackActions } from 'react-navigation';

class ResetPasswordScreen extends Component {
  state = {
    oldPassword: '',
    password: '',
    confirm_password: '',
    passwordError: false,
    confirm_passwordError: false
  };

  goBack = () => {
    const popAction = StackActions.pop({ n: 1 });
    
    this.props.navigation.dispatch(popAction);
  }

  oldPasswordHandler = (oldPassword) => this.setState({ oldPassword });

  passwordhandler = (password) => {
    this.setState({ password });

    if (password !== "" && password.length > 5) {
      this.setState({ passwordError: false })
    }
    else {
      this.setState({ passwordError: true })
    }
  }

  confirmpasswordhandler = (e) => {
    this.setState({
      confirm_password: e,
    })

    if (this.state.password === e) {
      this.setState({ confirm_passwordError: false })
    }
    else {
      this.setState({ confirm_passwordError: true })
    }
  }

  onSubmitHandler = () => {
    const { oldPassword, password } = this.state;
    this.props.onChangePassword({ oldPassword, password });
    this.setState({ password: '', oldPassword: '', confirm_password: '', })
  }

  renderPasswordError = () => {
    if (this.state.passwordError) {
      return <ErrorMessage error='Password should have minimum 6 character'/>
    }
  }

  renderConfirmError = () => {
    if (this.state.confirm_passwordError) {
      return <ErrorMessage error='Passwords do not match' />
    }
  }

  render() {
    const { password, confirm_password, oldPassword } = this.state;
    const isDisabled = oldPassword.length < 6 && password.length < 6 && confirm_password.length < 6 && password !== confirm_password;

    return (
      <ResetPassword
        password={password}
        goBack={this.goBack}
        isDisabled={isDisabled}
        oldPassword={oldPassword}
        confirm_password={confirm_password}
        passwordhandler={this.passwordhandler}
        onSubmitHandler={this.onSubmitHandler}
        oldPasswordHandler={this.oldPasswordHandler}
        renderPasswordError={this.renderPasswordError}
        renderConfirmError={this.renderConfirmError}
        confirmpasswordhandler={this.confirmpasswordhandler}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onChangePassword: (payload) => dispatch(actions.changePasswordAction(payload)),
});

export default connect(null, mapDispatchToProps)(ResetPasswordScreen);
