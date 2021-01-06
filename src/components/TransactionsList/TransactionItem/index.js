import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import styles from './styles';

const TransactionItem = (props) => {
  const {
    _id,
    text,
    cost,
    currency,
    type,
    created_at,
  } = props;

  return (
    <View key={_id} style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.transactionText}>
          { text }
        </Text>
        <Text style={styles.transactionDate} >
          { moment(created_at).format("DD MMM YYYY") }
        </Text>
      </View>
      <View style={styles.costContainer}>
        <Text style={styles.costText}>
          {_.round(cost, 4)}{currency}
        </Text>
      </View>
    </View>
  );
};

export default TransactionItem;
