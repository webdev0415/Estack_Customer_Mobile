import React from 'react';
import { View, Text } from 'react-native';
import AuthContainer from '../../../components/AuthContainer';
import TextInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import ErrorMessage from '../../../components/ErrorMessage';
import styles from './styles';

const ForgotPassword = (props) => {
  const { email, onEmailHandler, resetPassword, error, disabled, goToLogin } = props;

  return (
    <AuthContainer
      children={
        <>
          <View style={styles.card}>
            <Text style={styles.login_header}>
              Forgot Password
            </Text>
            <TextInput
              value={email}
              placeholder='Enter your email'
              onChangeText={onEmailHandler}
            />
            <ErrorMessage error={error} />
            <CustomButton
              disabled={disabled} 
              onPress={resetPassword}
              text='Reset Password'
            />
          </View>
          <Text style={styles.forgot_password} onPress={goToLogin}>
            Remember your password? Login
          </Text>
        </>
      }
    />
  );
};

export default ForgotPassword;
