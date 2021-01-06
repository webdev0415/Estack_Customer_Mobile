import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';

import Convert from '../../../../components/NewStoreCouponModal';
import CouponModal from '../../../../components/CouponModal';
import SmallCoupon from '../../../../components/SmallCoupon';
import { images } from '../../../../constants/images';
import styles from './styles';

const width = Dimensions.get('window').width

const StoreCoupons = (props) => {
  const {
    onSwipeUp,
    onSwipeDown,
    showCouponHandler,
    learnMore,
    showCoupon,
    showCouponModal,
    startSpinner,
    currentShop,
    user,
    spinner,
    coupons,
    currentCoupon,
    openConvert,
    closeConvert,
    convertVisible,
    onCreateCoupon,
    redeem,
    currentCouponIndex,
  } = props;

  const renderNoCoupons = () => {
    if (coupons.length === 0) {
      return (
        <ImageBackground style={[styles.noCouponsContainer, { width: width * .42, height: width * .42 }]} source={images['noCoupons']}>
          <Text style={styles.noCouponsText}>
            No Coupons
          </Text>
        </ImageBackground>
      )
    }
  }

  const renderCouponModal = () => {
    if (showCoupon) {
      return (
        <CouponModal
          currentCoupon={coupons[currentCouponIndex]}
          onSwipeUp={onSwipeUp}
          onSwipeDown={onSwipeDown}
          showCoupon={showCoupon}
          redeem={redeem}
          isActive={currentShop.business.loyaltyProgram.isActive}
        />
      );
    }
  };

  let bg = 'goldMember';
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
      default: bg = 'goldMember';
    }
  };

  const points = _.floor(currentShop.points);

  return (
    <>
    { renderCouponModal() }

    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
        <View style={styles.mainContainer}>
          <ImageBackground source={images[bg]} style={styles.background}>
            <View style={styles.card}>
              <View style={styles.learnMoreContainer}>
                <TouchableOpacity onPress={learnMore}>
                  <Text style={styles.learnMoreText}>Learn More</Text>
                </TouchableOpacity>
                <Image source={images['group-7']} style={styles.infoImage} />
              </View>

              <View style={styles.storeImageContainer}>
                <Image
                  style={styles.image}
                  source={currentShop.business.image ? { uri: currentShop.business.image.ref } : images['defaultStore']}
                />
              </View>

              <View>
                <Text style={[styles.user_name, { marginBottom: Platform.OS === 'ios' ? 5 : 0 }]}>
                  { user.fullName }
                </Text>
                <Text style={styles.nameText}>
                  {currentShop.customerTier.userLoyaltyTier.tierName}
                </Text>
              </View>
              <View style={styles.cardBottomContainer}>
                <View style={styles.userPointsContainer}>
                  <Image style={styles.pointsImage} source={images['group-20']} />
                  <Text style={styles.point}>
                    {points}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.btn_custom, { opacity: currentShop.business.loyaltyProgram.isActive ? 1 : 0.4 }]}
                  onPress={openConvert}
                  disabled={!currentShop.business.loyaltyProgram.isActive}
                >
                  <Text style={[styles.btn_text, { marginTop: Platform.OS === 'ios' ? 0 : -2 }]}>
                    Convert
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        </ImageBackground>

        <Text style={styles.your_coupon}>Your Coupons</Text>
        <Spinner
          visible={spinner}
          animation='fade'
        />
        <Convert
          currentShop={currentShop}
          visible={convertVisible}
          cancelHandler={closeConvert}
          onCreateCoupon={onCreateCoupon}
          closeConvert={closeConvert}
        />
        <View style={styles.couponsContainer}>
        { renderNoCoupons() }
        <SmallCoupon
          coupons={coupons}
          showCouponHandler={showCouponHandler}
        />
        </View>
      </View>

    </ScrollView>
    </>
  );
};

export default StoreCoupons;

