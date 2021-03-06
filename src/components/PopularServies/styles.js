const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  main: {
    width: 160,
    marginLeft: 15,
  },
  // image: {
  //   width: '50%',
  //   height: 75,
  //   borderRadius: 5,
  //   overflow: 'hidden',
  // },
  image: {
    width: '50%',
    height: 75,
    borderRadius: 5,
    overflow: 'hidden',
  },
  des: {
    width: '100%',
    padding: 7,
    alignItems: 'center',
  },
  smText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  lgText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginTop: -2,
  },
  // popSec: {
  //   width: 200,
  //   marginLeft: 15,
  //   borderColor: '#6fbb5c',
  //   borderWidth: 2,
  //   padding: 10,
  //   paddingVertical: 20,
  //   alignItems: 'center',
  //   borderRadius: 7,
  //   backgroundColor: 'rgba(52,52,52,0.11)'
  // },
  popSec: {
    width: deviceWidth / 2.25,
    marginLeft: 15,
    borderColor: '#6fbb5c',
    borderWidth: 2,
    padding: 10,
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: 'rgba(52,52,52,0.11)'
  },
  marTop20: {
    marginTop: 20,
    justifyContent: 'center',
    height: 55,
  },
  wrap: {
    width: '100%',
    paddingHorizontal: '5%',
    height: 200,
  },
};
