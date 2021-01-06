import React from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import DatePicker from 'react-native-date-ranges';
import { Dropdown } from 'react-native-material-dropdown';

import TransactionsList from '../../../../components/TransactionsList';
import CustomButton from '../../../../components/CalendarTransactionsCustomButton';
import EmptyBlock from '../../../../components/EmptyBlock';
import styles from './styles';

const Transaction = (props) => {

  const customButton = (onConfirm) => (
    <CustomButton onConfirm={onConfirm} />
  );

  const renderEmptyBlock = () => {
    if (props.transactions.length === 0) {
      return <EmptyBlock content='You do not have any transactions' />
    }
  };

  const onRefresh = () => {
    props.refreshOn();
    props.cancelFilter();
    props.onGetTransactions();
    props.onGetTotals();
    setTimeout(() => props.refreshOff(), 1000);
  }

  const {
    data,
    spent,
    earned,
    refreshing,
    transactions,
    from,
    to,
    type,
    setDate,
    setType,
  } = props;

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      }
    >
      <View style={styles.mainContainer}>
        <View style={styles.cardsContainer}>
          <Text style={styles.reward_text}>Point Summary</Text>
            <View style={styles.card_align}>
              <View style={styles.reward_summary_card}>
                <Text style={styles.point_text}>Points Earned</Text>
                <Text style={styles.card_value}>{earned || 0}</Text>
              </View>
              <View style={styles.reward_summary_card}>
                <Text style={styles.point_text}>Points Spent</Text>
                <Text style={styles.card_value}>{spent || 0}</Text>
              </View>
            </View>
          </View>
          <View style={styles.filtersContainer}>
            <View style={styles.oneCard}>
              <Text style={styles.transaction}>Transaction Duration</Text>
              <DatePicker
                selectedBgColor="#4076d9"
                selectedTextColor="white"
                style={styles.datePicker}
                customStyles={{
                  placeholderText: styles.datePickerPlaceholder,
                  headerStyle: styles.datePickerHeader,
                  headerMarkTitle: {},
                  headerDateTitle: {},
                  contentInput: {},
                  contentText: styles.datePickerContent,
                }}
                centerAlign
                allowFontScaling={false}
                placeholder={`${from} - ${to}`}
                mode='range'
                markText="Pick Range"
                customButton={customButton}
                returnFormat='MM/DD/YYYY'
                headFormat='MM/DD/YYYY'
                outFormat='MM/DD/YYYY'
                onConfirm={setDate}
              />
            </View>
            <View style={styles.oneCard}>
              <Text style={styles.transaction}>Transaction Type</Text>
              <Dropdown
                fontSize={12}
                dropdownOffset={styles.dropdownOffset}
                containerStyle={styles.dropdownContainer}
                inputContainerStyle={styles.dropdownInputContainer}
                data={data}
                value={type}
                textColor='rgba(0, 0, 0, 0.25)'
                rippleCentered={true}
                onChangeText={setType}
              />
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.transaction}>Transactions</Text>
            <View style={[ styles.transactionsLine, { marginBottom: transactions.length === 0 ? 7 : 0 } ]} />
            { renderEmptyBlock() }
            <TransactionsList transactions={transactions} />      
          </View>
        </View>
    </ScrollView>
  );
}

export default Transaction;
