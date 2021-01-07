const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  back: {
    width: '100%',
    paddingHorizontal: '5%',
    height: 70,
    justifyContent: 'center',
  },
  hdngText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    fontSize: 25,
    textAlign: 'left',
    marginTop: -5,
  },
  inputField: {
    marginVertical: 35,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    color: 'rgba(0,0,0,0.7)',
    fontSize: 18,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 50,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    fontSize: 16,
    textAlign: 'left',
    borderBottomColor: 'rgba(0,0,0,0.3)',
    borderBottomWidth: 1,
  },
  btn: {
    width: '70%',
    backgroundColor: '#71b85f',
    height: 55,
    borderRadius: 55 / 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
};
