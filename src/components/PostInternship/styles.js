const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    title: {
        color: 'rgba(59,20,37,0.5)',
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    flastListHead: {
        color: 'rgba(59,29,37,0.5)',
        fontSize: 14,
        marginBottom: 5,
    },
    skillView: {
        width: '75%',
        height: 60,
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal:'5%',
        marginVertical:10,
    },
    skillView1: {
        width: '90%',
        height: 60,
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal:'5%',
        marginVertical:10,
    },
    formGroup1: {
        width: '100%',
        marginBottom: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        
        borderColor: 'rgba(59,29,37,0.5)',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        textAlignVertical: 'top',
    },
    formSubGroup1: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formSubGroup2: {
        width: '80%',
    },
    inputGroup: {
        color: '#3B1D25',
        height: 45,
        fontSize: 15,
    },
    flatList:{
        width: '77%',
        // marginHorizontal: '5%',
        paddingHorizontal:5,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        borderWidth: 1,
        borderColor:'rgba(59,29,37,0.5)',
        flexDirection: 'row',
    },
    flatList1:{
        width: '90%',
        marginHorizontal: '5%',
        paddingHorizontal:5,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        borderWidth: 1,
        borderColor:'rgba(59,29,37,0.5)',
        flexDirection: 'row',
    },
    details: {
        width: '100%',
        height:30,
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
      usd:{
        width:'30%',
        backgroundColor: '#fff',
        borderRadius: 4,
        fontSize: 16,
        justifyContent:'center',
        alignItems:'center',
        borderColor: 'rgba(59,29,37,0.5)',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
          
      }
}

