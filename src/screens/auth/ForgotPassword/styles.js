import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    height: 200,
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
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    color:'rgba(0, 0, 0, 0.85)'
  },
  forgot_password: {
    fontSize: 12,
    color: '#4076d9',
    fontFamily: 'Roboto-Regular',
    marginTop: 24
  },
});

export default styles;
