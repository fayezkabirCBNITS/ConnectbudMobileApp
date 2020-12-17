const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  main: {
    flex: 1,
    backgroundColor:'#71b85f'
  },
  formrow: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    alignSelf:'flex-start',
    justifyContent:'flex-start'
},
  container: {
    width: '100%',
    paddingHorizontal: '5%',
    marginTop:40,
  },
    inputDiv: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
      },
      coverImage: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      logo:{
        justifyContent: 'center', 
        marginBottom: 50, 
        alignItems: 'center', 
        opacity:0.9
      },
      inputText:{
        height: 40, 
        width: '100%', 
        borderBottomWidth: 2,
        borderBottomColor:'#f7ec1e', 
        borderRadius: 4, 
        marginTop: 30,
        fontSize: 16,
        color:'#fff'
      },
      forgetDiv:{
        width: '90%', 
        alignItems: 'flex-end', 
        marginTop: 20,
        marginBottom: 10
      },
      forgetText:{
        color: '#f7ec1e',
        fontSize: 16
      },
      signinBtn:{
        width: '70%',
        backgroundColor: '#f7ec1e', 
        padding: 15, 
        alignItems: 'center', 
        alignSelf:'center',
        marginTop: 20, 
        borderRadius: 40,
      },
      signinText:{
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
      },
      signupAcnt:{
        marginTop: 20,
        marginBottom:50,
        fontFamily: 'Poppins-Regular',
        color:'#fff' ,
        fontSize: 14
      },
      signupText:{
        color: '#f7ec1e',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14
      },
      formGroup1: {
        width: '100%',
        flexDirection: 'row',
        padding: 5,
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor:'#f7ec1e', 
      },
      formSubGroup1: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      formSubGroup2: {
        width: '90%',
      },
      formSubGroupNum: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
     
      },
      formSubGroup2Num: {
        width: '75%',
      },
      inputHead: {
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        marginBottom: 5,
        alignSelf:'flex-start',
      },
      inputGroup: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        height: 45,
        fontSize: 14,
      },
  radio: {
    backgroundColor:'transparent',         
    borderWidth:0,
    paddingLeft:0,
  
},
};
