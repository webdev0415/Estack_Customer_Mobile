import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  linearGradient: {
    borderWidth: 0,
    borderColor: 'rgba(151, 151, 151, 0.18)',
    borderRadius: 6,
    position: 'relative',
    marginTop: 20,
    textAlign: 'center',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding:-4,
  },
  couponContainer: {
    height: '100%',
    padding: 10,
    paddingLeft: 20,
    position: 'relative',
  },
  infoImageOnCoupon: {
    width: 16,
    height: 16,
    marginLeft: 'auto',
  },
  couponSubContainer: {
    marginTop: -10,
    position: 'relative',
    height: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  coupon_text1: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: '#000000'
  },
  coupon_text2: {
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    color: '#000000'
  },
  coupon_text3: {
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    color: '#000000'
  },
  coupon_text4: {
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    color: 'rgba(0, 0, 0, 0.85)'
  },
  dashed: {
    height: .5,
    width: '90%',
    position: 'absolute',
    top: '45%',
    margin: 'auto',
    left: '0%',
    opacity: .85
  },
  qr_div_position: {
    position: 'absolute',
    bottom: '10%',
  },
  qrSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popup_qr_bg: {
    height: '100%',
    width: '54%',
    backgroundColor: 'white',
    padding: '3.8%'
  },
  coupon_text5: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: '15%'
  },
});

export default styles;
