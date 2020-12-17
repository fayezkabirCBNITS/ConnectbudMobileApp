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
    selectSkillText : {
            fontSize : 22
    },
    continueText : {
        fontSize : 20,
        color : "#fff",
    },
    scroll : {
        width : "100%",
        height : deviceHeight - 245,
        // backgroundColor : "red"
    },
    separator : {
        justifyContent : "space-between",
        alignItems : "center",
        flexDirection : "row"

    },
    portfolioHead: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        marginTop: 16,
        marginBottom:8,
        color: '#71b85f',
      },
      formGroup1: {
        width: '100%',
        flexDirection: 'row',
        padding: 5,
        marginBottom: 15,
    
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        color: '#000',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      formSubGroup1: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      formSubGroup2: {
        width: '80%',
      },
      inputHead: {
        //color: 'rgba(59,29,37,0.5)',
        fontSize: 14,
        marginBottom: 5,
        fontWeight:'bold',
        color:'#000000'
      },
      inputGroup: {
        color: '#3B1D25',
        height: 45,
        fontSize: 15,
      },
      authBtn: {
        width: '50%',
        marginHorizontal: '8%',
        height: 46,
        borderRadius: 23,
        backgroundColor: '#71b85f',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 5,
      },
      authBtnText: {
        color: '#fff',
        fontSize: 14,
        letterSpacing: 1,
      },

      singleItemView: {
       width:'100%',
       height:45,
        backgroundColor: '#71b85f',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingLeft: 8,
        margin: 1,
        borderRadius: 8
      },
    
      singleItemText: {
        color: '#fff',
        fontSize: 15,
        paddingRight: 18
      },
    
    
      FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
      },
    
      deleteButton: {
        position: 'absolute',
        right: 10,
        width: 25,
        height: 25,
        borderRadius: 18,
        padding: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      },
    
      removeIcon: {
        width: '100%',
        fontSize: 20
      }
}