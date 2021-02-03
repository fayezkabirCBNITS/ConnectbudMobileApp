const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  wrap: {
    width: 250,
    marginLeft: 15,
    borderColor: '#6fbb5c',
    borderWidth: 1,
    // borderWidth: 1,
    // borderColor: 'rgba(113,184,95,0.3)',
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
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 10,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  priceCircleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: '#fff',
    marginTop: 3
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
    height: 50,
  },
  knowMoreBtn: {
    width: '70%',
    height: 40,
    borderColor: 'rgba(113,184,95,0.8)',
    borderWidth: 1,
    marginRight: 'auto',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 'auto',
    paddingTop: 2
  },
  knowMoreBtnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  wrap2: {
    width: '100%',
    paddingHorizontal: '5%',
    height: 350,
  },
  swiperWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
};
