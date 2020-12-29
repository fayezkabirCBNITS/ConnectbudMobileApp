const React = require('react-native');
const { Dimensions } = React;
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
  heading2: {
    fontSize: 20,
    color: '#71b85f',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },
  questions: {
    width: '100%',
    minHeight: 60,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#71b85f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  questionsText: {
    width: '85%',
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    // backgroundColor: '#fff'
  },
  imgSec: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    overflow: 'hidden',
  },
  questionsMain: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  answerSec: {
    width: '80%',
    paddingLeft: 10,
  },
  questionsWrap: {
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: 20,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: 'rgba(113,184,95,0.5)',
    borderWidth: 1,
  },
  userName: {
    width: '100%',
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  answer: {
    width: '100%',
    fontSize: 15,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  collapse: {
    marginBottom: 15,
  },
  similarQ: {
    width: '100%',
    padding: 15,
    marginTop: 40,
    marginBottom: 20,
    borderColor: 'rgba(113,184,95,0.5)',
    borderWidth: 1,
  },
  noDataImg: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight - 470,
  },
  noDataImgText: {
    marginTop: 15,
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
  },
  readMore: {
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
    fontSize: 18,
    textAlign: 'right'
  },
};
