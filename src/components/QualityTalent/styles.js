const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  main: {
    width: 160,
    marginLeft: 15,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    overflow: 'hidden'
  },
  des: {
    width: '100%',
    padding: 7,
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#000',
    textAlign: 'center',
  },
  designation: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginTop: -2,
  },
};
