const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  scroll: {
    height: deviceHeight - 84,
  },
  card: {
    width: '100%',
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: 'rgba(113,184,95,0.5)',
    borderWidth: 1,
  },
  flexstyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  moneyContainer: {
    borderColor: 'rgba(113,184,95,1)',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
    borderRadius: 7,
    marginTop: 15,
    backgroundColor: '#fff',
  },
  inrtxt: {
    backgroundColor: '#71b85f',
    color: '#fff',
    width: '50%',
    textAlign: 'center',
    paddingVertical: 7,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textAlignVertical: 'center',
    paddingTop: 10,
  },
  usdText: {
    backgroundColor: '#fff',
    color: '#000',
    width: '50%',
    textAlign: 'center',
    paddingVertical: 7,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textAlignVertical: 'center',
    paddingTop: 10,
  },
  timeSec: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
    marginLeft: 5,
  },
  hdng: {
    width: '70%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#000',
  },
  applyBtn: {
    width: '25%',
    height: 30,
    backgroundColor: '#71b85f',
    borderRadius: 35 / 2,
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 5,
  },
  applyBtnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  details: {
    width: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
};
