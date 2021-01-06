import React from 'react';
import { View, Image } from 'react-native';
import { images } from '../../constants/images';

const headerLeft = () => (
  <View style={{ marginLeft: 15 }}>
    <Image source={images['group-5']} />
  </View>
);

export default headerLeft;
