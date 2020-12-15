export default {
    sidebar: {
        flex:1,
        backgroundColor:'transparent',      
    },
    sidewrap: {
        backgroundColor:'#fd003a',
        flex:1,       
        paddingbottom:20,            
    },
    profiletop:{             
        marginBottom:20,
        paddingTop:30,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:20,
        alignItems:'center',
        height:180,
        resizeMode:'contain'
    },
    profileround: {
        height:90,
        width:90,
        borderRadius:90/2, 
        flexDirection:'row',
        position:'relative',
        marginBottom:5  ,
        borderWidth:6,
        borderColor:'#fff' 
    },    
    profileimg: {
        width:80,
        height:80,
        borderRadius:80/2,        
    },
    namepro: {
        fontSize:20,
        color:'#fff',     
        fontFamily: 'Montserrat-Bold',
        marginBottom:10
    },
    profilebadge: {
        width:26,
        height:26,
        borderRadius:26/2,
        overflow:'hidden',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        shadowColor: '#ddd',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 1,  
        elevation: 4,
        backgroundColor:'#fff',
        position:'absolute',
        bottom:5,
        right:5
      },
      menulink: {
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingBottom:15,
        paddingTop:15,
        paddingRight:28,
        paddingLeft:15,
        position:'relative'
      },
      linktext: {
          color:'#e8e8e8',
          fontSize:18,
          fontFamily: 'Lato-Ragular', 
      },
      activetext: {
        color:'#e7e7e7'
      },
      micon: {
        resizeMode:'contain',
        height:22,
        width:28,
        
      },
      imgbx: {
        flexDirection:'row',
        justifyContent:'center',
        width:26,
        marginRight:10
      },
      angleicon: {
        position:'absolute',
        right:8,
        top:18
      }
}