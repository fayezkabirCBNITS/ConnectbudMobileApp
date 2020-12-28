const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  projHead: {
    width: '45%',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  projName: {
    width: '55%',
    color: '#71b85f',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    paddingLeft: 10,
  },
  detailsSec: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'rgba(113,184,95,0.5)',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 5,
  },
  deatailsHdng: {
    width: '50%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#fff',
    paddingLeft: 10,
    backgroundColor: '#71b85f',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
  },
  deatailsInfo: {
    width: '50%',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  detailsField: {
    width: '100%',
    flexDirection: 'row',
  },
  btnSec: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  btn: {
    width: '47%',
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#71b85f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#fff',
  },
  scroll: {
    height: deviceHeight - 84,
  },
};
