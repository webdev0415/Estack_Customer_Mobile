import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    //for andriod
  linearGradient_view: {
    borderColor: '#d6d8da',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1000
  },

  //for ios
  shadow: {
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
    marginBottom: 35,
  },

  store_location: {
    padding: 22,
    paddingLeft: 20,
    paddingTop: 30,
  },
  store_image_view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  store_image: {
    width: 13,
    height: 13,
    // marginTop: Platform.OS === 'ios' ? 0 : 3,
    marginRight: 8
  },
  storename: {
    fontSize: 12,
    marginBottom: 10,
    color: 'black',
    fontFamily: 'Roboto-Regular'
  },
  store_address: {
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: 12,
    fontFamily: 'Roboto-Regular'
  },
});

export default styles;
