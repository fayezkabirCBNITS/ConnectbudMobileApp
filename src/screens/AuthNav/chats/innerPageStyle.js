const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    userImage :{
        height: 50,
        width : 50,
        borderRadius : 25,
        borderColor :"blue",
        borderWidth : 1
    }
}