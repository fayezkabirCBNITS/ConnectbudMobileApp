const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  newUserSec: {
    width: '100%',
    paddingHorizontal: '5%',
  },
  newDetails: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  newUserImg: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  newUserDeatils: {
    width: '75%',
  },
  overview: {
    width: '100%',
    paddingHorizontal: '5%',
  },
  overviewSec: {
    width: '100%',
  },
  newOverviewSec: {
    width: '100%',
    flexDirection: 'row',
  },
  overviewHdng: {
    width: '35%',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  overviewDetails: {
    width: '65%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  overviewDetails2: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  wid65: {
    width: '65%'
  }
};
