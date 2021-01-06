import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import Loader from '../../../components/Loader';
import AuthContainer from '../../../components/AuthContainer';

import styles from './styles';

const OTP = ({ code, onCodeChange, onRetry, goBack, onSubmit }) => (
  <AuthContainer
    children={
      <>
        <Loader/>
        <Text style={styles.help}>
          Enter the 4 digit password sent to your email address 
        </Text>
        <OTPInputView
          style={{width: '80%', height: 200}}
          pinCount={4}
          code={code}
          onCodeChanged={onCodeChange}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => onSubmit(code)}
          numberOfInputs={4}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marignTop: 35 }}>
          <TouchableOpacity onPress={onRetry}>
            <Text style={{ color: '#4681C3', fontSize: 16, paddingRight: 7 }}>Retry</Text>
          </TouchableOpacity>
          <Text> or </Text>
          <TouchableOpacity onPress={goBack}>
            <Text style={{ color: '#4681C3', fontSize: 16, paddingLeft: 7 }}>go back</Text>
          </TouchableOpacity>
        </View>
      </>
    }
  />
);

export default OTP;

