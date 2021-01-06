import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const ErrorMessage = props => (
  <Text style={styles.error}>
    {props.error}
  </Text>
);

export default ErrorMessage;
