const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  searchInput: {
    padding: 0,
    paddingLeft: 50,
    paddingRight: 15,
    alignItems: 'center',
    height: 50,
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  searchBar: {
    width: '100%',
    height: 50,
    marginVertical: 10,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  searchIcon: {
    width: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    paddingLeft: 5,
  },
  loginHead: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
};
