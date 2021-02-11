const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  padHz5: {
    paddingHorizontal: '5%',
  },
  updateDocument: {
    width: '100%',
  },
  newDocumentSec: {
    width: deviceWidth / 1.3,
    height: 170,
    backgroundColor: '#fff',
    marginLeft: 20,
    padding: 10,
    borderColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
