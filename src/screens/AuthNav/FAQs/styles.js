const React = require('react-native')
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;



export default {
    headerText: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold'
    },
    mainContainer: {
        marginHorizontal: '5%',
        marginVertical: '2%'
    },
    subHeadText: {
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10
    },
    collapse: {
        borderRadius: 50,
        marginVertical: '2%'
    },
    collapseHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 4
    },
    collapseId: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#71b85f'
    },
    Ids: {
        color: '#fff',
        fontFamily: 'Poppins-SemiBold'
    },
    collapseTitle: {
        width: '60%',
        marginLeft: 20
    },
    collapseTitleText: {
        fontFamily: 'Poppins-SemiBold'
    },
    CollapseBody: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 4
    },
    collapseBodyText: {
        fontFamily: 'Poppins-Regular',
        padding: '5%',
    }

}