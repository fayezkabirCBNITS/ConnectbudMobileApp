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
  marTop30: {
    marginTop: 30,
  },
  editBtn: {
    width: 85,
    height: 30,
    backgroundColor: '#71b85f',
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  editBtnText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    marginTop: 3,
  },
  hdngSec: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(113,184,95,0.3)'
  },
  hdngSec2: {
    paddingBottom: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(113,184,95,0.3)'
  },
  hdngText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
    fontSize: 20,
  },
  hdngTextBlk: {
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
    fontSize: 20,
  },
  hdngTextGrey: {
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,0.5)',
    fontSize: 22,
  },
  fieldHead: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    width: '35%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  details2: {
    paddingLeft: 10,
    width: '65%',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  readMore: {
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
    fontSize: 18,
  },
  projTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: 'rgba(0,0,0,0.8)',
    fontSize: 18,
  },
  projDetails: {
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
  },
  project: {
    paddingVertical: 15,    
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(113,184,95,0.3)',
  }
};
