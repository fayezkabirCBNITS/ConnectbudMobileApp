const React = require("react-native");
const { Dimensions } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
    selectSkill : {
        justifyContent : "space-between",
        alignItems : "center",
        flexDirection : "row",
        marginBottom : 25
    },
    selectSkillText : {
            fontSize : 22
    },
    continueBtn : {
        width :250,
        marginRight : "auto",
        marginLeft : "auto",
        backgroundColor : "#71b85f",
        justifyContent : "center",
        alignItems : "center",
        paddingTop : 10,
        paddingBottom : 10,
        borderRadius : 50,
        marginTop : 25
    },
    continueText : {
        fontSize : 20,
        color : "#fff",
    },
    accordianHeader : {
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : "center",
    },
    accordianhead : {
        backgroundColor : "#71b85f",
        borderRadius : 5,
        height : 50,
        marginBottom : 10
    },
    accordianHeadIcon : {
        marginRight : 15
    },
    accordianHeadTitle : {
        fontSize : 18,
        color : "#fff"
    },

    scroll : {
        width : "100%",
        height : deviceHeight - 200,
        // backgroundColor : "red"
    },
    separator : {
        justifyContent : "space-between",
        alignItems : "center",
        flexDirection : "row"

    },
    // accordianBody : {
    //     borderColor : "rgba(0,0,0,0.1)",
    //     borderWidth : 2,
    //     width : "100%",
    //     // margin: 25,
    //     marginTop : 15,
    // },
    itemswrapper : {
        width : "100%",
        height: 250,
        padding : 25,
        justifyContent: "center",
        alignItems : "center",
        flexDirection : "row",
        backgroundColor : "#fff",
        borderColor : "rgba(0,0,0,0.15)",
        borderWidth : 1,
        marginBottom : 10,
    },
    skillItems : {
        marginBottom : 15,
        borderColor : "rgba(0,0,0,0.35)",
        borderWidth : 1,
        justifyContent : "center",
        alignItems : "center",
        paddingTop : 10,
        paddingBottom : 10,
        paddingRight : 20,
        paddingLeft : 20,
        borderRadius : 25,
    },
    angle: {
        marginRight : 15
    }
}