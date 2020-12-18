const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  portfolioHead: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 12,
    color: '#71b85f',
  },
  addPortfolio: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 12,
    color: '#71b85f',
  },
  portHeading: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  portHeading2: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  portSecName: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  portSecNameText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  portImgSec: {
    width: 280,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  portDetails: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  portDetailsHead: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  portDetailsSlo: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  portfolioSec: {
    width: 280,
    marginLeft: 15,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 10,
  },
  portDocSec: {
    width: 280,
    marginLeft: 15,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 10,
  },
  portDocImgSec: {
    width: 280,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
};
