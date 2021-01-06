import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import RangeSlider from 'rn-range-slider';
import Modal from "react-native-modal"
import _ from 'lodash';

import { images } from '../../constants/images';
import styles from './styles';

let range;
const NewStoreCouponModal = (props) => {
  const { currentShop, onCreateCoupon, cancelHandler, closeConvert } = props;

  const create = () => {
    onCreateCoupon({ businessId: currentShop.business._id, cost: pointsValue});
  };

  const step = 10;
  const min = 1 / currentShop.business.pointCurrency.calcFactor;

  const [pointsValue, changePoints] = useState(min);

  const max = currentShop.points < currentShop.business.pointCurrency.maxPurchase
              ? currentShop.points
              : currentShop.business.pointCurrency.maxPurchase;
  const maxRange = max > min ? _.floor(Math.trunc(max / 10) * 10) : currentShop.business.pointCurrency.maxPurchase;
  const couponValue = pointsValue ? _.round(pointsValue * currentShop.business.pointCurrency.calcFactor) : 0;
  const balance = _.floor(currentShop.points);
  const disabled = !(pointsValue >= min) || pointsValue > currentShop.points;
  const test = (value) => range.setLowValue(value)
  
  return (
    <View style={styles.container}>
      <Modal dialogStyle={styles.popup_dialog}
        onBackButtonPress={props.cancelHandler}
        onBackdropPress={props.cancelHandler}
        backdropOpacity={0.65}
        isVisible={props.visible}
        onTouchOutside={props.cancelHandler}
      >
        <View style={styles.popup_dialog}>
          <View style={styles.subContainer}>
            <Text style={styles.popup_heading}>
              Convert Points
            </Text>
            <TouchableOpacity onPress={props.cancelHandler}>
              <Image source={images['group-12']} />
            </TouchableOpacity>
          </View>
          <Text style={styles.para}>
            Sepecify points or use the Slider and choose the points to create a coupon.
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 14 }}>
            <View>
              <Text style={styles.title_header}>
                Points to Convert
              </Text>
              <Text style={[styles.pointsInput, { textAlign: 'center', height: 35, paddingTop: '7%' }]}>
                {pointsValue}
              </Text>
              {/*<TextInput
                value={pointsValue}
                onChangeText={value => {changePoints(value); test(value)}}
                style={[styles.pointsInput, { textAlign: 'center', height: 35, paddingTop: '7%' }]}
              />*/}
            </View>
            <View>
              <Text style={styles.title_header}>
                Coupon Value
              </Text>
              <Text style={{ color: '#4076d9', fontSize: 14, fontFamily: 'Roboto-Regular', paddingTop: '7%' }}>
                $ {couponValue}
              </Text>
            </View>
          </View>
          <View style={styles.slider_view}>
            <RangeSlider
              ref={ref => range = ref}
              style={{ width: '100%', height: 80 }}
              gravity={'center'}
              min={min}
              max={250}
              step={step}
              rangeEnabled={false}
              selectionColor="#44dec5"
              blankColor="#e6e6e6"
              lineWidth={8}
              labelBackgroundColor="#44dec5"
              labelBorderColor="#fff"
              labelTextColor="#000"
              labelPadding={10}
              thumbBorderColor="#d9d9d9"
              onValueChanged={value => changePoints(value)}
            />
            <View style={styles.slider_range}>
              <Text style={styles.slider_range_text}>{min}</Text>
              <Text style={styles.slider_range_text}>{250}</Text>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#4a4a4a', fontFamily: 'Roboto-Bold', }}>
              Point Balance
            </Text>
            <Text style={styles.balance_point_value}>
              { balance }
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={cancelHandler}
            >
              <Text style={styles.cancel_text}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn_convert, { opacity: disabled ? 0.4 : 1 }]}
              onPress={create}
              disabled={disabled}
            >
              <Text style={styles.btn_text}>
                Convert
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewStoreCouponModal;
