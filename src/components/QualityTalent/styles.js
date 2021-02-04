const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  // main: {
  //   // width: 160,
  //   marginLeft: 15,
  // },
  // main: {
  //   width: 160,
  //   marginLeft: 15,
  // },
  main: {
    width: deviceWidth / 3.5,
    marginLeft: 15,
  },
  // image: {
  //   width: 160,
  //   height: 150,
  //   borderRadius: 5,
  //   overflow: 'hidden',
  //   alignSelf: 'center',
  // },
  // image: {
  //   width: '100%',
  //   height: 150,
  //   borderRadius: 5,
  //   overflow: 'hidden'
  // },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    overflow: 'hidden'
  },
  des: {
    width: '100%',
    padding: 7,
    alignItems: 'center',
  },
  // name: {
  //   fontFamily: 'Poppins-SemiBold',
  //   fontSize: 17,
  //   color: '#000',
  //   textAlign: 'center',
  // },
  // designation: {
  //   fontFamily: 'Poppins-Regular',
  //   fontSize: 14,
  //   color: '#000',
  //   textAlign: 'center',
  //   marginTop: -2,
  // },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#3e4864',
    textAlign: 'center',
  },
  designation: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#7e7e7e',
    textAlign: 'center',
    // marginTop: -2,
  },
  wrap: {
    width: '100%',
    paddingHorizontal: '5%',
    height: 250,
  },
  swiperWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
};
