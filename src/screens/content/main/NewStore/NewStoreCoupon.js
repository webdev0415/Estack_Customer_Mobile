import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';

import { images } from '../../../../constants/images';
import NewStoreCouponModal from '../../../../components/NewStoreCouponModal';
import MemberShipcard from '../../../../components/MemberShipCard';
import StoreLocation from '../../../../components/StoreLocations';

import styles from './styles';

const NewStoreCoupon = (props) => {
  const { currentShop, user, join, onCreateCoupon, point_value } = props;

  const renderUserTierInfo = () => {
    if (currentShop.customerTier) {
      return (
        <View style={styles.pointsContainer}>
          <View style={styles.pointsSubcontainer}>
            <Image style={styles.group20} source={images['group-20']} />
            <Text style={styles.point}>{point_value}</Text>
          </View>
          <TouchableOpacity
            style={[styles.btn_custom, { opacity: currentShop.business.loyaltyProgram.isActive ? 1 : 0.4 }]}
            onPress={props.openConvert}
            disabled={!currentShop.business.loyaltyProgram.isActive}
          >
            <Text style={styles.btn_text}>Convert</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.pointsContainer}>
        <View style={[styles.pointsSubcontainer, { opacity: 0 }]}>
          <Image style={styles.group20} source={images['group-20']} />
          <Text style={styles.point}>{point_value}</Text>
        </View>
        <TouchableOpacity style={styles.btn_custom} onPress={join}>
          <Text style={styles.btn_text}>Join</Text>
        </TouchableOpacity>
      </View>
      );
    }
  }

  const renderMemberShip = () => {
    if (currentShop.customerTier) {
      return (
        <Text style={styles.memberShipText}>
          { currentShop.customerTier.userLoyaltyTier.tierName }
        </Text>
      );
    } else {
      return (
        <Text style={styles.memberShipText}>
          Become a Member
        </Text>
      );
    }
  };

  const renderNewStoreCouponModal = () => {
    if (currentShop.customerTier && currentShop.business.pointCurrency) {
      return (
        <NewStoreCouponModal
          currentShop={currentShop}
          visible={props.visible}
          cancelHandler={props.cancelHandler}
          onCreateCoupon={onCreateCoupon}
        />
      );
    }
  }

  const renderViewCoupons = () => {
    if (currentShop.customerTier) {
      return (
        <>
          <TouchableOpacity onPress={props.gotoexistingstore}>
            <Text style={styles.viewCouponsText}>
              View Coupons
            </Text>
          </TouchableOpacity>
          <Image source={images['group-7']} style={styles.group7} />
        </>
      )
    }
  };

  let bg = 'becomeMember';
  if (currentShop.customerTier) {
    switch (currentShop.customerTier.userLoyaltyTier.tierLevel) {
      case 1:
        bg = 'goldMember';
        break;
      case 2:
        bg = 'platinumMember';
        break;
      case 3:
        bg = 'clubMember';
        break;
      default: bg = 'becomeMember';
    }
  };

  return (
    <ScrollView
      style={styles.scrollViewContainer}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainContainer}>
        <ImageBackground source={images[bg]} style={styles.backgroundImage}>
          <View style={styles.card}>
            <View style={styles.viewCouponsContainer}>
              { renderViewCoupons() }
            </View>
            <View style={styles.cardInfoContainer}>
              <Image
                style={styles.image}
                source={currentShop.business.image ? { uri: currentShop.business.image.ref } : images['defaultStore']}
              />
            </View>
            <View>
              <Text style={styles.user_name}>{user.fullName}</Text>
              { renderMemberShip() }
            </View>
            { renderUserTierInfo() }
          </View>
          { renderNewStoreCouponModal() }

        </ImageBackground>

        <MemberShipcard
          currentShop={currentShop}
          point_value={props.point_value}
          gotostore={props.gotoexistingstore}
        />

        <StoreLocation places={currentShop.business.places}/>
      </View>
    </ScrollView >
  )
}

export default NewStoreCoupon