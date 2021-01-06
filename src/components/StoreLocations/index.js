import React from 'react';
import { View, Text } from 'react-native';

import Location from './Location';
import styles from './styles';

const StoreLocations = ({ places }) => {
  return (
    places.length > 0 && <View style={styles.mainContainer}>
        <Text style={styles.title}>
          Store Locations
        </Text>
        <Location places={places}/>
      </View>
  );
};

export default StoreLocations;
