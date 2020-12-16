const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  coverImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginBottom: 40,
    borderColor: '#fff',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor: '#fff',
  },
  userInfo: {},
  userInfoHead: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
  },
  userInfoDetails: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  details: {
    minWidth: 150,
    padding: 10,
    paddingVertical: 4,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#aad49f',
    borderRadius: 7,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  indicator: {
    backgroundColor: '#71b85f',
    height: '100%',
  },
  tabSec: {
    width: '100%',
    height: deviceHeight - 85,
  },
  tab: {
    backgroundColor: '#fff',
    // borderRadius: 10,
    width: '100%',
    height: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    // borderWidth: 1,
    // borderColor: 'rgba(113, 184, 95, 0.15)',
    overflow: 'hidden',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1,
    width: 'auto',
    color: '#fff',
    textAlign: 'center',
  },
  label2: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1,
    width: 'auto',
    color: '#f00',
    textAlign: 'center',
  },
  camPosition: {
    position: 'absolute',
    top: 15,
    right: '6%',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
};
