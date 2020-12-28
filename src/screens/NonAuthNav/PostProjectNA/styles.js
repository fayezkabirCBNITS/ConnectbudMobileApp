const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    form: {
        marginTop:20,
        marginHorizontal: 10,
        padding: 10,
      },
      title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 15,
      },
      inputHead: {
        color: 'rgba(59,29,37,0.5)',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
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
      textAlignVertical: 'top'
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
      fontSize: 11,
      fontFamily: 'Poppins-Regular',
      color: '#000',
      marginLeft:3,
      textAlign: "center",
    },
}