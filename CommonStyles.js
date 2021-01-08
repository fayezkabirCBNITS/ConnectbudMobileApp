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
  header2: {
    // flexDirection: 'row',
    paddingHorizontal: '5%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomColor: '#71b85f',
    // borderBottomWidth: 1,
    backgroundColor: '#71b85f',
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
    paddingHorizontal: '3%',
    //paddingVertical: 5,
  },
  errorMsgText: {
    color: '#fc0303',
    fontFamily: 'Poppins-Regular',
  },
  loader: {
    position: 'absolute',
    right: 15,
  },

  modalImg: {
    width: 150,
    height: 98,
  },
  modalText: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 25,
  },
  modalEmail: {
    color: 'blue',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 7,
  },
  modalContent: {
    width: '80%',
    paddingVertical: 40,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContent2: {
    width: '100%',
    height: deviceHeight - 150,
    // padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalBg: {
    flex: 1,
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCross: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  noData: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  hdngText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
    fontSize: 20,
    textAlign: 'center',
  },
  scrollBtnR: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 50 / 2,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollBtnL: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
