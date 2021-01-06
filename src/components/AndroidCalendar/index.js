import React from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

const AndroidCalendar = (props) => {
  const {
    date,
    closeCalendar,
    showCalendar,
    onChangeDate,
    dateDone
  } = props;
  const currentDate = date ? new Date(date * 1000) : new Date();
  const maximumDate = new Date();

  if (!showCalendar) {
    return null;
  }
    return (
      <DateTimePicker
        value={currentDate}
        mode='date'
        maximumDate={maximumDate}
        display="default"
        onChange={(event, date) => {
          closeCalendar();
          onChangeDate(date);
          dateDone();
          
        }}
      />
  );
};

export default AndroidCalendar;
