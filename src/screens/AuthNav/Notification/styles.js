const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  head: {
    paddingVertical: 15,
    borderBottomColor: 'rgba(113,184,95,0.3)',
    borderBottomWidth: 1,
  },
  userChat2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    paddingBottom: 70,
    color: '#71b85f'
  },
  noChat: {
    width: '100%',
    height: deviceHeight - 160,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgSec: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    overflow: 'hidden',
  },
  notiText: {
    width: '80%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  notiTime: {
    width: '80%',
    marginLeft: 'auto',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  scroll: {
      height: deviceHeight - 84,
  }
};
