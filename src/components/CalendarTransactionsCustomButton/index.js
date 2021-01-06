import React from 'react';
import { View, Button } from 'react-native';

const CalendarButton = (props) => {
  const { onConfirm } = props;

  return (
    <View style={{ borderRadius: 5, overflow: 'hidden' }}>
      <Button
        onPress={onConfirm}
        style={{ container: { width: '80%', marginHorizontal: '3%' }, text: { fontSize: 20 } }}
        primary
        title='Select'
        color='#4076d9'
      />
    </View>
  );
};

export default CalendarButton;
