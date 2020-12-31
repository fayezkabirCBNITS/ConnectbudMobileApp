const React = require('react-native');
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


export default {
  header: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#71b85f',
    borderBottomWidth: 1,
  },
  image: {
    width: 140,
    height: 35,
  },
  headText: {
    color: '#60a84e',
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    fontSize: 18
  },
  formGroup: {
    width: '100%',
    height: 50,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    fontSize: 16,
    borderColor: 'rgba(59,29,37,0.5)',
    shadowColor: '#000',
    paddingHorizontal: 15,
    elevation: 4,
    textAlignVertical: 'top'
  },
  skillView1: {
    width: '90%',
    height: 60,
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginVertical: 10,
  },
  formSubGroup1: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSubGroup2: {
    width: '80%',
  },
  inputGroup: {
    color: '#3B1D25',
    fontSize: 16,
  },
  flatList1: {
    width: '90%',
    marginHorizontal: '5%',
    paddingHorizontal: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    fontSize: 16,

    borderColor: 'rgba(59,29,37,0.5)',
    flexDirection: 'row',
  },
  formInput: {
    marginHorizontal: '5%',
    marginVertical: '3%'
  },
  formGroup1: {
    marginBottom: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    fontSize: 16,
    paddingHorizontal: 10,
    borderColor: 'rgba(59,29,37,0.5)',
    flexDirection: 'row',
    shadowColor: '#000',

    elevation: 4,
    textAlignVertical: 'top',
    overflow: 'hidden'
  },
  details: {
    width: '100%',
    height: 30,
  },
  flastListHead: {
    color: 'rgba(59,29,37,0.5)',
    fontSize: 14,
    marginVertical: 5
  },
  formSubGroup2Num: {
    width: '65%',
  },
  formSubGroupNum: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  btnGrp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: '4%'
  },
  authBtn: {
    width: '45%',
    height: 46,
    borderRadius: 40,
    backgroundColor: '#71b85f',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  authBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  uploadImage: {

    width: 90,
    height: 90,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 15,
    marginLeft: 'auto',
    position: 'absolute',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 50,
    marginTop: Platform.OS === 'ios' ? -80 : 0,
  },
}
