import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { images } from '../../constants/images';
import styles from './styles';

const Card = (props) => {
  const {
    memberShip,
    ratio,
    birthday,
    welcome,
    minPoints,
    background,
  } = props;

  return (
    <View style={{ marginTop: background === 'clubMember' ? 0 : 20 }}>
        <ImageBackground
          source={images[background]}
          style={styles.small_card_image_bg}
        >
          <Text style={styles.small_card_image_header}>{memberShip}</Text>
          <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.point_value1}>{ratio}</Text>
            <Image style={{ paddingLeft: 10, height: 16, width: 16 }} source={images['group-10']} />
            <Text style={styles.point_value2}>for Every</Text>
            <Text style={styles.point_value3}> $ 1.00</Text>
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.birthday_mid}>{birthday}% </Text>
            <Image style={{ marginLeft: 5, height: 14, width: 14 }} source={images['gift']} />
          </View>
          <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.birthday}>{welcome}% </Text>
            <Text style={styles.welcome}> Welcome  </Text>
            <Image style={{ marginLeft: -5, marginBottom: 3, height: 24, width: 24 }} source={images['group-1']} />
          </View>
        </ImageBackground>
        <LinearGradient
          colors={['#c9f0ec', '#cce8f9']}
          start={{ x: 0.09, y: 0.09 }}
          end={{ x: 1.0, y: 1.0 }}
          useAngle={true}
          angle={139}
          angleCenter={{ x: 0.5, y: 0.5 }}
          style={styles.card_value}
        >
          <Image style={{ height: 16, width: 16 }} source={images['group-10']} />
          <Text style={styles.minpoint_value}>{minPoints}</Text>
        </LinearGradient>
      </View>
  );
};

export default Card;
