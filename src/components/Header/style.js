const React = require("react-native");
const { Dimensions } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
    mutetext: {
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        color: '#616161',
        lineHeight: 28,
        flex: 1
    },
    carddesc: {
        width: '60%',
        paddingLeft: 10,
        paddingRight: 10
    },
    sheading: {
        color: '#111010',
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
    },
    msgtext: {
        color: '#616161',
        fontSize: 14,
        lineHeight: 26,
        fontFamily: 'Montserrat-Regular',
    },
    aligncenter: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'space-between',
        width: '100%',
        height: 'auto'
    },
    whitecontainer: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
        paddingRight: 0,
    },
    cbox: {
        width: 90,
        paddingRight: 6,
        paddingLeft: 6,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 15,
        position: 'relative'
    },
    pname: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        color: '#111010',
        lineHeight: 26
    },
    grdot: {
        backgroundColor: '#38e738',
        width: 12,
        height: 12,
        borderRadius: 12 / 2,
        position: 'absolute',
        zIndex: 9,
        top: -4,
        right: 22
    },
    sm: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
    },
    datebox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        fontSize: 13,
        fontFamily: 'Montserrat-Medium',
        color: '#111010',
    },
    online: {
        top: 2,
        right: 'auto',
        zIndex: 99,
        left: 38
    },
    deckswipe: {      
        flex:1,
        minHeight:deviceHeight - 90       
    },
    content: {
        flex: 1, 
        overflow:'hidden',
        height: deviceHeight - 180,
        borderRadius: 6,
    },
    carddeck: {
        width: deviceWidth - 30,
        height: deviceHeight - 180,       
        borderRadius: 6,       
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
        marginLeft:'auto',
        marginRight:'auto',
        position:'relative'
    },   
    deckimg: {       
       resizeMode:'cover',       
       width:'100%',
       height:'100%'
    },
    hero: {
        position:'absolute',
        zIndex:99,
        flex:1,
        top:0,
        bottom:0,
        left:0,
        right:0,
        flexDirection:'row',
        alignItems:'flex-end',
        paddingLeft:15,
        paddingBottom:30,
        paddingRight:10
    },
    deckname: {
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        color: '#fff',
        lineHeight:32,
        marginBottom:10
    },
    info:{
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        color: '#fff',
        lineHeight:26,
        marginLeft:6
    },
    limg: {
        width:55,
        height:55,
        resizeMode:'contain'
    },
    reactbtn: {
        paddingLeft:10,
        paddingRight:10,
        paddingTop:20
    }

}