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
    width: deviceWidth / 2 - 30,
    height: 50,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  themeColor: {
    backgroundColor: 'rgba(113,184,95,0.15)',
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
};
