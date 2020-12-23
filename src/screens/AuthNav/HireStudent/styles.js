const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  imgSec: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 40 / 2,
  },
  userImg: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 10,
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
  },
  budget: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
  projectName: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  projectTab: {
    width: '100%',
    backgroundColor: '#71b85f',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  collapseCntn: {
    width: '100%',
    borderColor: 'rgba(113,184,95,0.3)',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  questionHead: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  number: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#71b85f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    marginTop: 4,
  },
  questionText: {
    width: '88%',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  radioSec: {
    width: '88%',
    marginLeft: 'auto',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginTop: 4,
    marginLeft: 10,
  },
  radioTextGreen: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#71b85f',
    marginTop: 4,
    marginLeft: 10,
  },
  marTop20: {
    marginTop: 20,
  },
  button: {
    width: '65%',
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: '#71b85f',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginTop: 4,
  },
  des: {
    width: '100%',
    height: 50,
    borderColor: 'rgba(113,184,95,0.4)',
    borderWidth: 1,
    borderRadius: 5,
    padding: 0,
    paddingHorizontal: 15,
  },
  date: {
    width: '100%',
    height: 50,
    borderColor: 'rgba(113,184,95,0.4)',
    borderWidth: 1,
    borderRadius: 5,
    padding: 0,
    paddingHorizontal: 15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  wrap: {
    width: '100%',
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  inputCard: {
    width: '100%',
    borderColor: 'rgba(113,184,95,0.5)',
    borderWidth: 1,
    borderRadius: 5,
    paddingBottom: 15,
    paddingTop: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  scroll: {
    height: deviceHeight - 84,
  },
  tab: {
    marginTop: 15,
  },
  summaryTab: {
    width: '100%',
    backgroundColor: '#71b85f',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  summaryDetails: {
    width: '100%',
    borderColor: 'rgba(113,184,95,0.5)',
    borderWidth: 1,
    borderRadius: 5,
    paddingBottom: 15,
    paddingTop: 12,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
  },
  head: {
    width: '70%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  price: {
    width: '30%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'right'
},
bdrBtm: {
    borderBottomColor: 'rgba(113,184,95,0.3)',
    borderBottomWidth: 1,
},
milePayText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
},
marBtm20: {
    marginBottom: 20,
}
};
