const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  scroll: {
    height: deviceHeight - 84,
  },
  heading: {
    fontSize: 20,
    color: '#71b85f',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
    marginBottom: 5,
  },
  card: {
    width: '100%',
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderColor: 'rgba(113,184,95,0.5)',
    borderWidth: 1,
  },
  topSec: {
    width: '100%',
    flexDirection: 'row',
  },
  hdng: {
    width: '70%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  timePrice: {
    width: '30%',
    alignItems: 'flex-end',
  },
  timeSec: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginLeft: 5,
    textAlign: 'right',
    color: 'rgba(0,0,0,0.5)',
    paddingTop: 2,
  },
  price: {
    width: '30%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    paddingLeft: 10,
    textAlign: 'right',
    color: '#71b85f',
  },
  subtitle: {
    width: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
  wrap: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 3,
  },
  wrapContent: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#e5e4e4',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginRight: 10,
    marginBottom: 10,
  },
  btnSec: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn50: {
    width: '47%',
    height: 40,
    backgroundColor: '#71b85f',
    borderRadius: 40 / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn50Text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
    paddingTop: 3,
  },
  btn: {
    width: '100%',
    height: 40,
    marginTop: 10,
    backgroundColor: '#71b85f',
    borderRadius: 40 / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
