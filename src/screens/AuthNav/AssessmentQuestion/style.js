const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    Heading: {
        fontWeight: 'bold',
        fontSize: 15,
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
        marginVertical: '5%',
        marginHorizontal: '5%',
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

        // textAlignVertical: 'top', 
        // marginHorizontal: '5%',
        // width: '90%',
        // flexDirection: 'row',
        // padding: 5,
        // marginBottom: 15,
        // backgroundColor: '#f8f8f8',
        // borderRadius: 5,
        // color: '#000',
        // fontSize: 16,
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.23,
        // shadowRadius: 2.62,
        // elevation: 4,

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
    authBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    errorText: {
        width: '100%',
        color: '#fc0303',
        marginLeft: 14,
      },
}

