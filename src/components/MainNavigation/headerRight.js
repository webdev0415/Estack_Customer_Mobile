import React from 'react';
import { View, Image } from 'react-native';
import { images } from '../../constants/images';

const headerRight = () => (
  <View style={{ marginRight: 15 }}>
    <Image style={{ width:15, height:19 }} source={images['shape-5']}/>
  </View>
);

export default headerRight;
