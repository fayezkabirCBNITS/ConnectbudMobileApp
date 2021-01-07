const React = require("react-native");
const { Dimensions } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
    
  header: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#71b85f',
    borderBottomWidth: 1,
  },
  image: {
    width: 140,
    height: 35,
  },
    categoryTitle: {
        fontSize: 20,
        color: "#000"
    },
    categoryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20
    },
    continueBtn: {
        width: 120,
        backgroundColor: "#71b85f",
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"

    },
    continueBtnText: {
        fontSize: 20,
        color: "#fff",
        paddingBottom: 5

    },
    categoryBox: {
        borderColor: 'red',
        borderWidth: 1,
        padding: 10
    },
    categoryList: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        flexWrap : "wrap"
    },
    categorylistedItem: {
        width: "47%",
        height : 120,
        justifyContent : "center",
        alignItems : "center",
        borderColor: 'rgba(0,0,0,0.25)',
        borderRadius : 8,
        borderWidth: 1,
        marginBottom : 20
    },

    scroll : {
        width : "100%",
        height : deviceHeight - 165,
    },
    categorySelected : {
        backgroundColor : "#c6e3bf"
    },
    categoryText : {
        fontSize : 16
    },
    categoryIcon : {
        backgroundColor: "#71b85f",
        padding : 15,
        borderRadius : 100,
        width: '40%',
        height: 65,
    }

};
