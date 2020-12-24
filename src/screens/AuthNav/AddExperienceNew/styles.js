const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  scroll: {
    height: deviceHeight - 84,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#71b85f',
    borderBottomWidth: 1,
  },
  image: {
    width: 140,
    height: 35,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginTop: 20,
    letterSpacing: 1,
  },
  textInput: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 5,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 15,
    marginTop: 10,
    fontFamily: 'Poppins-Regular'
  },
  textArea: {
    width: '100%',
    height: 110,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 5,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 15,
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'top'
  },
  additionalSec: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  additional: {
    width: '80%',
    height: 60,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 5,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 15,
    marginTop: 10,
    fontFamily: 'Poppins-Regular'
  },
  plusIcon: {
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',      
      backgroundColor: '#71b85f',
      borderRadius: 5,      
    marginTop: 10,
  },
  addBtn: {
      width: '60%',
      height: 50,
      borderRadius: 50 / 2,
      alignSelf: 'center',
      backgroundColor: '#71b85f',
      marginVertical: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 100
  },
  addBtnText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  }
};
