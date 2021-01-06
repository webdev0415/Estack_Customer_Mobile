import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import _ from 'lodash';

import { images } from '../../constants/images';
import styles from './styles';

const MyMemberShipCard = (props) => {
  const { seeAllMemberShips, memberShips, goToStore } = props;

  renderAdditionalInfo = (info) => {
    if (info) {
      return (
        <Text style={styles.additionalInfo}>
          {info}
        </Text>
      )
    }
  }

  renderMemberShipItem = (item) => (
    <TouchableOpacity
      key={item._id}
      onPress={() => goToStore(item.business._id, item.business.brandName)}
      style={styles.mainContainer}
    >
      <View style={styles.leftPartContainer}>
        <Image source={ item.business.image ? { uri: item.business.image.ref } : images['defaultStore']} style={styles.memberStoreIcon} />
        <View style={styles.memberShipInfo}>
          <Text style={styles.storeName}>
            { item.business.brandName }
          </Text>
          <Text style={styles.memberTier}>
            { item.loyaltyTier.tierName }
          </Text>
        </View>
      </View>

      <View style={styles.rightPartContainer}>
        <View style={styles.bonusesContainer}>
          <Text style={styles.coupons}>
            {item.coupons || 0}
          </Text>
          <Image source={images['group-1']} style={styles.couponIcon} />
          <Text style={styles.points}>
            {_.floor(item.points) || 0}
          </Text>
          <Image style={styles.pointsIcon} source={images['group-10']} />
        </View>
        {/* { renderAdditionalInfo('200 Points Expiring in X Days') } */}
        { renderAdditionalInfo(' ') }

      </View>
    </TouchableOpacity>
  );

  renderMemberShips = (memberShips) => (
    memberShips.map((item, index) => {
      if (seeAllMemberShips) {
        return renderMemberShipItem(item);
      } else {
        if (index < 3)
          return renderMemberShipItem(item);
      }
    })
  );

  return (
    renderMemberShips(memberShips)
  );
};

export default MyMemberShipCard;
