const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  imgSec: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  center: {
    width: '80%',
    paddingLeft: 10,
    alignItems: 'flex-start',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#000',
  },
  desig: {
    marginTop: -5,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: 'rgba(0,0,0,0.6)',
  },
  feedback: {
    width: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
  },
  wrap: {
    width: '100%',
    // height: 490,
    height: 350,
  },
  feedbackSec: {
    paddingHorizontal: '5%',
  },
  head: {
    width: '90%',
    height: '100%',
    backgroundColor: '#fff',
    marginHorizontal: '5%',
    borderColor: 'rgba(113,184,95,0.5)',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  flexRow: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: 'rgba(113,184,95,0.5)',
    borderTopWidth: 1,
    backgroundColor: 'rgba(113,184,95,0.05)',
  },
  design: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -10,
    opacity: 0.5,
  },
  quote: {
    width: 30,
    height: 21,
    marginTop: 15,
    marginBottom: 20,
    opacity: 0.5,
  },
  videoSec: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },
};
