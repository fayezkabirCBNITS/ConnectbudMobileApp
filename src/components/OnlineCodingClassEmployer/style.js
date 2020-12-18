const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {

    form: {
        margin: 20,
        padding: 10,
    },
    inputHead: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 5,
    },
    formSubGroup2: {
        width: '80%',
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
        flexDirection: 'row',
    },
    skillText: {
        fontSize: 11,
        fontFamily: 'Poppins-Regular',
        color: '#000',
        marginLeft: 3,
        textAlign: "center",
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
    syllabusHeader: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10
    },
    chapterIndexing: {
        flexDirection: "row",
        marginBottom: 5
    },
    dotCircle: {
        marginRight: 8
    },
    topics: {
        paddingLeft: 15
    },
    chapterName: {
        color: "rgba(0,0,0,0.45)",
        fontFamily: "Poppind-Regular"
    },
    syllabusSection: {
        borderBottonColor: "rgba(113,184,95,0.3)",
        borderBottomWidth: 1,
        borderTopColor: "rgba(113,184,95,0.3)",
        borderTopWidth: 1,
        paddingVertical: 12,
        marginBottom: 15
    },
    formSubGroup1: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    courseDetails : {
        flexDirection : "row",
        marginBottom : 8
    },
    courseLabel : {

    },
    scrolling : {
        backgroundColor : "red",
        height : 200
    }
}