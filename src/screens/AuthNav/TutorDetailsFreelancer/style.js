const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    boxWrapper : {
        borderColor : "rgba(113,184,95,0.3)",
        borderWidth : 2,
        padding : 10,
        marginTop : 20,
        borderRadius : 8
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
    actionEdtBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
      },
    boxTitle : {
        fontSize : 18,
        fontFamily : "Poppins-SemiBold",
        color : "#71b85f"
    },
    daysAgo :{
        fontSize : 14,
        fontFamily : "Poppins-Regular",
        color : "rgba(0,0,0,0.35)"
    },
    applyBtn : {
        width : "60%",
        marginHorizontal : "20%",
        backgroundColor : "#71b85f",
        paddingVertical : 10,
        marginTop : 15,
        borderRadius : 25,
        overflow : "hidden"
    },
    applyBtnText : {
        textAlign : "center",
        color : "#fff",
        fontSize : 16
    },
    courseDetails :{
        borderBottomColor : "rgba(0,0,0,0.15)",
        borderBottomWidth : 1,
        marginTop : 10,
        marginBottom : 10,
        fontSize : 16,
        fontFamily : "Poppins-SemiBold",
    },
    courseText : {
    },
    textSemibold : {
        fontSize : 14,
        fontFamily : "Poppins-SemiBold",
    },
    syllabusText : {
        fontSize : 14,
        fontFamily : "Poppins-Regular",
        color: "rgba(0,0,0,0.45)"
    },
    similarJobWrapper : {
        borderColor : "rgba(113,184,95,0.3)",
        borderWidth : 2,
        marginTop : 20,
        borderRadius : 8

    },
    slimilarJob : {
        borderBottomColor : "rgba(0,0,0,0.15)",
        borderBottomWidth : 1,
        paddingVertical : 8
    },
    similiarjobText : {
        textAlign : "center",
        color : "#71b85f",
        fontFamily : "Poppins-SemiBold",
        fontSize : 16
    },
    iconList :{
        flexDirection : "row",
        marginBottom : 8
    },
    iconText : {
        // marginLeft : 10
    },
    scrolling: {
        height : deviceHeight -100,
        // backgroundColor : "red"
    },
    similarList : {
        borderBottomColor : "rgba(113,184,95,0.3)",
        borderBottomWidth : 1,
        paddingHorizontal : 10,
        paddingVertical : 5

    }


}