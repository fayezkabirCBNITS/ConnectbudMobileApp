import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import StatusBar from '../../../components/StatusBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header} from 'react-navigation-stack';

import axios from 'axios';

import {API_URL} from '../../../config/url';
import Spinner from 'react-native-loading-spinner-overlay';

class OtpVerification extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params
      ? this.props.navigation.state.params.user_id
      : '',
      otp: '',
      errors: {},
    };
  }

  validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.otp) {
      formIsValid = false;
      errors['otp'] = '*Please enter your OTP';
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  handelOtp = async (e) => {
    this.setState({
      otp: e,
    });
    this.validateForm();
  };

  forgotPW = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      this.setState({
        showLoader: true,
      });
      this.verifyOtp();
    }
  };

  verifyOtp = async () => {
    let body = new FormData();
    body.append('entered_otp', this.state.otp);
    body.append('userID', this.state.userId);


    await axios({
      url: API_URL + 'verify_otp',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        this.setState({
          showLoader: false,
        });
        alert('Successfully verify otp');
        // this.props.navigation.navigate('OtpVerification', {
        //   user_id: response.dsata[0].user_id,
        // });
        this.props.navigation.navigate('ResetPassword',{
          user_id : this.state.userId
        })
      })
      .catch((error) => {
        alert('Something went wrong!');
        this.setState({isLoading: false, showLoader: false});
        // swal('Facebook-Id already exists');
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
          <View style={styles.back}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.goBack()}>
              <AntDesign name="arrowleft" color="#000" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}
          <View style={CommonStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <KeyboardAvoidingView
                keyboardVerticalOffset={Header.HEIGHT + 90}
                style={{flex: 1}}
                behavior="padding">
                <Text style={styles.hdngText}>Otp Verification</Text>
                <View style={styles.inputField}>
                  <Text style={styles.label}>Verification</Text>
                  <TextInput
                    placeholder="Enter Verification Code"
                    style={styles.input}
                    keyboardType="number-pad"
                    onChangeText={(e) => this.handelOtp(e)}
                  />
                    <Text style={styles.errorText}>
                    {this.state.errors.otp}
                  </Text>
                </View>

                <TouchableOpacity style={styles.btn} onPress={this.forgotPW}>
                  <Text style={styles.btnText}>Verify</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default OtpVerification;
