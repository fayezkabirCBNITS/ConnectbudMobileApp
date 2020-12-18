const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  wrap: {
    width: 250,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: 'rgba(113,184,95,0.3)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  imgSec: {
    width: '100%',
    height: 120,
  },
  priceCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#000',
    position: 'absolute',
    top: 10,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  priceCircleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: '#fff',
  },
  content: {
    padding: 10,
  },
  hdng: {
    fontFamily: 'Poppins-Regular',
    fontSize: 19,
    height: 60,
  },
  boldText: {
    marginTop: -2,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    marginBottom: 10,
  },
  knowMoreBtn: {
    width: '60%',
    height: 40,
    borderColor: 'rgba(113,184,95,0.8)',
    borderWidth: 1,
    marginLeft: 'auto',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 'auto',
  },
  knowMoreBtnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
};