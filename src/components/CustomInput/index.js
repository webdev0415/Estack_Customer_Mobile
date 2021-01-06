import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

const CustomInput = (props) => (
  <TextInput
    style={styles.input}
    placeholder={props.placeholder || 'Enter value'}
    placeholderTextColor='rgba(0, 0, 0, 0.25)'
    onChangeText={value => props.onChangeText(value)}
    value={props.value}
    {...props}
  />
);

export default CustomInput;
