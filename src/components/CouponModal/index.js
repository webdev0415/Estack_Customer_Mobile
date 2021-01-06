import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Dash from 'react-native-dash';
import QRCode from 'react-native-qrcode-svg';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import _ from 'lodash';
import moment from 'moment';

import { images } from '../../constants/images';
import styles from './styles';

const width = Dimensions.get('window').width;

const CouponModal = (props) => {

  const {
    onSwipeUp,
    onSwipeDown,
    showCoupon,
    currentCoupon,
    redeem,
    isActive,
  } = props;

  renderStatus = (item) => {
    switch (item.status) {
      case 'CREATED':
        return (
          <TouchableOpacity
            style={[styles.btn_custom_redeemed, { opacity: isActive ? 1 : 0.4 }]}
            onPress={() => redeem(item.uuid, item.businessId)}
            disabled={!isActive}
          >
            <Text style={[styles.btn_text_redeemed, { marginTop: Platform.OS === 'ios' ? 0 : -2 }]}>Redeem</Text>
          </TouchableOpacity>
        );
      case 'REDEEMED':
        return (
          <View style={{ width: 110, position: 'absolute', top: 75, right: '0%' }}>
            <Text style={{ marginBottom: 17, marginLeft: '30%', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 0 : -2, fontSize: 14, fontFamily: 'Roboto', flexWrap: 'wrap', }}>
              Awaiting Approval
            </Text>
          </View>
        );
      case 'ACCEPTED':
        return (
          <View style={{ width: 70, position: 'absolute', top: 75, right: '-5%' }}>
            <Text style={{ width: '100%', marginBottom: 17, textAlign: 'center', marginTop: Platform.OS === 'ios' ? 0 : -2, fontSize: 14, fontFamily: 'Roboto', flexWrap: 'wrap', }}>
              Redeemed
            </Text>
          </View>
        );
      case 'DENIED':
        return (
          <View style={{ width: 105, position: 'absolute', top: 75, right: '-5%' }}>
            <Text style={{ width: '100%', marginLeft: 13, margifontnBottom: 17, textAlign: 'center', marginTop: Platform.OS === 'ios' ? 0 : -2, fontSize: 14, fontFamily: 'Roboto', flexWrap: 'wrap', }}>
              Cannot be Redeemend
            </Text>
          </View>
        );
    }
  };

  const convertId = () => _.padStart(currentCoupon.uuid, 6, '0');
  const expireAt = moment(currentCoupon.expireDate).fromNow();

  return (
    <View style={styles.couponModal}>
      <Text style={styles.swipe_text}>Swipe up to Redeem</Text>
      <Image source={images['uparrow']} style={styles.uparrow} />
      <GestureRecognizer onSwipeUp={() => redeem(currentCoupon.uuid, currentCoupon.businessId)} onSwipeDown={onSwipeDown}>
        <ImageBackground source={images['green']} style={[styles.popup_linearGradient, { width: width * .75, height: width * .75 }]}>
            <View style={styles.popupContainer}>
              <View style={styles.termsCont}>
                <Text style={styles.termsColor}>Terms and Conditions</Text>
                <Image source={images['group-7']} style={styles.termsIcon} />
              </View>
              <View style={styles.couponTotalInfo}>
                <View style={styles.percents}>
                  <Text style={styles.popup_coupon_text1}>{currentCoupon.cost} $</Text>
                  <Text style={styles.popup_coupon_text2}></Text>
                </View>
                <Text style={[styles.popup_coupon_text3, { marginTop: Platform.OS === 'ios' ? '4%' : '1%' }]}>Limited Value Coupon</Text>
                <Text style={[styles.popup_coupon_text4, { marginTop: Platform.OS === 'ios' ? '5%' : '3%' }]}>Expires {expireAt}</Text>
                <Dash style={styles.popup_dashed} dashLength={6} dashColor="#4a4a4a" dashThickness={1} />
                <View style={styles.popup_qr_div_position}>
                  <View style={styles.popupQrContainer}>
                    <View style={styles.popup_qr_bg}>
                      <QRCode
                        size={width * .275}
                        value={JSON.stringify(currentCoupon.uuid)}
                      />
                    </View>
                    <View style={styles.codeInfo}>
                      <Text style={styles.popup_coupon_text5}>C{convertId()}</Text>
                      { renderStatus(currentCoupon) }
                      
                    </View>
                  </View>
                </View>
              </View>
            </View>
        </ImageBackground>
      </GestureRecognizer>
      <Image source={images['downarrow']} style={styles.downArrow} />
      <Text style={styles.swipe_text}>Swipe down to Close</Text>
    </View>
  );
}

export default CouponModal;
