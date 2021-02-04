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
    title: {
        color: 'rgba(59,20,37,0.5)',
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    inputGrp: {
        marginHorizontal: '5%',
        marginVertical: '2%',
        display: 'flex',
        flexDirection: 'row'
    },
    formGroup: {
        width: '100%',
        marginBottom: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        elevation: 4,
    },
    Skills: {
        width: '75%',
        marginBottom: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        elevation: 4,
        marginHorizontal: '5%',
        display: 'flex',
        flexDirection: 'row',
        marginVertical: '2%',
    },
    Skills1: {
        width: '90%',
        marginBottom: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        elevation: 4,
        marginHorizontal: '5%',
        display: 'flex',
        flexDirection: 'row',
        marginVertical: '2%',
    },
    icon: {
        marginBottom: 5,
        backgroundColor: '#b0aea7',
        borderRadius: 4,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    budgetInput: {
        width: '80%',
        marginBottom: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        elevation: 4,
    },
    btnGrp: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: '5%',
        marginBottom: 20
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
    authBtnCancel: {
        width: '45%',
        height: 46,
        borderRadius: 40,
        backgroundColor: '#ed374a',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    authBtnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        letterSpacing: 1,
        marginTop: 2
    },
    divider: {
        backgroundColor: 'rgba(59,29,37,0.5)',
        width: '90%',
        marginHorizontal: '5%',
        height: 1
    },
}

