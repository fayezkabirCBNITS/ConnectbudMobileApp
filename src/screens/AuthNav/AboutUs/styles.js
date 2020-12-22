const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


export default{
    headerText:{
        marginTop: 15, fontSize: 18, fontFamily: 'Poppins-SemiBold'
    },
    subHeaderText:{
        marginTop: 15, fontSize: 15, fontFamily: 'Poppins-SemiBold'
    },
    pText:{
        fontFamily: 'Poppins-Regular', marginBottom: 5
    }
}