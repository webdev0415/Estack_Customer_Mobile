import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { GoogleSignin } from "@react-native-community/google-signin";
import FBSDK from "react-native-fbsdk";
const { LoginManager, AccessToken } = FBSDK;

import validator from "../../../validators/auth-validator";
import ErrorMessage from "../../../components/ErrorMessage";
import * as actions from "../../../redux/actions";
import SignUp from "./SignUp";

class SignUpScreen extends Component {
  state = {
    fullName: "",
    email: "",
    password: "",
    confirm_password: "",
    errors: {}
  };

  googleSignIn = async () => {
    alert("Will be soon.");
    // signIn code
  };

  validate = () => {
    const { email, password, fullName } = this.state;
    const errors = validator({ email, fullName });
    this.setState({ errors });
  };

  confirmPassword = () => {
    if (this.state.password != this.state.confirm_password) {
      this.setState({
        errors: { ...this.state.errors, confirm: "Passwords don`t match" }
      });
    } else {
      this.setState({ errors: { ..._.omit(this.state.errors, "confirm") } });
    }
  };

  emailHandler = email => this.setState({ email }, () => this.validate());

  fullNameHandler = fullName =>
    this.setState({ fullName }, () => this.validate());

  passwordHandler = password =>
    this.setState({ password }, () => this.validate());

  confirmPasswordHandler = confirm_password =>
    this.setState({ confirm_password }, () => this.confirmPassword());

  onSubmitHandler = () => {
    const { fullName, email, password } = this.state;
    // this.props.onSignUp({ fullName, email, password });
    this.props.onGetVerify({ fullName, email });
  };

  goToLogin = () => this.props.navigation.navigate("Login");

  renderError = error => {
    if (this.state.errors[error]) {
      return <ErrorMessage error={this.state.errors[error]} />;
    }
  };

  googleSignUp = async () => {
    // await GoogleSignin.revokeAccess();
    // await GoogleSignin.signOut();

    const user = await GoogleSignin.signIn();
    const { accessToken: token } = await GoogleSignin.getTokens();
    this.props.onGoogleSignUp({
      token,
      fullName: user.user.name,
      email: user.user.email
    });
  };

  facebookSignUp = () => {
    const { onFacebookSignUp } = this.props;

    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function(result) {
        if (result.isCancelled) {
          LoginManager.logOut();
          console.log("Login was cancelled");
        } else {
          console.log(
            "Login was successful with permissions: " +
              result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;

            fetch(
              "https://graph.facebook.com/v2.5/me?fields=email,name&access_token=" +
                accessToken
            )
              .then(response => response.json())
              .then(json => {
                onFacebookSignUp({ token: accessToken, fullName: json.name });
              })
              .catch(error => {
                console.log("ERROR", error);
                reject("ERROR GETTING DATA FROM FACEBOOK");
              });
          });
        }
      },
      function(error) {
        console.log("Login failed with error: " + error);
      }
    );
  };

  render() {
    const { email, errors, fullName, password, confirm_password } = this.state;
    const { appleLogin } = this.props;
    const isDisabled = Object.values(errors).length > 0 || email.length <= 3;

    return (
      <SignUp
        email={email}
        fullName={fullName}
        password={password}
        isDisabled={isDisabled}
        appleLogin={appleLogin}
        confirm_password={confirm_password}
        facebookSignUp={this.facebookSignUp}
        googleSignUp={this.googleSignUp}
        renderError={this.renderError}
        goToLogin={this.goToLogin}
        renderError={this.renderError}
        emailHandler={this.emailHandler}
        fullNameHandler={this.fullNameHandler}
        passwordHandler={this.passwordHandler}
        onSubmitHandler={this.onSubmitHandler}
        confirmPasswordHandler={this.confirmPasswordHandler}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSignUp: payload => dispatch(actions.signUpAction(payload)),
  onGoogleSignUp: payload => dispatch(actions.googleSignUpAction(payload)),
  onFacebookSignUp: payload => dispatch(actions.facebookSignUpAction(payload)),
  onGetVerify: payload => dispatch(actions.getVerifyAction(payload)),
  appleLogin: payload => dispatch(actions.appleLoginAction(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpScreen);
