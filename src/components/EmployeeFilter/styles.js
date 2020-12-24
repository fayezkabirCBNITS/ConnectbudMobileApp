const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  wrap: {
    width: deviceWidth,
    height: 300,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
  },
  flexRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  underline: {
    borderBottomColor: '#71b85f',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 15,
    marginTop: 15,
  },
  head: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
  },
  resetAll: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#71b85f',
  },
  filterOptnBtn: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  filterOptnBtnSlct: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row'
  },
  filterOptn: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  filterOptn2: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginLeft: 10,
  },
  filterOptnSlct: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#71b85f',
  },
  height50: {
      height: 50
  }
};
