import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';

import axios from 'axios';
import {API_URL} from '../../../config/url';

import {connect} from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';
import base64 from 'base-64';

class TransactionScreen extends Component {
  constructor() {
    super();
    this.state = {
      historydata: [],
      amountData: [],
      redeemAmount: '',
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    this.setState({
      showLoader: true,
    });
    const {userDeatailResponse} = this.props;
    let body = new FormData();
    body.append('user_id', base64.decode(userDeatailResponse.userData.user_id));
    await axios({
      url: API_URL + 'transaction_history',
      method: 'POST',
      data: body,
    })
      .then((res) => {
        this.setState({
          historydata: res.data,
        });
      })
      .catch((error) => {});

    let taglist = new FormData();
    taglist.append(
      'user_id',
      base64.decode(userDeatailResponse.userData.user_id),
    );

    await axios({
      url: API_URL + 'freelancer_transaction',
      method: 'POST',
      data: taglist,
    }).then((res) => {
      this.setState({
        amountData: res.data,
        redeemAmount: res.data[0].earned_amount,
        showLoader: false,
      });
    });
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <StatusBar />
          {/* header section */}
          <View style={CommonStyles.header}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NotificationScreen')
              }
              style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              {this.state.amountData.map((data, i) => (
                <>
                  <View style={styles.walletDetails}>
                    <Text style={styles.head}>
                      Escrowed Amount :{' '}
                      <Text style={styles.headGreen}>
                        {data.escrowed_amount} USD
                      </Text>
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.head}>
                        Wallet Amount :{' '}
                        <Text style={styles.headGreen}>
                          {data.earned_amount} USD
                        </Text>
                      </Text>
                      <TouchableOpacity style={styles.redeemBtn}>
                        <Text style={styles.redeemBtnText}>Redeem</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.head}>
                      Transferred Amount :{' '}
                      <Text style={styles.headGreen}>
                        {data.transferred_amount} USD
                      </Text>
                    </Text>
                    <Text style={styles.head}>
                      In Progress :{' '}
                      <Text style={styles.headGreen}>
                        {data.Inprogress_amount} USD
                      </Text>
                    </Text>
                  </View>
                </>
              ))}
              {this.state.historydata.map((data, i) => (
                <View style={styles.detailsSec}>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Date</Text>
                    <Text style={styles.deatailsInfo}>{data.payment_date}</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Employer Name</Text>
                    <Text style={styles.deatailsInfo}>{data.name}</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Project</Text>
                    <Text style={styles.deatailsInfo}>{data.project_name}</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Amount</Text>
                    <Text style={styles.deatailsInfo}>${data.amount}</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Status</Text>
                    <Text style={styles.deatailsInfo}>{data.status}</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Ref. ID</Text>
                    <Text style={styles.deatailsInfo}>{data.milestone_id}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// export default TransactionScreen;

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    //storeAccessToken: (token) => dispatch(storeAccessToken(token)),
    //updateUserStatus: (status) => dispatch(updateUserStatus(status)),
    updateJobId: (data) => dispatch(updateJobId(data)),
    //updateUserPaymentMethod: (data) => dispatch(updateUserPaymentMethod(data)),
  };
};

export default connect(mapStateToProps, mapDispatch)(TransactionScreen);
