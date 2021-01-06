import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const EmptyBlock = (props) => {
  const { content } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        { content }
      </Text>
    </View>
  )
};

export default EmptyBlock;
