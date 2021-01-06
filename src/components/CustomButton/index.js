import React from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';
import styles from './styles';

const CustomButton = (props) => (
  <TouchableOpacity
    style={[styles.btn_custom, { backgroundColor: props.disabled ? 'lightgrey' : '#4076d9' }]}
    disabled={props.disabled}
    onPress={props.onPress}
  >
    <Text style={[styles.btn_text, { marginTop: Platform.OS === 'ios' ? 0 : -2 }]}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

export default CustomButton;
