const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  imgSec: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  center: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#000',
  },
  desig: {
    marginTop: -5,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: '5%',
  },
  feedback: {
    width: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
  },
  wrap: {
    width: '100%',
    height: 370,
  },
  feedbackSec: {
    paddingHorizontal: '7%',
    marginTop: 5,
  },
};
