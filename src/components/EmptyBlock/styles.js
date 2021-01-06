import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 21, 41, 0.12)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.17,
    shadowRadius: 2,
    elevation: 0,
    backgroundColor: '#f4f6fa',
    borderRadius: 6,
    padding: 20,
  },
  text: {
    color: 'rgba(0, 0, 0, 0.45)',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
  },
});

export default styles;
