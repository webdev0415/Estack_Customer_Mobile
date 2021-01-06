import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  new_store_card: {
    width: '31%',
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '1%',
    marginLeft: '1%',
    marginBottom: 15,
  },
  storeIcon: {
    width: 70,
    height: 40,
    resizeMode: 'contain',
  },
});

export default styles;
