const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  portfolioHead: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 16,
    color: '#71b85f',
  },
  noData: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight - 470,
  },
  noDataText: {
    marginTop: 15,
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
  },
  formGroup1: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    marginTop:5,
    marginBottom:15,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    color: '#000',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  formSubGroup1: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSubGroup2: {
    width: '80%',
  },
  cardContainer: {
    width: '100%',
    //marginHorizontal: "5%",
    borderColor: 'rgba(113,184,95,0.3)',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  prodDetails: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    marginLeft: 'auto',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    color: '#3B1D25',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
  },
  itemContent: {
    color: '#3B1D25',
    fontFamily: 'Poppins-Regular',
    fontWeight: 'normal',
  },
  price: {
    fontSize: 16,
    color: '#71b85f',
    fontFamily: 'Poppins-SemiBold',
  },
};
