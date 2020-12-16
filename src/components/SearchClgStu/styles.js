const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    skillView: {
        width: '100%',
        height: 60,
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: '5%',
        marginTop: '2%'
    },
    formGroup1: {
        width: '90%',
        marginBottom: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(59,29,37,0.5)',
        flexDirection: 'row',
    },
    formSubGroup2: {
        width: '90%',
    },
    flastListHead: {
        color: 'rgba(59,29,37,0.5)',
        fontSize: 14,
        marginBottom: 5,
    },
    flatList: {
        width: '90%',
        paddingHorizontal: 5,
        marginHorizontal: '5%',
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(59,29,37,0.5)',
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 20,
        marginTop: 10,
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
        width: "100%",
        borderColor: "rgba(113,184,95,0.3)",
        borderWidth: 2,
        marginVertical: 15,
        padding: 15,
        borderRadius: 6
    },
    moneyContainer: {
        borderColor: "rgba(113,184,95,0.5)",
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        overflow: "hidden",
        borderRadius: 5,
        marginTop: 15
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: -72
    },
    timeAgo: {
        marginBottom: 5,

    },
    rightSection: {
        width: "78%",
        paddingLeft: 5
    },
    leftSection: {
        width: "22%"
    },
    boxTitle: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
    },
    iconText: {
        marginLeft: 10,
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
        color: 'rgba(59,29,37,0.5)',
    },
    btnGrp:{
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 10
    },
    subBtn:{
        backgroundColor: '#E4E4E4', 
        borderRadius: 40, 
        width: '30%', 
        alignItems: 'center', 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        marginHorizontal: 3
    },
    btnText:{
        color: 'rgba(59,29,37,0.5)',
    },

}