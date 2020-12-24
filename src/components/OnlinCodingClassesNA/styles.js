const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    classText: {
        fontFamily: 'Poppins-SemiBold',
        marginTop:'3%'
    },
    selectBtnDiv: {
        display: 'flex',
        flexDirection: 'row',
    },
    selectBtn: {
        width: '47%',
        backgroundColor: '#E4E4E4',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginRight: 10,
        paddingHorizontal:10
    },
    ActiveSelectBtn: {
        width: '47%',
        backgroundColor: '#71b85f',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginRight: 10,
        paddingHorizontal:10
    },
    selectBtnText: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#000',
        textAlign: "center",
    },
    AselectBtnText: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
        textAlign: "center",
    },
    ActiveSelectBtnText: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
        textAlign: "center",
    },
    selectCourseDiv: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        // marginHorizontal:'5%'
    },
    courseBtn: {
        width: '45%',
        backgroundColor: '#E4E4E4',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginRight: 10,
        paddingHorizontal:20,
        paddingVertical: 10
    },
    AcourseBtn: {
        width: '45%',
        backgroundColor: '#71b85f',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginRight: 10,
        paddingHorizontal:20,
        paddingVertical: 10
    },
    syllabus:{
        width:'100%',
        borderColor:'#71b85f',
        borderWidth:1,
        borderRadius:4,
        marginTop:10,
        paddingHorizontal:10
    },
    syllabusHeader:{
        fontFamily:'Poppins-SemiBold',
        marginVertical:10
        
    },
    syllabusText:{
        fontFamily:'Poppins-Regular',
        marginTop:10
    },
    courseDetails:{
        borderColor:'',
        borderWidth:1,
    },
    boldText:{
        fontFamily:'Poppins-SemiBold',
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
        marginTop:10
      },
      formSubGroup1: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      formSubGroup2: {
        width: '80%',
      },
      inputHead: {
        color:'black',
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 5,
      },
      inputHead2: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        marginTop: 10,
      },
      authBtn: {
        width: '50%',
        marginHorizontal: '8%',
        height: 46,
        borderRadius: 23,
        backgroundColor: '#71b85f',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 20,
      },
      authBtnText: {
        color: '#fff',
        fontSize: 14,
        letterSpacing: 1,
        fontFamily: 'Poppins-SemiBold',
      },
      scroll: {
        height: deviceHeight - 84,
      },

};
