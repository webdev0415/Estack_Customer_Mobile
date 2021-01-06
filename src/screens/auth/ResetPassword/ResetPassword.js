import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AuthContainer from '../../../components/AuthContainer';
import TextInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import styles from './styles';

const SetPassword = (props) => {
  const {
    goBack,
    password,
    isDisabled,
    oldPassword,
    onSubmitHandler,
    passwordhandler,
    confirm_password,
    renderConfirmError,
    oldPasswordHandler,
    renderPasswordError,
    confirmpasswordhandler,
  } = props;

    return (
      <AuthContainer
        children={
          <>
            <View style={styles.card}>
              <Text style={styles.login_header}>Change Password</Text>
                <View>
                  <TextInput
                    placeholder='Old password'
                    secureTextEntry
                    value={oldPassword}
                    onChangeText={oldPasswordHandler}
                  />
                  <TextInput
                    placeholder="Set Password"
                    secureTextEntry
                    value={password}
                    onChangeText={passwordhandler}
                  />
                { renderPasswordError() }
                <TextInput
                  placeholder="Confirm Password"
                  autoCompleteType="password"
                  secureTextEntry
                  value={confirm_password}
                  onChangeText={confirmpasswordhandler}
                />
                { renderConfirmError() }
              </View>
              <CustomButton disabled={isDisabled} onPress={onSubmitHandler} text='Set Password' />
            </View>
            <Text style={styles.goBack} onPress={goBack}>
              Change your mind? Go back
            </Text>

          </>
        }
      />
    )
};

export default SetPassword;
