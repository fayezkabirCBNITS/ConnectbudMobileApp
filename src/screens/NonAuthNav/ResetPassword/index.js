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

class ResetPassword extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params
      ? this.props.navigation.state.params.user_id
      : '',
      repassword: '',
      password: '',
      errors: '',
      showLoader: false
    };
  }

  handelPassword = async(e) => {
    await this.setState({
      password: e,
    });
    this.validateForm();
  };

  handelRePassword = async(e) => {
    await this.setState({
      repassword: e,
    });
    this.validateForm();
  };

  validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.password) {
      formIsValid = false;
      errors['password'] = '*Please enter your password';
    }

    if (this.state.password.length < 8) {
      formIsValid = false;
      errors['password'] = '*Please enter minimum 8 characters';
    }

    if (!this.state.repassword) {
      formIsValid = false;
      errors['repassword'] = '*Please enter your password';
    }

    if (this.state.repassword.length < 8) {
      formIsValid = false;
      errors['repassword'] = '*Please enter minimum 8 characters';
    }

    if(this.state.password !== this.state.repassword) {
      formIsValid = false;
      errors['repassword'] = '*Password does not match';
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  };


  forgotPW = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      this.setState({
        showLoader: true,
      });
      this.setPass();
    }
  };

  setPass = async () => {
    console.log('called');
    let body = new FormData();
    body.append('new_password', this.state.password);
    body.append('confirmpassword', this.state.repassword);
    body.append('user_id', this.state.userId.toString());

    console.log(body);

    await axios({
      url: API_URL + 'auth/resetpassword',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        console.log(response, 'ss');
        this.setState({
          showLoader: false,
        });
        alert('Your Password Successfully Changed');
        this.props.navigation.navigate('SignInScreen');
      })
      .catch((error) => {
        console.log(error);
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
                <Text style={styles.hdngText}>Reset Password</Text>
                <View style={[styles.inputField, styles.marTop]}>
                  <Text style={styles.label}>New Password</Text>
                  <TextInput
                    placeholder="Enter New Password"
                    style={styles.input}
                    onChangeText={(e) => this.handelPassword(e)}
                  />
                  <Text style={styles.errorText}>
                    {this.state.errors.password}
                  </Text>
                </View>
                <View style={[styles.inputField, styles.marBtm]}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    placeholder="Enter Confirm Password"
                    style={styles.input}
                    onChangeText={(e) => this.handelRePassword(e)}
                  />
                  <Text style={styles.errorText}>
                    {this.state.errors.repassword}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={this.forgotPW}>
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default ResetPassword;
