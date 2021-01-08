import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';

import Spinner from 'react-native-loading-spinner-overlay';


import base64 from 'base-64';



// import StripeCheckout from 'react-stripe-checkout';

import axios from 'axios';
import {API_URL} from '../../../config/url';

import {connect} from 'react-redux';


class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milestone_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.mile_id
        : '',
      userId: this.props.navigation.state.params
        ? this.props.navigation.state.params.user_id
        : '',
      recId: this.props.navigation.state.params
        ? this.props.navigation.state.params.rec_id
        : '',
      pageStatus: this.props.navigation.state.params
        ? this.props.navigation.state.params.page_status
        : '',
      jobId: this.props.navigation.state.params
        ? this.props.navigation.state.params.job_id
        : '',
      MilestoneAmount: '',
      ServiceFee: '',
      TotalPayable: '',

      card: '',
      month: '',
      year: '',
      cvc: '',
      id: '',
      paymentId: '',
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
    if (this.state.pageStatus === 'tutor') {
      console.log("called if");
      let body = new FormData();
      body.append('milestone_id', '');
      body.append('job_id', this.state.jobId);


      await axios({
        url: API_URL + 'checkout',
        method: 'POST',
        data: body,
      })
        .then((response) => {
          this.setState({
            MilestoneAmount: response.data[0].amount_negotiated,
            ServiceFee: response.data[0].connectbud_fees,
            TotalPayable: response.data[0].total_amount,
            showLoader: false,
          });
        })
        .catch((error) => {
          this.setState({
            showLoader: false,
          });
        });
    } 
    else if (this.state.pageStatus === 'tutorlanding') {
      console.log("called if");
      let body = new FormData();
      body.append('milestone_id', '');
      body.append('job_id', this.state.jobId);


      await axios({
        url: API_URL + 'checkout',
        method: 'POST',
        data: body,
      })
        .then((response) => {
          this.setState({
            MilestoneAmount: response.data[0].amount_negotiated,
            ServiceFee: response.data[0].connectbud_fees,
            TotalPayable: response.data[0].total_amount,
            showLoader: false,
          });
        })
        .catch((error) => {
          this.setState({
            showLoader: false,
          });
        });
    }
    else {
      console.log("called if");

      let body = new FormData();
      body.append('milestone_id', this.state.milestone_id);
      body.append('job_id', '');

      await axios({
        url: API_URL + 'checkout',
        method: 'POST',
        data: body,
      })
        .then((response) => {
          this.setState({
            MilestoneAmount: response.data[0].amount_negotiated,
            ServiceFee: response.data[0].connectbud_fees,
            TotalPayable: response.data[0].total_amount,
            showLoader: false,
          });
        })
        .catch((error) => {
          this.setState({
            showLoader: false,
          });
        });
    }
  };

  payment = async () => {
    this.setState({
      showLoader: true,
    });
    // this.props.navigation.navigate('StripeScreen');
    let body1 = new FormData();

    body1.append('number', this.state.card);
    body1.append('exp_month', +this.state.month);
    body1.append('exp_year', +this.state.year);
    body1.append('cvc', this.state.cvc);
    await axios({
      url: API_URL + 'createPayment',
      method: 'POST',
      data: body1,
    })
      .then(async (response) => {
        await this.setState({
          paymentId: response.data[0].payment.id,
          card: '',
          month: '',
          year: '',
          cvc: ''
        });
      })
      .catch((error) => {
      });

    if (this.state.pageStatus === 'tutor') {
      let body = new FormData();
      body.append('milestone_id', null);
      body.append('job_id', this.state.jobId.toString());
      body.append('hirer_id', this.state.userId);
      body.append('freelancer_id', '');
      body.append('name', this.state.name);
      body.append('type', 'tutor');
      body.append('id', this.state.paymentId);
      console.log(body);
      await axios({
        url: API_URL + 'paymentIntend',
        method: 'POST',
        data: body,
      })
        .then((response) => {
          console.log(response);
          this.props.navigation.navigate('PostedProjectByEmployee'),
            alert(
              'You have successfully escrowed money!Connectbud will get back to you between 6 to 12Hrs.',
            );
          this.setState({
            showLoader: false,
          });
        })
        .catch((error) => {
        });
    } 
    else if (this.state.pageStatus === 'tutorlanding') {
    const {userDeatailResponse} = this.props;
      console.log("called else if");
      let body = new FormData();
      body.append('milestone_id', null);
      body.append('job_id', this.state.jobId.toString());
      body.append('hirer_id', base64.decode(userDeatailResponse.userData.user_id));
      body.append('freelancer_id', '');
      body.append('name', this.state.name);
      body.append('type', 'tutor');
      body.append('id', this.state.paymentId);
      console.log(body);
      await axios({
        url: API_URL + 'paymentIntend',
        method: 'POST',
        data: body,
      })
        .then((response) => {
          console.log(response);
          this.props.navigation.navigate('PostedProjectByEmployee'),
            alert(
              'You have successfully escrowed money!Connectbud will get back to you between 6 to 12Hrs.',
            );
          this.setState({
            showLoader: false,
          });
        })
        .catch((error) => {
        });
    }
    else {
      let body = new FormData();
      body.append('milestone_id', this.state.milestone_id);
      body.append('job_id', '');
      body.append('hirer_id', this.state.recId);
      body.append('freelancer_id', this.state.userId);
      body.append('name', this.state.name);
      body.append('type', 'normal');
      body.append('id', this.state.paymentId);
      await axios({
        url: API_URL + 'paymentIntend',
        method: 'POST',
        data: body,
      })
        .then((response) => {
          this.props.navigation.navigate('EmpContactScreen'),
            alert('You have complete the payment');
          this.setState({
            showLoader: false,
          });
        })
        .catch((error) => {});
    }
  };

  handelCard = async (e) => {
    this.setState({
      card: e,
    });
  };

  handelName = async (e) => {
    this.setState({
      name: e,
    });
  };

  handelMonth = async (e) => {
    this.setState({
      month: e.slice(0, 2),
      year: e.slice(2),
    });
  };

  handelcvc = async (e) => {
    this.setState({
      cvc: e,
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
          {/* <StripeCheckout
            stripeKey={"pk_test_51H4fp1DF4keH90wMXKJ3v78er6fKRKbg9GxfhQjapLXs60s3G9cIprYpv3DEUlE0uTXzERUULxTrjEk3eaXLkVW500sO1qLB4I"}
            token={this.payment}
          /> */}
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
            <TouchableOpacity style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              <View>
                <Text style={styles.checkOut}>Checkout</Text>
                <View style={styles.field}>
                  <View style={styles.icon}>
                    <FontAwesome name="dollar" size={30} color="#fff" />
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.label}>Milestone Amount</Text>
                    <Text style={styles.price}>
                      {this.state.MilestoneAmount}
                    </Text>
                  </View>
                </View>
                <View style={styles.field}>
                  <View style={styles.icon}>
                    <FontAwesome5
                      name="money-bill-wave"
                      size={30}
                      color="#fff"
                    />
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.label}>ConnectBud Service Fee</Text>
                    <Text style={styles.price}>{this.state.ServiceFee}</Text>
                  </View>
                </View>
                <View style={styles.field}>
                  <View style={styles.icon}>
                    <FontAwesome name="money" size={30} color="#fff" />
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.label}>Total Payable Amount</Text>
                    <Text style={styles.price}>{this.state.TotalPayable}</Text>
                  </View>
                </View>
              </View>

              {/* without CVV section */}
              {/* <View>
                <View style={styles.nameField}>
                  <TextInput
                    placeholder="Name"
                    style={styles.name}
                    onChangeText={(e) => this.handelName(e)}
                  />
                </View>
                <View style={styles.cardField}>
                  <TextInput
                    placeholder="Card Number"
                    keyboardType="numeric"
                    style={styles.cardNumber}
                    onChangeText={(e) => this.handelCard(e)}
                  />
                  <TextInput
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    style={styles.month}
                    onChangeText={(e) => this.handelMonth(e)}
                  />
                </View>
                <View style={styles.cardField}>
                  <TextInput
                    placeholder="CVC"
                    keyboardType="numeric"
                    style={styles.cvc}
                    onChangeText={(e) => this.handelcvc(e)}
                  />
                </View>
                <TouchableOpacity style={styles.payBtn}>
                  <Text style={styles.payBtnText} onPress={this.payment}>
                    Pay
                  </Text>
                </TouchableOpacity>
              </View> */}
              {/* without CVV section end */}

              {/* with CVV section */}
              <View>
                <View style={styles.nameField}>
                  <TextInput
                    placeholder="Name"
                    style={styles.name}
                    onChangeText={(e) => this.handelName(e)}
                  />
                </View>
                <TextInput
                  placeholder="Card Number"
                  keyboardType="numeric"
                  style={styles.cardNumber2}
                  onChangeText={(e) => this.handelCard(e)}
                  maxLength={16}
                />
                <View style={styles.cardField}>
                  <TextInput
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    style={styles.monthCvv}
                    onChangeText={(e) => this.handelMonth(e)}
                  />
                  <TextInput
                    placeholder="CVV"
                    keyboardType="numeric"
                    onChangeText={(e) => this.handelcvc(e)}
                    style={styles.monthCvv}
                  />
                </View>
                <TouchableOpacity style={styles.payBtn}>
                  <Text style={styles.payBtnText} onPress={this.payment}>
                    Pay
                  </Text>
                </TouchableOpacity>
              </View>
              {/* with CVV section end */}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// export default CheckoutScreen;

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
  };
};


export default connect(mapStateToProps, null)(CheckoutScreen);
