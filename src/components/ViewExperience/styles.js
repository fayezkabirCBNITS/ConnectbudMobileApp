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
  newexperienceSec: {
    width: deviceWidth / 1.3,
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginLeft: 20,
    padding: 10,
    borderColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
    flexDirection: 'row',
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
  iconSec: {
    width: 40,
    height: '100%',
    alignItems: 'center',
  },
  lines: {
    marginTop: 5,
    width: 1,
    height: 170,
    backgroundColor: '#71b85f',
  },
  deatilsSec: {
    width: '79%',
    marginLeft: 10,
  },
  experienceHdng: {
    width: '100%',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  experienceDetails: {
    width: '100%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  noData: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight - 470,
    paddingHorizontal: 110
  },
  noDataText: {
    marginTop: 15,
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
  },
};
