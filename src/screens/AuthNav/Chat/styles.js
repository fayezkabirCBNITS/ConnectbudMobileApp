const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  searchInput: {
    padding: 0,
    paddingLeft: 50,
    paddingRight: 15,
    alignItems: 'center',
    height: 50,
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  searchBar: {
    width: '100%',
    height: 50,
    marginVertical: 10,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  searchIcon: {
    width: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    paddingLeft: 5,
  },
  tabSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tab: {
    width: '48%',
    height: 50,
    marginVertical: 10,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#71B85F',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabSlct: {
    width: '48%',
    height: 50,
    marginVertical: 10,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#377D25',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#fff'
  },
  chatCard: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  imgSec: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    borderColor: '#71b85f',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatImage: {
    width: 55,
    height: 55,
    resizeMode: 'cover',
    borderRadius: 55 / 2,
  },
  details: {
    width: '50%',
    height: 65,
    justifyContent: 'center',
    paddingVertical: 5,
  },
  count: {
    width: 80,
    height: 65,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 3,
  },
  chatTime: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'right'
  },
  unread: {
    width: 15,
    minHeight: 15,
    borderRadius: 15 / 2,
    paddingTop: 2,
    backgroundColor: '#71b85f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 'auto',
    lineHeight: 18,
  },
  userChat: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginTop: 'auto',
  },
  userChat2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    paddingBottom: 70,
    color: '#71b85f'
  },
  online: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: '#71b85f',
    position: 'absolute',
    bottom: 5,
    right: 0,
    zIndex: 999,
  },
  modalImg: {
    width: 150,
    height: 98,
  },
  noChat: {
    width: '100%',
    height: deviceHeight - 160,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
