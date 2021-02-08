const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  skillView: {
    width: '100%',
    height: 60,
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginTop: '2%'
  },
  formGroup1: {
    width: '90%',
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(59,29,37,0.5)',
    flexDirection: 'row',
  },
  formSubGroup2: {
    width: '90%',
  },
  flastListHead: {
    color: 'rgba(59,29,37,0.5)',
    fontSize: 14,
    marginBottom: 5,
  },
  formSubGroup22: {
    width: '100%',
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
    flexDirection: 'row',
  },
  marginRight3: {
    margin: 5,
  },
  skillText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginLeft: 3,
    marginRight: 7,
    textAlign: "center",
  },
  flatList: {
    width: '90%',
    paddingHorizontal: 5,
    marginHorizontal: '5%',
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(59,29,37,0.5)',
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    //fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  filterSec: {
    width: '100%',
    height: 60,
    borderTopColor: '#71b85f',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  filterText: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    // color: '#71b85f',
    color: '#fff',
    //marginLeft: 20,
    //paddingTop: 5,
  },
  popins: {
    fontFamily: "Poppins"
  },
  flexstyle: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  subjectWrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
    //flexDirection: "row",
    width: "100%",
    borderColor: "rgba(113,184,95,0.3)",
    borderWidth: 2,
    marginVertical: 15,
    padding: 15,
    borderRadius: 6
  },
  moneyContainer: {
    borderColor: "rgba(113,184,95,0.5)",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden",
    borderRadius: 5,
    marginTop: 15
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    // marginTop: -72
  },
  timeAgo: {
    marginBottom: 5,

  },
  skillView: {
    width: '88%',
    height: 60,
    alignContent: 'center',
    marginHorizontal: '5%',
    // flexDirection: 'row'
  },
  formPicker: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    // borderColor:'rgba(59,29,37,0.5)',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
    textAlignVertical: 'top'
  },
  formGroup01: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#0000',
    borderRadius: 4,
    fontSize: 16,
    marginTop: 5,
    //borderWidth: 1,
    //borderColor: "rgba(113,184,95,0.3)",
    //borderColor:'rgba(59,29,37,0.5)',
    flexDirection: 'row',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
    // textAlignVertical: 'top',
  },
  rightSection: {
    width: "78%",
    paddingLeft: 5,
    marginBottom: 20
  },
  leftSection: {
    width: "22%"
  },
  boxTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  iconText: {
    //marginLeft: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    width: '20%'
  },
  btnGrp: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  subBtn: {
    backgroundColor: '#E4E4E4',
    borderRadius: 40,
    // width: '30%', 
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 3,
    marginBottom: 10,
  },
  btnText: {
    color: 'rgba(59,29,37,0.5)',
  },

  //
  wrap: {
    width: '100%',
    // height: '80%',
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
    //height: 40,
    alignItems: 'flex-start',
    //flexDirection: 'row'
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
  },
  //
  noData: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight - 330,
  },
  noDataText: {
    marginTop: 15,
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#71b85f',
  },
  filterSec2: {
    // width: '100%',
    // height: 60,
    // borderTopColor: '#71b85f',
    // borderTopWidth: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: '#71b85f',
    // borderTopWidth: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    backgroundColor:'transparent',         
    borderWidth:0,
    paddingLeft:0,
  },
}