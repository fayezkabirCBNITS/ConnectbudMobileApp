const React = require('react-native');
const {Dimensions, Platform} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  heading: {
    fontSize: 20,
    color: '#71b85f',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
    marginBottom: 5,
  },
  slctCntry: {
    width: '100%',
    padding: 20,
    paddingTop: 10,
    borderColor: 'rgba(113,184,95,0.3)',
    borderWidth: 1,
    borderRadius: 5,
  },
  slctCntryText: {
    fontSize: 18,
    color: 'rgba(0,0,0,0.8)',
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  countryPicker: {
    width: '100%',
    height: 50,
    borderColor: 'rgba(113,184,95,0.7)',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
    marginTop: Platform.OS === 'ios' ? -84 : 0,
  },
  marVer20: {
    marginVertical: 20,
    backgroundColor: 'rgb(226,234,224)',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 0,
    paddingHorizontal: 15,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 10,
  },
  marBtm0: {
    marginBottom: 0,
  },
  scroll: {
    height: deviceHeight - 140,
  },
  submitBtn: {
    width: '50%',
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#71b85f',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  submitBtnText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  accountType: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden'
  },
  errorText: {
    width: '100%',
    color: '#fc0303',
  },
};
