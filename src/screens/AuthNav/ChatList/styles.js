const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  header: {
    flexDirection: 'row',
    paddingHorizontal: '4%',
    height: 60,
    alignItems: 'center',
    // borderBottomColor: '#71b85f',
    // borderBottomWidth: 1,
    backgroundColor: '#71b85f',
  },
  headerImgSec: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overflow: 'hidden',
    marginLeft: 10,
  },
  chatUserName: {
    width: '65%',
    marginLeft: 15,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  send: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 15,
    justifyContent: 'flex-end',
  },
  sndChat: {
    maxWidth: '75%',
    minWidth: 90,
    backgroundColor: '#E9F9E4',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    borderBottomRightRadius: 0,
  },
  sndChatText: {
    color: '#000',
    fontFamily: 'PlutoSansRegular',
    fontSize: 15,
  },
  sndDate: {
    color: 'rgba(0,0,0,0.5)',
    fontFamily: 'PlutoSansRegular',
    fontSize: 10,
    position: 'absolute',
    left: 0,
    bottom: -15,
  },
  receive: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 15,
  },
  revChat: {
    maxWidth: '75%',
    minWidth: 90,
    backgroundColor: '#F7F7F7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    borderBottomLeftRadius: 0,
  },
  revChatText: {
    color: '#000',
    fontFamily: 'PlutoSansRegular',
    fontSize: 15,
  },
  revDate: {
    color: 'rgba(0,0,0,0.5)',
    fontFamily: 'PlutoSansRegular',
    fontSize: 10,
    position: 'absolute',
    right: 0,
    bottom: -15,
  },
  userImgR: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overflow: 'hidden',
    marginRight: 15,
  },
  chatInputSec: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
  },
  icon: {
    width: 45,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#71b85f',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 5,
  },
  inputHead: {
    width: '88%',
    height: 50,
    marginVertical: 10,
    borderColor: '#ff5959',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#ff5959'
  },
  input: {
    width: '100%',
    height: 45,
    padding: 0,
    paddingLeft: 15,
    paddingRight: 60,
    color: '#fff',
  },
  scroll: {
    width: '100%',
    marginBottom: 60,
  },
  editBtn: {
    width: 85,
    height: 30,
    backgroundColor: '#71b85f',
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  editBtnText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    marginTop: 3,
  },
};
