import React from 'react';
import { FlatList } from 'react-native';

import TransactionsItem from './TransactionItem';
import styles from './styles';

const TransactionsList = (props) => {
  const { transactions } = props;

  return (
    <FlatList
      data={transactions}
      style={styles.container}
      renderItem={({ item }) =>
        <TransactionsItem
          _id={item._id}
          text={item.text}
          cost={item.cost}
          currency={item.currency}
          type={item.type}
          created_at={item.created_at}
        />
      }
    />
  );
};

export default TransactionsList;
