const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  portfolioHead: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 12,
    color: '#71b85f',
  },
  portHeading2: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addPortfolio: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 12,
    color: '#71b85f',
  },
  portDocSec: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  editBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  hdng: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  proName: {
    width: '55%',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  web: {
    width: '55%',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: 'blue',
  },
  details: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  blueText: {
    color: 'blue',
  },
};
