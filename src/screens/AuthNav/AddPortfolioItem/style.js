const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


export default {
    headText:{
        color: '#60a84e', 
        fontWeight: 'bold', 
        padding: 20, 
        fontSize: 16
    },
    formGroup: {
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        borderColor: 'rgba(59,29,37,0.5)',
        shadowColor: '#000',
        paddingHorizontal:10,
        elevation: 4,
        textAlignVertical: 'top'
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
        fontSize: 16,
    },
    flatList1:{
        width: '90%',
        marginHorizontal: '5%',
        paddingHorizontal:5,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        
        borderColor:'rgba(59,29,37,0.5)',
        flexDirection: 'row',
    },
    formInput:{
        marginHorizontal: '5%',
        marginVertical: '3%' 
    },
    formGroup1: {
        marginBottom: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        paddingHorizontal:10,
        borderColor: 'rgba(59,29,37,0.5)',
        flexDirection: 'row',
        shadowColor: '#000',
       
        elevation: 4,
        textAlignVertical: 'top',
    },
    details: {
        width: '100%',
        height:30,
      },
      flastListHead: {
        color: 'rgba(59,29,37,0.5)',
        fontSize: 14,
        marginVertical:5
    },
    formSubGroup2Num: {
        width: '65%',
      },
      formSubGroupNum: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
     
      },
      btnGrp:{
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-around',
        marginHorizontal:'4%'
      },
      authBtn: {
        width: '45%',
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
}
