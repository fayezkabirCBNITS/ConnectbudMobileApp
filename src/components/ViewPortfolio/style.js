const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  padHz5: {
    paddingHorizontal: '5%',
  },
  portfolio: {
    width: '100%',
  },
  newportfolioSec: {
    width: deviceWidth / 1.3,
    backgroundColor: '#fff',
    marginLeft: 20,
    padding: 10,
    borderColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
    borderRadius: 10,
  },
  imgSec: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
    borderRadius: 10,
  },
  portfolioHdng: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
  },
  portfolioDetails: {
    height: 70,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  portfolioWeb: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  details: {
    paddingTop: 15,
  },
};
