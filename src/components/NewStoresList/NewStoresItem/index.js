import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import { images } from '../../../constants/images';
import styles from './styles';

const NewStoresItem = (props) => {
  const { goToStore, storeImage, _id, brandName } = props;

  return (
    <TouchableOpacity
      onPress={() => goToStore(_id, brandName)}
      style={styles.new_store_card}
    >
      <Image
        style={styles.storeIcon}
        source={storeImage ? { uri: storeImage } : images['defaultStore']}
      />
    </TouchableOpacity>
  );
};

export default NewStoresItem;
