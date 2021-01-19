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

class ForgotPassword extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor() {
    super();
    this.state = {
      email: '',
      errors: '',
      showLoader: false,
      ID: ''
    };
  }

  validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.email) {
      formIsValid = false;
      errors['email'] = '*Please enter your email address';
    }
    // if (typeof this.state.email !== 'undefined') {
    //   var pattern = new RegExp(
    //     /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    //   );
    //   if (!pattern.test(this.state.email)) {
    //     formIsValid = false;
    //     errors['email'] = '*Please enter your valid email address';
    //   }
    // }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  handelEmail = async (e) => {
    this.setState({
      email: e,
    });
    this.validateForm();
  };

  forgotPW = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      this.setState({
        showLoader: true,
      });
      this.getOtp();
    }
  };

  getOtp = async () => {
    let body = new FormData();
    body.append('email', this.state.email);
    body.append('type', 'mobile');

    await axios({
      url: API_URL + 'auth/password_mail',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        this.setState({
          showLoader: false,
          ID: response.data[0].userID
        });
        alert('Please check your mail for OTP');
        this.props.navigation.navigate('OtpVerification',{
          user_id : this.state.ID
        });
      })
      .catch((error) => {
        alert('Invalid email address!');
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
                <Text style={styles.hdngText}>Forgot Password</Text>
                <View style={styles.inputField}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    placeholder="Enter Your Email"
                    style={styles.input}
                    onChangeText={(e) => this.handelEmail(e)}
                  />
                  <Text style={styles.errorText}>
                    {this.state.errors.email}
                  </Text>
                </View>

                <TouchableOpacity style={styles.btn} onPress={this.forgotPW}>
                  <Text style={styles.btnText}>Send</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default ForgotPassword;
