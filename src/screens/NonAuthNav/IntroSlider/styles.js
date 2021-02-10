const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgSec: {
    overflow: 'hidden',
    width: '100%',
    alignItems: 'center',
  },
  infoSec: {
    width: '100%',
    paddingHorizontal: '7%',
  },
  hdng: {
    fontSize: 35,
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    textAlign: 'center',
  },
  wid100: {
    width: '100%',
  },
  nextBtn: {
    width: '86%',
    height: 46,
    borderRadius: 46 / 2,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#71b85f',
  },
  nextBtnText: {
    fontSize: 18,
    marginTop: 3,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    textAlign: 'center',
  },
  dotStyle: {
    width: 13,
    height: 13,
    borderRadius: 13 / 2,
    backgroundColor: '#dbdbdb',
    marginBottom: deviceHeight / 4,
  },
  activeDotStyle: {
    width: 13,
    height: 13,
    borderRadius: 13 / 2,
    marginBottom: deviceHeight / 4,
    backgroundColor: '#71b85f',
  },
};
