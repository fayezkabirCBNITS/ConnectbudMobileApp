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
      user_id: '',
      Status: '',
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    const {userDeatailResponse} = this.props;
    this.setState({
      showLoader: true,
      user_id: base64.decode(userDeatailResponse.userData.user_id),
    });
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
          Status: res.data[0].message,
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

  alert = () => {
    alert('Minimum 1 USD require for withdrawal');
  };

  redeemMoney = async () => {
    this.setState({
      showLoader: true,
    });
    let taglistbody = new FormData();

    taglistbody.append('user_id', this.state.user_id);
    taglistbody.append('method', 'get');

    await axios({
      url: API_URL + 'info',
      method: 'POST',
      data: taglistbody,
    }).then((response) => {
      if (response.data[0].message !== 'No data found') {
        this.setState({
          route: response.data[0].routing,
          first_name: response.data[0].name,
          country: response.data[0].country,
          type: response.data[0].type,
          accNum: response.data[0].account,
          btnStatus: true,
          showLoader: false,
        });
        //post method START
        // this.props.navigation.navigate('BankDetailScreen');
        this.bankDetails();
      } else {
        alert('Please fill your bank details!');
        this.setState({
          showLoader: false,
        });
        this.props.navigation.navigate('BankDetailScreen');
      }
      // end
    });
  };

  bankDetails = async () => {
    let body = new FormData();

    body.append('user_id', this.state.user_id);
    body.append('country', this.state.country);
    body.append('name', this.state.first_name);
    body.append('type', this.state.type);
    body.append('amount', this.state.redeemAmount);
    body.append('method', 'post');
    body.append('routing', this.state.route);
    body.append('account', this.state.accNum);

    await axios({
      url: API_URL + 'info',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        if (response.data[0].message !== 'Insufficiant Balance') {
          alert('You have successfully sent request for transfering the money');
          this.props.navigation.navigate('StudentInner');
          this.setState({
            showLoader: false,
          });
        } else {
          alert('Insufficiant Balance, please enter the correct amount');
          this.props.navigation.navigate('StudentInner');
          this.setState({
            showLoader: false,
          });
        }
        this.getHistoryData();
        this.setState({isLoading: false});
      })
      .catch((error) => {
        this.setState({isLoading: false});
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
              <Entypo name="menu" color="#000" size={35} />
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
              <Feather name="bell" color="#000" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              {this.state.Status !== 'No data found' ? (
                this.state.amountData.map((data, i) => (
                  <>
                    <View style={styles.walletDetails}>
                      <Text style={styles.head}>
                        Escrowed Amount :{' '}
                        <Text style={styles.headGreen}>
                          {data.escrowed_amount} USD
                        </Text>
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.head}>
                          Wallet Amount :{' '}
                          <Text style={styles.headGreen}>
                            {data.earned_amount} USD
                          </Text>
                        </Text>
                        {data.earned_amount < 1 ? (
                          <TouchableOpacity
                            style={styles.redeemBtn}
                            onPress={() => this.alert()}>
                            <Text style={styles.redeemBtnText}>Redeem</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={styles.redeemBtn}
                            onPress={this.redeemMoney}>
                            <Text style={styles.redeemBtnText}>Redeem</Text>
                          </TouchableOpacity>
                        )}
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
                ))
              ) : (
                <></>
              )}
              {this.state.Status !== 'No data found' ? (
                this.state.historydata.map((data, i) => (
                  <View style={styles.detailsSec}>
                    <View style={styles.detailsField}>
                      <Text style={styles.deatailsHdng}>Date</Text>
                      <Text style={styles.deatailsInfo}>
                        {data.payment_date}
                      </Text>
                    </View>
                    <View style={styles.detailsField}>
                      <Text style={styles.deatailsHdng}>Employer Name</Text>
                      <Text style={styles.deatailsInfo}>{data.name}</Text>
                    </View>
                    <View style={styles.detailsField}>
                      <Text style={styles.deatailsHdng}>Project</Text>
                      <Text style={styles.deatailsInfo}>
                        {data.project_name}
                      </Text>
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
                      <Text style={styles.deatailsInfo}>
                        {data.milestone_id}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.noData}>
                  <Text style={styles.noDataText}>
                    No data found
                  </Text>
                </View>
              )}
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
