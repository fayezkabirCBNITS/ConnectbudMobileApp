const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default{
    headText:{
        fontFamily: 'Poppins-SemiBold', 
        fontSize: 16, marginTop: 20
    },
    primaryHead:{
        fontFamily: 'Poppins-SemiBold', 
        color: '#71b85f', 
        marginVertical: 10
    },
    pText:{
        fontFamily: 'Poppins-Regular',
        marginTop: 10
    },
    pointPara:{
        flexDirection: 'row', 
        marginHorizontal: '5%', 
        marginTop: 10 
    },
    points:{
        marginLeft: 10, fontFamily: 'Poppins-Regular'
    },
    subHeader:{
        fontFamily: 'Poppins-SemiBold', 
        marginTop: 10
    },
    fonts:{
        fontFamily: 'Poppins-Regular'
    },
    SemiBold:{
        fontFamily: 'Poppins-SemiBold'
    }
}