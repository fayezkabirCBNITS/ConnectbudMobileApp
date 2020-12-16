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
  image: {
    width: 140,
    height: 35,
  },
};
