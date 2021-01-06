import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Dash from 'react-native-dash';
import QRCode from 'react-native-qrcode-svg';
import _ from 'lodash';
import moment from 'moment';

import { images } from '../../constants/images';
import styles from './styles';

const width = Dimensions.get('window').width

const CouponItem = (props) => {
  const {
    item,
    _id,
    uuid,
    cost,
    index,
    status,
    expireDate,
    showCouponHandler,
  } = props;

  const convertId = () => _.padStart(uuid, 6, '0');
  const expire = new Date(expireDate).getTime() / 1000 > new Date().getTime() / 1000
                 ? `Expires ${moment(expireDate).fromNow()}`
                 : 'Expired';

  return (
    <TouchableOpacity key={_id} onPress={() => showCouponHandler(item, index)}>
      <ImageBackground source={status === 'CREATED' || 'REDEEMED' ? images['blue'] : images['greenbg']} style={[styles.linearGradient, { width: width * .42, height: width * .42 }]}>
        <View style={styles.couponContainer}>
          <Image source={images['group-7']} style={styles.infoImageOnCoupon} />
          <View style={styles.couponSubContainer}>
            <View style={styles.details}>
              <Text style={styles.coupon_text1}>{cost} $</Text>
              <Text style={styles.coupon_text2}></Text>
            </View>
            <Text style={[styles.coupon_text3, { marginTop: Platform.OS === 'ios' ? '2%' : '0%' }]}>
              Limited Value Coupon
            </Text>
            <Text style={[styles.coupon_text4, { marginTop: Platform.OS === 'ios' ? '2%' : '0%' }]}>
              {expire}
            </Text>

            <Dash
              style={styles.dashed}
              dashLength={6}
              dashColor="#4a4a4a"
              dashThickness={1}
            />
            <View style={styles.qr_div_position}>
              <View style={styles.qrSubContainer}>
                <View style={styles.qr_bg}>
                  <QRCode size={width * .1} value={JSON.stringify(uuid)}/>
                </View>
                <Text style={styles.coupon_text5}>C{convertId()}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CouponItem;
