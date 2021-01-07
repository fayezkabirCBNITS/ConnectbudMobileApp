const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  editBtn: {
    width: 85,
    height: 30,
    backgroundColor: '#71b85f',
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginTop: 20,
  },
  editBtnText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    marginTop: 3,
  },
  userInfoHead: {
    width: '33%',
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
  },
  userInfoDetails: {
    // width: '67%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    // marginRight : 15
  },
  details: {
    flexDirection: 'row',
    flexWrap : 'wrap',
    alignItems: 'flex-start',
  },
  skillSec: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  skillTab: {
    minWidth: 90,
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 10,
  },
  skillHead: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 12,
    color: '#71b85f'
  },
  skillText: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: "center"
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
  socialIconSec: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};
