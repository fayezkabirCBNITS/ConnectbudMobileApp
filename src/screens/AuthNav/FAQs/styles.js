const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  headerText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  mainContainer: {
    marginHorizontal: '5%',
    marginVertical: '2%',
  },
  subHeadText: {
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    fontSize: 16,
  },
  collapse: {
    borderRadius: 50,
    marginVertical: '2%',
  },
  collapseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#71b85f',
    borderRadius: 7,
  },
  collapseId: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#71b85f',
  },
  collapseId2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  Ids: {
    color: '#71b85f',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
  },
  collapseTitle: {
    width: '60%',
    marginLeft: 20,
  },
  collapseTitleText: {
    fontFamily: 'Poppins-Regular',
  },
  CollapseBody: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#71b85f',
    marginTop: 5,
  },
  collapseBodyText: {
    fontFamily: 'Poppins-Regular',
    padding: '5%',
  },
  scroll: {
    height: deviceHeight - 84,
  },
};
