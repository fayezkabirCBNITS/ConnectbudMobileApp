const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  scroll: {
    height: deviceHeight - 84,
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
  paidBtn: {
    width: '40%',
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#71b85f',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notPaidBtn: {
    width: '40%',
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#f9a631',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paidText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#fff',
    marginTop: 3,
  },
  questions: {
    width: '100%',
    minHeight: 60,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: 'rgba(113,184,95,0.5)',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionsText: {
    // width: '85%',
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    // backgroundColor: '#fff'
  },
  questionsTextGreen: {
    width: '65%',
    fontSize: 16,
    color: '#71b85f',
    fontFamily: 'Poppins-SemiBold',
    paddingLeft: 10,
  },
  collapse: {
    width: '100%',
    marginTop: 15,
  },
  heading: {
    fontSize: 20,
    color: '#71b85f',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
  },
};
