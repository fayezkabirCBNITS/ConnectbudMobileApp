const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  imgSec: {
    width: '100%',
    height: 120,
    padding: 25,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  headText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  detailsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#7e7e7e',
    textAlign: 'center',
  },
  width200: {
    width: 200,
  },
};
