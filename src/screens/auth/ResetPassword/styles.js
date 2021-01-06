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
  },
  estackkheading: {
    marginTop: 15,
    marginBottom: 25,
    fontSize: 25,
    fontFamily: 'MyriadPro-Bold',
    fontWeight: 'bold',
    color:'rgba(0, 0, 0, 0.85)'
  },
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
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    color:'rgba(0, 0, 0, 0.85)'
  },
  goBack: {
    fontSize: 12,
    color: '#4076d9',
    marginTop: 20,
    fontFamily: 'Roboto-Regular',
  },
});

export default styles;
