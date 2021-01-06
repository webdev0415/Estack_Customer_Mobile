import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const ToogleListButton = (props) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={props.switchFunc}>
    <Text style={styles.buttonText}>
      { props.schedule ? 'Hide' : 'Show all' }
    </Text>
  </TouchableOpacity>
);

export default ToogleListButton;
