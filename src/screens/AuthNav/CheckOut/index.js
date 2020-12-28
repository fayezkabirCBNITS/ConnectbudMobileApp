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
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';

// import StripeCheckout from 'react-stripe-checkout';

import axios from 'axios';
import {API_URL} from '../../../config/url';

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
      MilestoneAmount: '',
      ServiceFee: '',
      TotalPayable: '',

      card:'',
      month: '',
      year: '',
      cvc: '',
      id: '',
      paymentId: '',
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    console.log(this.state.milestone_id);
    let body = new FormData();
    body.append('milestone_id', this.state.milestone_id);
    body.append('job_id', '');

    await axios({
      url: API_URL + 'checkout',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          MilestoneAmount: response.data[0].amount_negotiated,
          ServiceFee: response.data[0].connectbud_fees,
          TotalPayable: response.data[0].total_amount,
        });
      })
      .catch((error) => {});
  };

  payment = async () => {
    console.log('called ................');
    // this.props.navigation.navigate('StripeScreen');
    let body = new FormData();
    let body1 = new FormData();

    body1.append('number', this.state.card);
    body1.append('exp_month', +this.state.month);
    body1.append('exp_year', +this.state.year);
    body1.append('cvc', this.state.cvc);
    console.log(body1);
    await axios({
      url: API_URL + 'createPayment',
      method: 'POST',
      data: body1,
    })
    .then(async(response) => {
      console.log(response);
      await this.setState({
        paymentId: response.data[0].payment.id
      });
    })
    .catch((error) => {
      console.log(error);
    });


    body.append('milestone_id', this.state.milestone_id);
    body.append('job_id', '');
    body.append('hirer_id', this.state.recId);
    body.append('freelancer_id', this.state.userId);
    body.append('name', this.state.name);
    body.append('type', 'normal');
    body.append('id', this.state.paymentId);
    console.log(body);
    await axios({
      url: API_URL + 'paymentIntend',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        console.log(response);
        alert("success")
      })
      .catch((error) => {});

  };

  handelCard = async(e) => {
    this.setState({
      card: e,
    })
  }

  handelName = async(e) => {
    this.setState({
      name: e,
    })
  }

  handelMonth = async(e) => {
    // console.log(e);
    console.log(e.slice(0,2));    //MM
    console.log(e.slice(2));      //YY
    this.setState({
      month: e.slice(0,2),
      year: (e.slice(2))
    })

  }

  handelcvc = async(e) => {
    console.log(e);
    this.setState({
      cvc: e,
    })
  }

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
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
              <View>
                <View style={styles.nameField}>
                  <TextInput placeholder="Name" style={styles.name} onChangeText={(e) => this.handelName(e)}/>
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
                    onChangeText={(e)=> this.handelMonth(e)}
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
              </View>
              {/* without CVV section end */}

              {/* with CVV section */}
              {/* <View>
                <View style={styles.nameField}>
                  <TextInput placeholder="Name" style={styles.name} />
                </View>
                <TextInput
                  placeholder="Card Number"
                  keyboardType="numeric"
                  style={styles.cardNumber2}
                />
                <View style={styles.cardField}>
                  <TextInput
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    style={styles.monthCvv}
                  />
                  <TextInput
                    placeholder="CVV"
                    keyboardType="numeric"

                    style={styles.monthCvv}
                  />
                </View>
                <TouchableOpacity style={styles.payBtn}>
                  <Text style={styles.payBtnText}>Pay</Text>
                </TouchableOpacity>
              </View> */}
              {/* with CVV section end */}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default CheckoutScreen;
