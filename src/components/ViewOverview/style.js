const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  editBtn: {
    // width: 85,
    // height: 30,
    // backgroundColor: '#71b85f',
    // borderRadius: 30 / 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
    // marginLeft: 'auto',
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
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
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
};
