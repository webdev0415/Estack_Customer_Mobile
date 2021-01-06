import React from 'react';
import { View } from 'react-native';

import NewStoresItem from './NewStoresItem';
import styles from './styles';

const NewStoresList = (props) => {
  const { seeAllStores, goToStore, stores } = props;

  const renderDefaultStores = (stores) => (
    stores.map((item, index) => {
      if (seeAllStores) {
      return (
          <NewStoresItem
            key={item._id}
            goToStore={goToStore}
            _id={item._id}
            brandName={item.brandName}
            storeImage={item.image ? item.image.ref : null}
          />
      )} else if (index < 6) {
        return (
          <NewStoresItem
            key={item._id}
            goToStore={goToStore}
            _id={item._id}
            brandName={item.brandName}
            storeImage={item.image ? item.image.ref : null}
          />
        )
      }
    })
  );

  return (
    <View style={styles.new_store_card_align}>
      { renderDefaultStores(stores) }
    </View>

  );
};

export default NewStoresList;
