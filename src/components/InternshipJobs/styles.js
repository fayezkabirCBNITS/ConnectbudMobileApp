const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    popins : {
        fontFamily : "Poppins"
    },
    flexstyle : {
        flexDirection : "row",
        alignItems : "center"
    },
    subjectWrapper : {
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "row",
        width : "100%",
        borderColor : "rgba(113,184,95,0.3)",
        borderWidth : 2,
        marginVertical : 15,
        padding : 15,
        borderRadius : 8
    },
    moneyContainer : {
        borderColor : "rgba(113,184,95,0.5)",
        borderWidth : 2,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-around",
        overflow : "hidden",
        borderRadius : 5,
        marginTop : 15
    },
    inrtxt : {
        backgroundColor : "#71b85f",
        color: "#fff",
        width: "50%",
        textAlign : "center",
        paddingVertical : 5
    },
    usdText : {
        backgroundColor : "#fff",
        color: "#000",
        width: "50%",
        textAlign : "center",
        paddingVertical : 5

    },
    timeAgo : {
        marginBottom : 5,

    },
    rightSection : {
        width : "85%",
        paddingLeft : 8
    },
    leftSection : {
        width : "15%"
    },
    boxTitle : {
        fontSize : 16,
        fontFamily: 'Poppins-SemiBold',
    },
    boxTexts : {
        fontSize : 12,
        color : "rgba(0,0,0,0.55)",
        fontFamily: 'Poppins-Regular',
        marginBottom : 10
    },
    iconText : {
        marginLeft : 12,
        fontSize : 11,
        fontFamily: 'Poppins-Regular',
    }

}
