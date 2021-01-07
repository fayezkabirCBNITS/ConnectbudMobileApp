const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  scroll: {
    height: deviceHeight - 140,
  },
  head: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#000',
    letterSpacing: 0.5,
  },
  headGreen: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#71b85f',
  },
  redeemBtn: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginLeft: 'auto',
    backgroundColor: '#71b85f',
    borderRadius: 10,
  },
  redeemBtnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  walletDetails: {
    backgroundColor: 'rgba(226,234,224,0.5)',
    marginVertical: 20,
    padding: 15,
    borderRadius: 5,
  },
  deatailsHdng: {
    width: '35%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#fff',
    paddingLeft: 10,
    backgroundColor: '#71b85f',
  },
  deatailsInfo: {
    width: '65%',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingLeft: 10,
  },
  detailsField: {
    width: '100%',
    flexDirection: 'row',
  },
  detailsSec: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: 'rgba(113,184,95,0.5)',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
};
