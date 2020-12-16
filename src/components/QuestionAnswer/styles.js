const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  post: {
    width: '100%',
    padding: 15,
    borderColor: '#71b85f',
    borderWidth: 1,
    borderRadius: 7,
    marginVertical: 20,
  },
  questionInput: {
    width: '100%',
    height: 50,
    borderColor: '#71b85f',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 0,
    paddingHorizontal: 15,
    fontFamily: 'Poppins-Regular',
  },
  sendBtn: {
    width: '45%',
    height: 45,
    marginTop: 15,
    backgroundColor: '#71b85f',
    alignSelf: 'center',
    borderRadius: 45 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 18,
  },
  hdng: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    fontSize: 16,
  },
  qPost: {
    width: '100%',
    padding: 15,
    borderColor: '#71b85f',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 15,
  },
  qSec: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  imgSec: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  update: {
    flexDirection: 'row',
    marginVertical: 7,
    alignItems: 'center',
  },
  updateText: {
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,0.6)',
    paddingTop: 5,
  },
  count: {
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,0.6)',
  },
  width30: {
    width: '30%',
  },
  bdrRight: {
    borderRightColor: 'rgba(0,0,0,0.6)',
    borderRightWidth: 1,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
    fontSize: 15,
  },
  details: {
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    lineHeight: 15,
  },
  countSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};
