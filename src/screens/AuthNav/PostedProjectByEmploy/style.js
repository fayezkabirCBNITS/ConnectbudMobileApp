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
    }

}