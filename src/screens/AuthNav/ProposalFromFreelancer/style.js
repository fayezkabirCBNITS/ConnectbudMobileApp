const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    separator: {
        height: 80,
        backgroundColor : "rgba(113,184,95,0.05)"
        // marginVertical : 10
    },
    scrolling: {
        height: deviceHeight - 140 
    },
    collapseTitle: {
        flexDirection: "column",
        justifyContent: "center",
        // alignItems : "center",
    },
    projectHead: {
        color: "#000",
        fontSize: 17,
        fontFamily: "Poppins-SemiBold"
    },
    projectName: {
        color: "#71b85f",
        fontSize: 16,
        fontFamily: "Poppins-regular"
    },
    studentName: {
        borderBottomColor: "rgba(113,184,95,0.3)",
        borderBottomWidth: 2,
        flexDirection: "row",
        paddingVertical: 12,
        paddingLeft: 12
    },
    name: {
        color: "#71b85f",
        fontSize: 16,
        fontFamily: "Poppins-regular"
    },
    namelabel: {
        color: "#000",
        fontSize: 16,
        fontFamily: "Poppins-regular"
    },
    collapseWrap: {
        borderColor: "rgba(113,184,95,0.3)",
        borderWidth: 2,
        padding: 0,
        margin: 0,
        marginTop: 10,
        borderRadius : 8,
        overflow : "hidden"
    },
    quesAns: {
        marginVertical: 10,
        paddingLeft: 8
    },
    skillGroup: {
        flexDirection: "row",
        marginTop: 10
    },
    PrSkills: {
        backgroundColor: "rgba(0,0,0,0.25)",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginBottom: 15,
        borderRadius : 12
    },
    reqprSkill: {
        paddingLeft: 12
    },
    btnWrapper : {
        flexDirection : "row",
        width : "100%",
        marginBottom : 20,
        marginTop : 12
    },
    accbtn: {
        width: "40%",
        backgroundColor: "#71b85f",
        borderRadius: 25,
        marginLeft: "8%",
        marginRight: "2%",
        paddingVertical: 10
    },
    rejBtn : {
        width: "40%",
        backgroundColor: "#71b85f",
        borderRadius: 25,
        marginRight: "8%",
        marginLeft: "2%",
        paddingVertical: 10
    },
    btnText : {
        textAlign: "center",
        color : "#fff",
        fontSize : 16
    }

}