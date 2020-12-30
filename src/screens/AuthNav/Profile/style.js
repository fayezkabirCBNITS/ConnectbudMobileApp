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
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  userInfoDetails: {
    marginTop: -5,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  details: {
    minWidth: 150,
    paddingHorizontal: 10,
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
    height: deviceHeight - 240,
    marginTop: 20,
  },
  tab: {
    backgroundColor: '#fff',
    // borderRadius: 10,
    width: '100%',
    height: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderColor: 'rgba(113, 184, 95, 0.15)',
    overflow: 'hidden',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
    width: 'auto',
    color: '#fff',
    textAlign: 'center',
  },
  label2: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
    width: 'auto',
    color: '#71b85f',
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
  noDate: {
    width: '100%',
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDate2: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    color: '#000'
  }
};
