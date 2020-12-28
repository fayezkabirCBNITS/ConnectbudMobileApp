const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    Heading: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        padding: 20,
        color:'#71b85f',
    },
    divider: {
        backgroundColor: 'rgba(59,29,37,0.5)',
        width: '90%',
        marginHorizontal: '5%',
        marginTop: -10,
        height: 1
    },
    popins: {
        fontFamily: "Poppins"
    },
    flexstyle: {
        flexDirection: "row",
        alignItems: "center"
    },
    subjectWrapper: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 15,
        padding: 15,
    },
    subContainer: {
        // marginVertical:'5%',
        // borderColor:'rgba(113,184,95,0.3)' ,
        // borderRadius:4,
        // borderWidth:1,

        marginVertical:'5%',
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: -110
    },
    timeAgo: {
        marginBottom: 5,
    },
    rightSection: {
        width: "78%",
        paddingLeft: 5,
        marginTop: 10,

    },
    leftSection: {
        width: "22%"
    },
    boxTitle: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
    },
    subTitle: {
        lineHeight: 16,
        fontSize: 13,
        fontFamily: 'Poppins-SemiBold',
        color: 'rgba(59,29,37,0.5)',
    },
    iconText: {
        marginLeft: 10,
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
        color: 'rgba(59,29,37,0.5)',
    },
    btnGrp: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        flexWrap: 'wrap',

    },
    subBtn: {
        backgroundColor: '#E4E4E4',
        borderRadius: 4,
        // width: '30%', 
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 3,
        marginVertical: 3,
        color: 'rgba(59,29,37,0.5)',
    },
    subBtn1: {
        alignItems: 'center',
        // paddingHorizontal: 10, 
        paddingVertical: 5,
        marginHorizontal: 3,
        marginVertical: 3
    },
    btnText: {
        color: 'rgba(59,29,37,0.5)',
    },
    authBtn: {
        width: '60%',
        height: 40,
        borderRadius: 40,
        backgroundColor: '#71b85f',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    authBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    },

}