const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  classText: {
    fontFamily: 'Poppins-SemiBold',
    marginTop: '3%',
    fontSize: 16,
  },
  selectBtnDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectBtn: {
    width: '48%',
    backgroundColor: '#fff',
    // height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    padding: 7,
    borderColor: 'rgba(113,184,95,0.5)',
    borderWidth: 1,
    // marginRight: 10,
  },
  ActiveSelectBtn: {
    width: '48%',
    backgroundColor: '#71b85f',
    // height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    padding: 7,
    backgroundColor: 'rgba(113,184,95,0.4)',
    borderColor: 'rgba(113,184,95,0.8)',
    borderWidth: 1,
    // marginRight: 10,
  },
  selectBtnText: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
  },
  AselectBtnText: {
    // fontSize: 15,
    // fontFamily: 'Poppins-SemiBold',
    // color: '#fff',
    // textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
  },
  ActiveSelectBtnText: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
  },
  selectCourseDiv: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 7,
    overview: 'hidden',
    // marginHorizontal:'5%'
  },
  courseBtn: {
    width: '48%',
    backgroundColor: '#E4E4E4',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    overview: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  AcourseBtn: {
    width: '48%',
    // backgroundColor: '#71b85f',
    backgroundColor: '#E4E4E4',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    overview: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  syllabus: {
    width: '100%',
    borderColor: '#71b85f',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10,
    paddingTop: 10,
    paddingHorizontal: '5%',
  },
  syllabusHeader: {
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 10,
  },
  syllabusText: {
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
  },
  courseDetails: {
    borderColor: '',
    borderWidth: 1,
  },
  boldText: {
    fontFamily: 'Poppins-SemiBold',
  },
  formGroup1: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
    color: '#000',
    fontSize: 16,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
    marginTop: 5,
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
    color: 'black',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },
  inputHead2: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
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
    marginVertical: 20,
  },
  authBtnText: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'Poppins-SemiBold',
  },
  hdngBg: {
    width: '90%',
    height: 75,
    marginVertical: 7,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 5,
  },
  hdngBgSelect: {
    width: '90%',
    height: 75,
    marginVertical: 7,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113,184,95,0.4)',
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: 'rgba(113,184,95,0.8)',
    borderWidth: 1,
  },
  imgBg: {
    width: '100%',
    height: 120,
    borderRadius: 7,
    overflow: 'hidden',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  tickPosition: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 99,
  },
  imgBgSec: {
    width: '100%',
    height: 150,
    marginTop: 20,
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 5,
  },
  errorText: {
    width: '100%',
    color: '#fc0303',
  },
};
