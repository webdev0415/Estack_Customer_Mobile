import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import styles from './styles';
const height = Dimensions.get('window').height

const Slide = props => {
  const { text, image } = props;

  return (
    <View style={styles.slide}>
      <Text style={[styles.title, { marginBottom:height*.06 }]}>
        {text}
      </Text>
      <Image style={styles.image} source={image}/>
    </View>
  )
};

export default Slide;
