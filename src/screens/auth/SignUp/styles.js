import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    flexBasis: 'auto',
  },
  mainContainer: {
    overflow: 'scroll',
    textAlign: 'center',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  estackkheading: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 25,
    fontFamily: 'MyriadPro-Bold',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 25
  },

  card: {
    height: 385,
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
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.85)'
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
    marginRight: 10
  },
  
  btn_custom: {
    width: 250,
    height: 40,
    marginBottom: 0,
    borderRadius: 5,
    overflow: 'hidden',
    margin: 'auto',
    backgroundColor: '#4076d9',
    color: 'white',
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  btn_text: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
  },

  forgot_password: {
    fontSize: 12,
    color: '#4076d9',
    fontFamily: 'Roboto-Regular',
    marginTop: 24
  },

  hairline: {
    position: 'relative',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  loginButtonBelowText1: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    paddingHorizontal: 9,
    alignSelf: 'center',
    color: 'rgba(0, 0, 0, 0.45)',
    backgroundColor: 'white',
    paddingBottom: 3
  },
  dash: {
    width: 100,
    height: 1,
  },
  googleSignInButton: {
    width: 192,
    height: 48,
  },
});

export default styles;
