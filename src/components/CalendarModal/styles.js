import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    height: 350,
    width: 300,
    marginTop: 175,
    marginLeft: '10%',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    display: 'flex',
  },
  closeButton: {
    paddingRight: 10,
    paddingTop: 5,
    alignItems: 'flex-end',
  },
  doneButton: {
    flex: 1,
    alignItems: 'center',
  },
});

export default styles;
