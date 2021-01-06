import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    minHeight: 65.5,
    flexDirection: 'row',
    marginTop: 7.5,
    paddingBottom: 6.5,
    borderBottomWidth: 1,
    borderColor: '#F4F6FA',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  transactionText: {
    lineHeight: 18,
    marginBottom: 7,
    width: '150%',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.65)',
  },
  transactionDate: {
    marginBottom: 5,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.25)',
  },
  costContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  costText: {
    color: '#4681C3',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
});

export default styles;
