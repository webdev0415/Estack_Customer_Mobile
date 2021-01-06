import React from 'react';
import { Text, View, Image, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { images } from '../../../constants/images';
import styles from './styles';

const Location = ({ places }) => {
  
  return (
     places.map((item) => (
      <View style={styles.shadow}>
        <View style={styles.linearGradient_view}>
          <LinearGradient colors={['#c9f0ec', '#cce8f9']}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1.0, y: 1.0 }}
            useAngle={true}
            angle={139}
            angleCenter={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.store_location}>
              <View style={styles.store_image_view}>
                <Image style={styles.store_image} source={images['shop-1']} />
                <Text style={styles.storename}>
                  { item.name ? item.name : 'Unknown place' } { item.address }
                </Text>
              </View>
              <Text style={styles.store_address}>
                { item.name }
                { item.address    ? `, ${item.address}` : '' }
                { item.address2   ? `, ${item.address2}` : '' }
                { item.country    ? `, ${item.country}` : '' }
                { item.postalCode ? `, ${item.postalCode}` : '' }
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    ))
  );
  
};

export default Location;
