import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  headerTitleStyle: {
    color: 'rgba(0, 0, 0, 0.85)',
    textAlign: 'center',
    width: '75%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    zIndex: -100000,
  },

  //for andriod
  linearGradient_view: {
    borderColor: '#d6d8da',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1000
  },

  //for ios
  shadow: {
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000
  },

  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  scrollViewContent: {
    flexGrow: 1,
    width: '100%',
    flexBasis: 'auto',
  },
  mainContainer: {
    display: 'flex',
    padding: 20,
    paddingTop: 20,
    backgroundColor: "#f5f7f9",
  },
  backgroundImage: {
    minWidth: '95%',
    height: 213,
    padding: 20,
    paddingLeft: 25,
    borderRadius: 12,
    overflow: 'hidden',
  },
  viewCouponsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewCouponsText: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.65)",
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    opacity: .8,
  },
  group7: {
    height: 16,
    width: 16,
    marginLeft: 10,
  },
  memberShipText: {
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
  },
  pointsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointsSubcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  group20: {
    width: 20,
    height: 22,
  },
  user_name: {
    color: 'rgba(0, 0, 0, 0.65)',
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
  },

  card: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%'
  },
  cardInfoContainer: {
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

  image: {
    height: 20,
    width: 20,
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


  container: {
    backgroundColor: 'red'
  },

  slider_range: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#4a4a4a',
    fontSize: 14,
    marginTop: 5
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
});

export default styles;
