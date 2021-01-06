import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundContainer: {
    width: '100%',
    height: '100%',
  },
  joinContainer: {
    width: 250,
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },

  swiperDot: {
    backgroundColor:'#f8e71c',
    width: 40,
    height: 2.5,
    borderRadius: 2,
    marginLeft: 4.5,
    marginRight: 4.5,
  },
  swiperActiveDot: {
    backgroundColor: '#4076d9',
    width: 40,
    height: 2.5,
    borderRadius: 2,
    marginLeft: 4.5,
    marginRight: 4.5,
  },

  btn_custom: {
    width: 250,
    height: 40,
    margin:'auto',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#4076d9',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
  },
  btn_text: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
  },
  wrapper: {
  },

});

export default styles;
