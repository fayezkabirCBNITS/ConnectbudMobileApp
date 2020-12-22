const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  main: {
    width: '100%',
    minHeight: 100,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 7,
    marginVertical: 10,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
  },
  imgSec: {
    width: '100%',
    height: 150,
  },
  bottomSec: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: '6%',
  },
  socialIcon: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
    marginTop: 10,
  },
  cnctBud: {
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,0.5)',
  },
  headlines: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    fontSize: 20,
  },
  date: {
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,0.7)',
    fontSize: 17,
  },
};
