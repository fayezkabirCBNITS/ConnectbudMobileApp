import {color} from 'react-native-reanimated';

const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  flexOne: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    height: deviceHeight,
    backgroundColor: '#f0f0f0',
  },
  wrapperWhite: {
    flex: 1,
    height: deviceHeight,
    backgroundColor: '#fff',
  },
  backgroundbg: {
    flex: 1,
    width: deviceWidth,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingHorizontal: '4%',
    paddingVertical: '5%',
  },
  btncontainer: {
    paddingHorizontal: '4%',
    marginBottom: 0,
  },
  flexRow: {
    flexDirection: 'row',
  },
  mxAuto: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  alignCenter: {
    alignItems: 'center',
  },
  rowCenter: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rowSec: {
    flexDirection: 'row',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  rowjustify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  rowSec_ar: {
    flexDirection: 'row-reverse',
  },
  rightAlign: {
    textAlign: 'right',
  },

  // Margin Top
  py2: {
    paddingVertical: 10,
  },
  mT1: {
    marginTop: 10,
  },
  mT2: {
    marginTop: 20,
  },
  mT3: {
    marginTop: 30,
  },
  mT4: {
    marginTop: 40,
  },
  mL1: {
    marginLeft: 5,
  },
  mR1: {
    marginRight: 5,
  },
  mL1: {
    marginLeft: 5,
  },
  // Margin bottom
  mB1: {
    marginBottom: 10,
  },
  mB2: {
    marginBottom: 20,
  },
  mB3: {
    marginBottom: 30,
  },
  mB4: {
    marginBottom: 40,
  },

  // Padding Top
  pt0: {
    paddingTop: 0,
  },
  pT1: {
    paddingTop: 10,
  },
  pT2: {
    paddingTop: 20,
  },
  pT3: {
    paddingTop: 30,
  },
  pT4: {
    paddingTop: 40,
  },
  pT5: {
    paddingTop: 50,
  },
  // Padding Bottom
  mR1: {
    marginRight: 10,
  },
  pL1: {
    paddingLeft: 10,
  },
  // Padding Bottom
  pB1: {
    paddingBottom: 10,
  },
  pB2: {
    paddingBottom: 20,
  },
  pB3: {
    paddingBottom: 30,
  },
  pB4: {
    paddingBottom: 40,
  },
  pB5: {
    paddingBottom: 50,
  },
  width100: {
    width: '100%',
  },
  width50: {
    width: '50%',
    paddingHorizontal: 8,
    position: 'relative',
  },
  width40: {
    width: '45%',
    paddingHorizontal: 8,
  },
  width10: {
    width: '10%',
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    marginLeft: -8,
    marginRight: -8,
  },

  //common styles
  logoview: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 60,
  },
  logo: {
    resizeMode: 'contain',
    height: 60,
    maxWidth: 230,
  },
  formwrap: {
    flex: 1,
    paddingTop: 20,
  },
  formgroup: {
    marginBottom: 15,
    marginTop: 10,
  },
  labeltext: {
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    fontWeight: '400',
    fontSize: 18,
    marginBottom: 10,
  },
  inputform: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.41)',
    borderRadius: 5,
    color: '#e8a4a4',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.11)',
    paddingBottom: 5,
    paddingTop: 5,
  },
  pickermenu: {
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.41)',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.11)',
  },
  pickerm: {
    color: '#e8a4a4',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    fontSize: 17,
  },
  inbox: {
    width: '85%',
  },
  icoinput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    marginTop: 20,
  },
  themebtn: {
    backgroundColor: '#1c0006',
    height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  btntext: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  avtbox: {
    width: 70,
    overflow: 'hidden',
    position: 'relative',
    paddingBottom: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avtimage: {
    resizeMode: 'cover',
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
  },
  noborder: {
    borderWidth: 0,
    borderColor: 'tranparent',
  },
  hwrap: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingVertical: 15,
    paddingTop: 40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  toptabs: {
    height: 85,
    paddingHorizontal: '4%',
    paddingVertical: 20,
    paddingTop: 40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  tabimg: {
    height: 30,
    resizeMode: 'contain',
    width: 40,
  },
  cattabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logh: {
    marginLeft: 20,
  },
  logoheader: {
    resizeMode: 'contain',
    height: 40,
    width: 220,
  },
  card: {
    shadowColor: '#ddd',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 15,
    overflow: 'hidden',
  },
  cardbody: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
  },
  cardthumb: {
    height: 70,
    width: 70,
    backgroundColor: '#e7e7e7',
    borderRadius: 70 / 2,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbimg: {
    resizeMode: 'contain',
    height: 45,
  },
  barpadd: {
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
  },
  notificationbar: {
    position: 'relative',
    paddingRight: 50,
    width: '100%',
  },
  searchbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(184, 0, 30, 0.40)',
    borderWidth: 1,
    borderColor: '#ff3d5e',
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  searchinput: {
    width: '90%',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  chatpg: {
    height: '100%',
    width: deviceWidth,
    resizeMode: 'cover',
    paddingBottom: 80,
  },
  disableBtn: {
    backgroundColor: '#ccc',
    height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  btnLoader: {
    position: 'absolute',
    right: 15,
  },
};
