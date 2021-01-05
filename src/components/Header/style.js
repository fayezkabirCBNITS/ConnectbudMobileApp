const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  header: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#71b85f',
    borderBottomWidth: 1,
  },
  online: {
    width: 13,
    height: 13,
    borderRadius: 12 / 2,
    backgroundColor: '#FF0000',
    position: 'absolute',
    bottom: 23,
    right: 2,
    left: 8,
    zIndex: 999,
  },
  image: {
    width: 140,
    height: 35,
  },
};
