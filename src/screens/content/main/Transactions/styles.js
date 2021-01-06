import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    width: '94%',
    marginLeft: '3.5%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: 'white',
  },
  cardsContainer: {
    width: '100%',
    marginTop: 15,
  },
  filtersContainer: {
    width: '100%',
    marginTop: 22,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  oneCard: {
    width: '48%',
  },
  datePicker: {
    width: '100%',
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    backgroundColor: 'white',
  },
  datePickerPlaceholder: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.25)',
    fontFamily: 'Roboto-Regular',
  },
  datePickerHeader: {
    backgroundColor: '#4076d9',
  },
  datePickerContent: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.25)',
    fontFamily: 'Roboto-Regular',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    height: 30,
    borderRadius: 4,
    paddingLeft: 7,
    paddingTop: 3.5, 
  },
  dropdownInputContainer: {
    borderBottomColor: 'transparent',
  },
  dropdownOffset: {
    top: 1.8,
    left: 0,
  },
  bodyContainer: {
    width: '100%',
    marginTop: 20,
  },
  transactionsLine: {
    width: '100%',
    height: 1,
    borderBottomWidth: 1,
    borderColor: '#F4F6FA',
  },

  reward_text: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.65)',
    marginBottom: 15
  },
  transaction:{
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.65)',
    marginBottom: 11,
    opacity:.9
  },
  card_align: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  reward_summary_card: {
    width: '48%',
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between'
  },
  point_text: {
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.65)',
    opacity:.85
  },
  card_value: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4076d9',
    opacity:.85
  },
});

export default styles;
