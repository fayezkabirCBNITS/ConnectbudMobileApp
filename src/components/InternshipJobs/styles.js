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
        alignItems : "flex-start",
        flexDirection : "row",
        width : "100%",
        borderColor : "rgba(113,184,95,0.3)",
        borderWidth : 2,
        marginVertical : 15,
        padding : 15,
        borderRadius : 8
    },
    moneyContainer : {
        borderColor : "rgba(113,184,95,1)",
        borderWidth : 1,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-around",
        overflow : "hidden",
        borderRadius : 5,
        marginTop : 15,
        backgroundColor: '#fff'
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
    timeAgo : {
        marginBottom : 5,

    },
    rightSection : {
        // width : "85%",
        width: '100%',
        paddingLeft : 8
    },
    leftSection : {
        width : "15%",
        alignItems: 'center',
        marginTop: 4
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
    },
    noData: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: deviceHeight - 250,
    },
    noDataText: {
        marginTop: 15,
        fontSize: 22,
        fontFamily: 'Poppins-SemiBold',
        color: '#71b85f',
    },
}
