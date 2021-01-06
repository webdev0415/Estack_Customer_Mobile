import React from 'react';
import { FlatList } from 'react-native';

import CouponItem from './CouponItem';

const SmallCoupon = (props) => {

  const { showCouponHandler, coupons } = props;

  const renderAll = () => {
    return coupons.map((item, index) => (
      <CouponItem
        key={item._id}
        item={item}
        _id={item._id}
        status={item.status}
        expireDate={item.expireDate}
        cost={item.cost}
        expireDate={item.expireDate}
        uuid={item.uuid}
        showCouponHandler={showCouponHandler}
        index={index}
      />
    ))
  }

  return (
    renderAll()
  );
};

export default SmallCoupon;
