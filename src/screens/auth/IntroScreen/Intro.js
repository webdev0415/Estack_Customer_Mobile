import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Slide from '../../../components/Slide';
import Swiper from '../../../components/Swiper';
import image from '../../../img/bg.png'
import { images } from '../../../constants/images';
import styles from './styles';
const height = Dimensions.get('window').height

const Intro = (props) => {
  const {
    goToLogin,
    onSkipSlides,
    onDoneAllSlides,
  } = props;

  return(
    <ImageBackground style={styles.backgroundContainer} source={images['bg']}>
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        loop={false}
        showsButtons={false}
        dot={<View style={styles.swiperDot} />} 
        activeDot={<View style={styles.swiperActiveDot} />}
      >
        <Slide text='Get rewarded for spending!' image={images['group-2']} />
        <Slide text='Manage all rewards at one place…' image={images['group-3']} />
        <Slide text='Save more when you come back!' image={images['group-4']} />
      </Swiper>

      <View style={styles.joinContainer}>

      <TouchableOpacity
        style={[
          styles.btn_custom,
          {
            marginBottom:height*.1,
            marginTop:height*.02,
          }
        ]}
        onPress={goToLogin}>
          <Text style={[styles.btn_text, { marginTop:Platform.OS === 'ios' ? 0 : -2 }]}>
            Join Now
          </Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
  )
};

export default Intro;
