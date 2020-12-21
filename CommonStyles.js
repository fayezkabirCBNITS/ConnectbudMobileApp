const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#71b85f',
  },
  container: {
    width: '100%',
    paddingHorizontal: '5%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    // flexDirection: 'row',
    paddingHorizontal: '5%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#71b85f',
    borderBottomWidth: 1,
  },
  imageHdr: {
    width: 140,
    height: 35,
  },
  hambarIcon: {
    position: 'absolute',
    left: '5%',
  },
  bellIcon: {
    position: 'absolute',
    right: '5%',
  },
  hanPosition: {
    position: 'absolute',
    top: 15,
    left: '6%',
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splash: {
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#71b85f',
  },
  splashImg: {
    width: 250,
    height: 63,
  },
  userPhoto: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  usrImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
  },
  errorMsg: {
    width: '100%',
    paddingHorizontal: '8%',
    //paddingVertical: 5,
  },
  errorMsgText: {
    color: '#FF5959',
    fontFamily: 'Poppins-Regular',
  },
};
