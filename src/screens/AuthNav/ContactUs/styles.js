const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  scroll: {
    height: deviceHeight - 84,
  },
    formGroup: {
        width: '100%',
        height: 50,
        marginBottom: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        fontSize: 16,
        paddingHorizontal: 15,
        borderColor: 'rgba(59,29,37,0.5)',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        textAlignVertical: 'center',
    },
    formGroup2: {
      width: '100%',
      height: 100,
      marginBottom: 5,
      backgroundColor: '#f8f8f8',
      borderRadius: 4,
      fontSize: 16,
      paddingHorizontal: 15,
      borderColor: 'rgba(59,29,37,0.5)',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      textAlignVertical: 'top',
  },
    authBtn: {
        width: '55%',
        // marginHorizontal: '8%',
        height: 50,
        borderRadius: 40,
        backgroundColor: '#71b85f',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 20,
      },
      authBtnText: {
        color: '#fff',
        fontSize: 18,
        fontFamily:'Poppins-SemiBold',
        letterSpacing: 1,
        marginTop: 4
      },
      errorText: {
        width: '100%',
        color: '#fc0303',
        marginLeft: 14,
      },
}

