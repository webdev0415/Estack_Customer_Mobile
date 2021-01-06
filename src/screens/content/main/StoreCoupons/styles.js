import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerTitle: {
    color: 'rgba(0, 0, 0, 0.85)',
    textAlign: 'center',
    width: '75%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    zIndex: -100000,
  },
  noCouponsContainer: {
    marginTop: 19,
    justifyContent: 'center',
  },
  noCouponsText: {
    color: 'rgba(0, 0, 0, 0.65)',
    lineHeight: 16,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    opacity: 0.43,
    textAlign: 'center',
  },
  scrollView: {
    backgroundColor: '#f5f7f9',
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    flexBasis: 'auto',
    position: 'relative',
  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    padding: 20,
    paddingTop: 20,
    backgroundColor: '#f5f7f9',
  },
  background: {
    minWidth: '95%',
    height: 213,
    padding: 20,
    paddingLeft: 25,
    borderRadius: 12,
    overflow: 'hidden',
  },
  learnMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  learnMoreText: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.65)",
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    opacity: .8,
  },
  infoImage: {
    height: 16,
    width: 16,
    marginLeft: 10,
  },
  storeImageContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
  },
  nameText: {
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
  },
  cardBottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userPointsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsImage: {
    width: 20,
    height: 22,
  },
  couponsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
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
  user_name: {
    color: 'rgba(0, 0, 0, 0.65)',
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%'
  },
  image: {
    height: 22,
    width: 22,
    borderRadius: 100,
    resizeMode: 'contain',
    padding: 10
  },
  point: {
    marginLeft: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.65)'
  },
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
  btn_custom: {
    borderRadius: 2,
    overflow: 'hidden',
    margin: 'auto',
    backgroundColor: '#4076d9',
    color: 'white',
    width: 65,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  btn_text: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  your_coupon: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: 'rgba(0, 0, 0, 0.65)',
    marginTop: 20,
    fontWeight: 'bold'
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
  coupon_text5: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: '15%'
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
  qr_bg: {
    height: '100%',
    width: '39.5%',
    backgroundColor: 'white',
    padding: '4%'
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
  popup_linearGradient: {
    borderWidth: 0,
    borderColor: 'rgba(151, 151, 151, 0.18)',
    borderRadius: 6,
    position: 'relative',
    marginTop: 20,
    textAlign: 'center',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  couponModal: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  uparrow: {
    width: 35,
    height: 42,
    marginTop: -20,
  },
  popupContainer: {
    height: '100%',
    padding: 20,
    paddingLeft: '10%',
    position: 'relative',
  },
  termsCont: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsColor: {
    color: '#000000',
    opacity: 0.69,
    fontSize: 10,
    marginRight: 8,
    fontFamily: 'Roboto-Regular',
  },
  termsIcon: {
    width: 16,
    height: 16,
  },
  couponTotalInfo: {
    marginTop: -10,
    position: 'relative',
    height: '100%',
  },
  percents: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  popupQrContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeInfo: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  downArrow: {
    width: 35,
    height: 42,
    marginBottom: -20,
  },
  popup_coupon_text1: {
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: '#000000'
  },
  popup_coupon_text2: {
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    color: '#000000'
  },
  popup_coupon_text3: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    color: '#000000'
  },
  popup_coupon_text4: {
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    color: '#000000',
    opacity: .69
  },
  popup_coupon_text5: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: '15%'
  },
  popup_dashed: {
    height: .5,
    width: '90%',
    position: 'absolute',
    top: '46%',
    margin: 'auto',
    left: '3%',
    opacity: .85
  },
  popup_qr_bg: {
    height: '100%',
    width: '54%',
    backgroundColor: 'white',
    padding: '3.8%'
  },
  popup_qr_div_position: {
    position: 'absolute',
    bottom: '1%',
  },
  swipe_text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Regular'
  },
  btn_custom_redeemed: {
    borderRadius: 2,
    overflow: 'hidden',
    margin: 'auto',
    backgroundColor: 'transparent',
    color: 'white',
    borderColor: '#000000',
    borderWidth: 1,
    width: 65,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn_text_redeemed: {
    color: '#000000',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
});

export default styles;
