const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    scroll: {
        height: deviceHeight - 84,
      },
    bgColorWhite : {
        backgroundColor : "#fff"
    },
    boxWrapper : {
        borderColor : "rgba(113,184,95,0.3)",
        borderWidth : 2,
        padding: 10,
        marginTop : 20
    },
    subjectPriceCombo : {
        justifyContent : "space-between",
        alignItems : "center",
        flexDirection :"row",
        marginTop : 10
    },
    subJectDaysCombo : {
        // justifyContent : "space-between",
        alignItems : "center",
        flexDirection :"row",
        flexWrap: 'wrap'
    },
    subject : {
        paddingHorizontal :20,
        paddingVertical : 10,
        borderRadius : 25,
        backgroundColor : "rgba(0,0,0,0.1)",
        marginRight : 8,
        marginBottom : 8
    },
    inrUsd: {
        borderColor : "#71b85f",
        borderWidth : 2,
        justifyContent : "space-between",
        alignItems : "center",
        flexDirection :"row",
        marginVertical : 15,
        borderRadius : 8,
        overflow : "hidden"
    },
    inrtxt : {
        backgroundColor : "#71b85f",
        color: "#fff",
        width: "50%",
        textAlign : "center",
        paddingVertical : 7,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        textAlignVertical: 'center',
        paddingTop: 10
    },
    usdText : {
        backgroundColor : "#fff",
        color: "#000",
        width: "50%",
        textAlign : "center",
        paddingVertical : 7,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        textAlignVertical: 'center',
        paddingTop: 10
    },
    boxtitle : {
        fontSize : 18,
        fontFamily : "Poppins-SemiBold",
        textTransform : "capitalize"
    },
    boxtext : {
        fontSize : 14,
        fontFamily : "Poppins-Regular",
        color : "rgba(0,0,0,0.45)"

    },
    actionBtn : {
        justifyContent : "center",
        alignItems : "center",
        flexDirection :"row",
        backgroundColor : "#71b85f",
        paddingVertical : 12,
        borderRadius : 25

    },
    findBtn : {
        width : "60%"
    },
    findIcon : {
        marginRight : 8
    },
    findBtnText : {
        color : "#fff"
    },
    edit : {
        width : "40%",
        justifyContent : "flex-end",
        flexDirection : "row"
    },
    buttonWrapper : {
        alignItems : "center",
        justifyContent : "center",
        flexDirection : "row"

    },
    bgImg: {
        width: 220 , height : "100%",
        position: "relative",
        marginRight : 20
    },
    bgContainer : {
        backgroundColor : "rgba(0,0,0,0.3)",
        width : "100%",
        height : "100%",
        paddingVertical : 40
    },
    category : {
        position : "absolute",
        bottom : 0,
        left : 0,
        backgroundColor : "rgba(0,0,0,0.5)",
        width: "100%",
        paddingVertical : 8
    },
    categoryText : {
        color : "#fff"
    },
    catTextHead  : {
        textAlign : "center",
        color : "#fff"
    },
    catBodyTxt : {
        textAlign : "center",
        color : "#c6e3bf"

    },
    hozScroll : {
        flexDirection : "row"
    },
    form: {
        // marginTop:20,
        // marginHorizontal: 10,
        // padding: 10,
      },
      title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        marginBottom: 15,
      },
      inputHead: {
        color: 'rgba(59,29,37,0.5)',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        marginBottom: 10,
      },
      flastListHead:{
        color: 'rgba(59,29,37,0.5)',
        fontSize: 14,
        marginBottom: 5,
      },
      formGroup: {
        width: '100%',
        marginBottom: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        // borderWidth: 1,
        borderColor:'rgba(59,29,37,0.5)',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    formGroup1: {
        width: '100%',
        marginBottom: 15,
        backgroundColor: '#0000',
        borderRadius: 4,
        fontSize: 16,
        // borderWidth: 1,
        borderColor:'rgba(59,29,37,0.5)',
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
    formPicker: {
      width: '80%',
      height: 55,
      backgroundColor: '#f8f8f8',
      borderRadius: 4,
      // borderWidth: 1,
      // borderColor:'rgba(59,29,37,0.5)',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      textAlignVertical: 'top',
      overflow: 'hidden'
  },
    flatList:{
        width: '85%',
        marginBottom: 15,
        paddingHorizontal:5,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        borderWidth: 1,
        borderColor:'rgba(59,29,37,0.5)',
        flexDirection: 'row',
    },
    inputGroup: {
        color: '#3B1D25',
        height: 45,
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        padding: 10,
      },
      formSubGroup1: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
      },
  
      authBtn: {
        width: '50%',
        marginHorizontal: '8%',
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
        fontWeight:'bold',
        letterSpacing: 1,
      },
      skillView:{
        width: '100%', 
        height: 60, 
        alignContent: 'center', 
        // flexDirection: 'row'
      },
      projectView:{
        width: '100%', 
        height: 60, 
        alignContent: 'center', 
        display: 'flex', 
        flexDirection: 'row'
      },
      errorText: {
        width: '100%',
        color: '#fc0303',
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
      flexDirection:'row',
    },
    marginRight3:{
        margin:5,
    },
    skillText: {
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      color: '#000',
      marginLeft:3,
      textAlign: "center",
    },
    actionEdtBtn: {
      flexDirection: 'row', 
      alignItems : "center", 
      justifyContent : "center", 
      paddingHorizontal: 50
    },
    modalContent: {
      width: '90%',
      height: deviceHeight - 200,
      // paddingVertical: 30,
      // paddingHorizontal: 25,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalCross: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
}