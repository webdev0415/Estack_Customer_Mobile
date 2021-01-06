import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    height: 335,
    width: 300,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    display: 'flex',
    alignItems: 'center'
  },
  login_header: {
    marginTop: 30,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    color:'rgba(0, 0, 0, 0.85)'
  },
  google_signin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOffset: { width: .1, height: .1 },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 0,
    borderRadius: 3,
    borderWidth: 0,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    height: 40,
    width: 185,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold'
  },
  googleSignIn: {
    width: 192,
    height: 48,
    color:'rgba(0, 0, 0, 0.54)',
  },
  hairline: {
    position: 'relative',
    margin:'auto',
    marginTop: 20,
    marginBottom:-10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  dash: {
    width: 100,
    height: 1,
  },
  loginButtonBelowText1: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    paddingHorizontal: 9,
    alignSelf: 'center',
    color: 'rgba(0, 0, 0, 0.45)',
    backgroundColor: 'white',
    paddingBottom:3
  },
  forgot_password: {
    fontSize: 12,
    color: '#4076d9',
    marginTop: 13,
    fontFamily: 'Roboto-Regular',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 13,
  },
});

export default styles;
