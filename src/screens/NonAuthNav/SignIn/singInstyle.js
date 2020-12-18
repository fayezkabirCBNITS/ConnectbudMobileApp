export default {
  main: {
    flex: 1,
    backgroundColor:'#71b85f'
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
        marginTop:80,
        justifyContent: 'center', 
        marginBottom: 50, 
        alignItems: 'center'
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
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
      },
      signinBtn:{
        width: '70%',
        backgroundColor: '#f7ec1e', 
        padding: 15, 
        alignItems: 'center', 
        marginTop: 20, 
        borderRadius: 40
      },
      signinText:{
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
      },
      iconDiv:{
        display: 'flex', 
        flexDirection: 'row'
      },
      iconImg:{
        width:50,
        height:50,
        borderRadius:25,
        marginTop:50,
        margin:5
      },
      signupAcnt:{
        marginTop: 30,
        color:'#fff' ,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
      },
      signupText:{
        color: '#f7ec1e',
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
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
      inputHead: {
        color: 'rgba(59,29,37,0.5)',
        fontSize: 14,
        marginBottom: 5,
      },
      inputGroup: {
        color: '#fff',
        height: 45,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
      },
      errorText: {
        width: '100%',
        color: '#fc0303',
      },
}