const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    form: {
        marginTop:20,
        marginHorizontal: 10,
        // borderColor: "rgba(113,184,95,0.3)",
        // borderWidth: 2,
        padding: 10,
        // borderRadius: 6
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
        borderWidth: 1,
        borderColor:'rgba(59,29,37,0.5)',
    },
    formGroup1: {
        width: '100%',
        marginBottom: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        borderWidth: 1,
        borderColor:'rgba(59,29,37,0.5)',
        flexDirection: 'row',
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
      formSubGroup2: {
        width: '80%',
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
        width: '85%', 
        height: 60, 
        alignContent: 'center', 
        display: 'flex', 
        flexDirection: 'row'
      },
      projectView:{
        width: '100%', 
        height: 60, 
        alignContent: 'center', 
        display: 'flex', 
        flexDirection: 'row'
      }

}