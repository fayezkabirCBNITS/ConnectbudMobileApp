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
  newHistorySec: {
    width: deviceWidth / 1.3,
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginBottom: 120,
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
    height: 45,
    backgroundColor: '#71b85f',
  },
  deatilsSec: {
    width: '79%',
    marginLeft: 10,
  },
  historyDate: {
    width: '100%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#8b88b8'
  },
  historyProjectName: {
    width: '100%',
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 5,
  },
  historyProjectSub: {
    width: '100%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#535c7f'
  },
};
