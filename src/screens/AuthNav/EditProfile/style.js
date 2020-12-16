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
  details: {
    width: '100%',
    height:30,
  },
  container: {
    width: '100%',
    // paddingHorizontal: '6%',
  },
  formGroup1: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    marginBottom: 15,

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
  inputHead: {
    color: 'rgba(59,29,37,0.5)',
    fontSize: 14,
    marginBottom: 5,
  },
  inputGroup: {
    color: '#3B1D25',
    height: 45,
    fontSize: 15,
  },
  datePickerStyle: {
    dateIcon: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      marginLeft: 0,
    },
    bold:{
         // fontFamily: '',
        },
    dateInput: {
      height: 45,
      borderColor: '#0000',
      paddingHorizontal: 10,
      fontSize: 15,
      alignItems: 'flex-start',
      color: '#000',
    },
    placeholderText: {
      fontSize: 15,
      color: '#aaa',
    },
  },
  coverUpload: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -20,
    left: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  form: {
    margin: 20,
    //borderWidth: 1,
    //borderColor: 'green',
    padding: 10,
  },
  title: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 10,
  },

  formGroup: {
    width: '100%',
    marginBottom: 15,
  },
  authBtn: {
    width: '50%',
    marginHorizontal: '8%',
    height: 46,
    borderRadius: 23,
    backgroundColor: '#71b85f',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  authBtnText: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 1,
  },
  flexRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadSec: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  cover: {
    width: '100%',
    height: 130,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.15)',
  },
  uploadcoverImage: {
    width: '100%',
    height: 130,
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  skillSec: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  skillTab: {
    //width: '40%',
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 10,
    flexDirection:'row',
  },
  marginRight3:{
      margin:5,
  },
  skillText: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginLeft:3,
    textAlign: "center"
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    marginTop: -45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderColor: '#fff',
    borderWidth: 5,
  },
  uploadImage: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    marginTop: -45,
    marginLeft: 'auto',
    position: 'absolute',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 5,
  },
  logoUpload: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -5,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  loader: {
    position: 'absolute',
    right: 15,
  },
};
