const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#60a84e',
  },
  container: {
    width: '100%',
    paddingHorizontal: '6%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  hanPosition: {
    position: 'absolute',
    top: 15,
    left: '6%',
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
};
