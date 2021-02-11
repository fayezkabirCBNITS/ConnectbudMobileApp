const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  header: {
    width: '100%',
    paddingHorizontal: '2%',
    height: 60,
    backgroundColor: '#71b85f',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    color: '#fff',
    marginLeft: 10,
  },
  container: {
    width: '100%',
    paddingHorizontal: '6%',
    backgroundColor: '#fff',
  },
  fieldHead: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginVertical: 20,
    // padding: 5,
    paddingVertical: 12,
    marginBottom: 15,
    borderColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
    borderRadius: 5,
    color: '#000',
    fontSize: 16,
  },
  calenderIcon: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dateField: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginRight: 5,
  },
  hdng: {
    marginTop: 15,
    color: '#71b85f',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  buttonSec: {
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    width: '45%',
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: '#ED374A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateBtn: {
    width: '45%',
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: '#71b85f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    marginTop: 3,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
};
