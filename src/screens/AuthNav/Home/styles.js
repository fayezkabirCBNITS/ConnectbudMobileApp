const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  searchInput: {
    padding: 0,
    paddingRight: 15,
    paddingLeft: 15,
    // alignItems: 'center',
    height: 50,
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    width: '100%',
    position: 'absolute',
    left: 0
  },
  searchBar: {
    width: '100%',
    // height: 50,
    marginVertical: 10,
    // borderColor: 'rgba(0,0,0,0.2)',
    // borderWidth: 1,
    // borderRadius: 5,
    backgroundColor: '#fff',
    // overflow: 'hidden',
  },
  searchIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    paddingLeft: 5,
    backgroundColor: '#71b85f',
  },
  loginHead: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  loginBtn: {
    width: '100%',
    height: 50,
    marginBottom: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#71b85f',
    borderWidth: 1.5,
  },
  loginBtn2: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#71b85f',
    borderWidth: 1.5,
  },
  themeColor: {
    backgroundColor: 'rgba(113,184,95,0.1)',
  },
  coverImage: {
    width: deviceWidth,
    height: 160,
  },
  marVer15: {
    marginVertical: 15,
  },
  mt15: {
    marginTop: 15,
    paddingTop: 20
  },
  padVer15: {
    paddingTop: 15,
    backgroundColor: '#f6f8fb',
    borderBottomColor: '#71b85f',
    borderBottomWidth: 1.5,
  },
  hdng: {
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 19,
  },
  mainLoginBtn: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#71b85f',
    borderWidth: 1.5,
    backgroundColor: '#fff',
  },
  loginBtnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#71b85f',
  },
  width100: {
    width: '100%',
  },
  btmSheet: {
    width: '100%',
    height: 170,
    paddingHorizontal: '10%',
    justifyContent: 'center',
  },
  loginBtnText2: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: '#71b85f',
    fontSize: 18,
  },
  searchDropSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  searchPicker: {
    width: '80%',
    height: 50,
    borderColor: '#71b85f',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropSerachIcon: {
    width: '15%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#71b85f',
    borderRadius: 5,
  },
  hdng2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 19,
  },
  hdngLg: {
    marginTop: -2,
    fontFamily: 'Poppins-Regular',
    fontSize: 19,
  },
  hdngLgGreen: {
    fontFamily: 'Poppins-Regular',
    fontSize: 19,
    color: '#71b85f',
  },
  lightGrey: {
    paddingVertical: 20,
    backgroundColor: '#f6f8fb',
  },
  green: {
    paddingVertical: 20,
    backgroundColor: '#70b85f',
  },
  hdngWhite: {
    marginTop: -7,
    fontFamily: 'Poppins-Regular',
    fontSize: 21,
    color: '#fff',
  },
  marTop15: {
    marginTop: 15,
  },
  search: {
    backgroundColor: '#fff',
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0,
    shadowRadius: 1.0,
    elevation: 0,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    borderRadius: 5,
    width: '100%'
  },
  searchPos: {
    position: 'absolute',
    top: 12,
    left: 15,
  },
  bookClassBtn: {
    width: 140,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 4,
    position: 'absolute',
    bottom: 20,
    left: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookClassBtnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#71b85f'
  },
  homeContent: {
    position: 'absolute',
    left: '5%',
    top: 40
  },
  imgTxt: {
    width: 160,
    height: 70
  },
  talent: {
    paddingTop: 25,
    marginTop: 10,
    paddingBottom: 15,
  },
};
