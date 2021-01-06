import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    flexBasis: 'auto',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileContainer: {
    width: '90%',
    marginTop: 20,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    marginTop: 25,
 },
 user_name: {
    fontSize: 16,
    color: '#4a4a4a',
    marginTop: 13,
    fontFamily: 'Roboto-Regular',
 },
 inline_info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#f4f6fa'
 },
 key_text: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.65)',
    fontFamily: 'Roboto-Regular',
 },
 key_text_value: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Roboto-Regular',
 },
 button: {
    alignItems: 'center',
    backgroundColor: 'white',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 4,
    overflow: 'hidden',
    borderColor: '#4076d9',
    borderWidth: 1,
    color: '#4076d9',
    marginTop: -7,
    width: 250,
    height: 40,
 },
 btn_custom: {      
    marginBottom: 0,
    marginTop: 20,
    borderRadius: 4,
    overflow: 'hidden',
    margin: 'auto',
    backgroundColor: '#4076d9',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    color: 'white',
    width: 250,
    height: 32,
 },
 btn_text: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    marginTop:Platform.OS === 'ios' ? 0 : -2,
 },
 btn_text_reset: {
    color: '#4076d9',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    marginTop:Platform.OS === 'ios' ? 0 : -2,
 },
 logo:{
    marginTop:30
 },
});

export default styles;

