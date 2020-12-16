const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  portfolioHead: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 16,
    color: '#71b85f',
  },
  noData: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight - 470,
  },
  noDataText: {
    marginTop: 15,
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
  },
};
