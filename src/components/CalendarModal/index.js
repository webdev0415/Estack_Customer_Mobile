import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomButton from '../CustomButton';
import styles from './styles'

const { height, width } = Dimensions.get('window');

const CalendarModal = (props) => {
  const {
    date,
    showCalendar,
    closeCalendar,
    onChangeDate,
    dateDone,
  } = props;
  const currentDate = date ? new Date(date * 1000) : new Date();
  const maximumDate = new Date();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showCalendar}
    >
      <View style={[styles.card, { marginLeft: width <= 340 ? '3%' : '10%' }]}>
        <TouchableOpacity style={styles.closeButton} onPress={closeCalendar}>
          <Icon name='ios-close' color='black' size={40} />
        </TouchableOpacity>
        <DateTimePicker
          value={currentDate}
          mode='date'
          display="spinner"
          maximumDate={maximumDate}
          onChange={(event, date) => onChangeDate(date)}
        />
        <View style={styles.doneButton}>
          <CustomButton onPress={dateDone} text='Done' />
        </View>
      </View>
    </Modal>
  );
}

export default CalendarModal;
