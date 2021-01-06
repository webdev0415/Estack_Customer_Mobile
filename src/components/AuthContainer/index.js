import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { images } from '../../constants/images';
import styles from './styles';

const AuthContainer = (props) => {
  return (
    <ImageBackground style={styles.background} source={images['bg']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : "padding"} enabled>
        <ScrollView contentContainerStyle={{ height: '100%', justifyContent: 'center'}}>
          <View style={styles.container}>
            <Image source={images['group-5']}/>
            <Text style={styles.estackkheading}>
              ESTACKK
            </Text>
            { props.children }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AuthContainer;
