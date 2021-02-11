const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  formGroup: {
    width: '100%',
    height: 50,
    marginBottom: 5,
    borderRadius: 7,
    fontSize: 16,
    paddingHorizontal: 15,
    borderColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Regular'
  },
  formGroup2: {
    width: '100%',
    height: 100,
    marginBottom: 5,
    borderRadius: 7,
    fontSize: 16,
    paddingHorizontal: 15,
    borderColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
    textAlignVertical: 'top',
    fontFamily: 'Poppins-Regular'
  },
  authBtn: {
    width: '55%',
    // marginHorizontal: '8%',
    height: 50,
    borderRadius: 40,
    backgroundColor: '#71b85f',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  authBtnText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1,
    marginTop: 4,
  },
  errorText: {
    width: '100%',
    color: '#fc0303',
    marginLeft: 14,
  },
};
