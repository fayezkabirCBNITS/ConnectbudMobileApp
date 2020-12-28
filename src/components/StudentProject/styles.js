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
        borderRadius : 7,
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
        width : "85%",
        paddingLeft : 8
    },
    leftSection : {
        width : "15%",
        alignItems : 'center',
        marginTop: 3
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
    editBtnText: {
        fontFamily: 'Poppins-Regular',
        color: '#008000',
        marginLeft: 10,
        fontSize: 16,
        marginTop: 3,
      },
      editBtn: {
        width: 85,
        height: 30,
        backgroundColor: '#71b85f',
        borderRadius: 30 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginTop: 20,
        marginRight: 160
      },
}
