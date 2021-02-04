const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    Heading: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        padding: 20,
    },
    divider: {
        backgroundColor: 'rgba(59,29,37,0.5)',
        width: '90%',
        marginHorizontal: '5%',
        height: 1,
        marginTop:-10
    },
    quesHead: {
        marginHorizontal: '5%',
        marginBottom: 15,
        marginTop: 10,
        color: 'rgba(59,20,37,0.5)',
        fontSize: 14,
        fontWeight: 'bold',
    },
    inputBox:{
        textAlignVertical: 'top', 
        borderColor: 'rgba(59,29,37,0.5)', 
        borderWidth: 1, 
        borderRadius: 4, 
        paddingHorizontal: 10,
        marginHorizontal: '5%'
    },
    inputBox2:{
        textAlignVertical: 'center', 
        borderColor: 'rgba(59,29,37,0.5)', 
        borderWidth: 1, 
        borderRadius: 4, 
        paddingHorizontal: 10,
        marginHorizontal: '5%'
    },
    uploadBtn: {
        width: '30%',
        height: 30,
        borderRadius: 40,
        borderColor:'rgba(113,184,95,0.8)' ,
        borderWidth:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%'
    },
    uploadBtnText: {
        color: 'rgba(113,184,95,0.8)',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    authBtn: {
        width: '40%',
        height: 40,
        borderRadius: 40,
        backgroundColor: '#71b85f',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        margin: 5,
    },
    authBtnCancel: {
        width: '40%',
        height: 40,
        borderRadius: 40,
        backgroundColor: '#ed374a',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        margin: 5,
    },
    authBtnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        letterSpacing: 1,
        marginTop: 2
    },
    errorText: {
        width: '100%',
        color: '#fc0303',
        marginLeft: '5%',
      },
}

