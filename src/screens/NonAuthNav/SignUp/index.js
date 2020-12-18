import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import axios from 'axios';
import { API_URL } from "../../../config/url";
import CommonStatusBar from '../../../components/StatusBar';

class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      number: '',
      isSent: false,
      errors: {},
      type: true,
    };
    this.showHide = this.showHide.bind(this);
  }

  static navigationOptions = {
    headerShown: false,
  };

  showHide() {
    this.setState({
      type: this.state.type === false ? true : false,
    });
  }

  onSentOtp = () => {
    this.setState({ isSent: true });
  };

  handleInputFirstName = async (e) => {
    await this.setState({
      firstname: e,
    });
    this.validateForm();
  };

  handleInputLastName = async (e) => {
    await this.setState({
      lastname: e,
    });
    this.validateForm();
  };

  handleInputEmail = async (e) => {
    await this.setState({
      email: e,
    });
    this.validateForm();
  };

  handleInputPassword = async (e) => {
    await this.setState({
      password: e,
    });
    this.validateForm();
  };

  validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.firstname) {
      formIsValid = false;
      errors['firstname'] = '*Please enter your first name.';
    }

    if (typeof this.state.firstname !== 'undefined') {
      if (!this.state.firstname.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors['firstname'] = '*Please enter alphabet characters only.';
      }
    }

    if (!this.state.lastname) {
      formIsValid = false;
      errors['lastname'] = '*Please enter your last name.';
    }

    if (typeof this.state.lastname !== 'undefined') {
      if (!this.state.lastname.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors['lastname'] = '*Please enter alphabet characters only.';
      }
    }

    if (!this.state.email) {
      formIsValid = false;
      errors['email'] = '*Please enter your email address.';
    }

    if (typeof this.state.email !== 'undefined') {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );
      if (!pattern.test(this.state.email)) {
        formIsValid = false;
        errors['email'] = '*Please enter valid email address.';
      }
    }
    if (!this.state.password) {
      formIsValid = false;
      errors['password'] = '*Please enter your password.';
    }

    if (typeof this.state.password !== 'undefined') {
      if (
        !this.state.password.match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/,
        )
      ) {
        formIsValid = false;
        errors['password'] =
          '*Please enter minimum one upper case, one special symbol, one number & one lower case.';
      }
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  handleSubmit = () => {
    // if (!this.state.isVerified) {
    //   alert('Please verify that you are a human!');
    //   return false;
    // }

    let body = new FormData();
    body.append('username', this.state.email);
    body.append('password', this.state.password);
    body.append('email', this.state.email);
    body.append('first_name', this.state.firstname);
    body.append('last_name', this.state.lastname);
    axios
      .post(API_URL + "auth/register_recruiter", body)
      .then((res) => {
        alert('Please verify your email & login');

        // this.setState({
        //   userId: res.data.id
        // });

        // localStorage.setItem('user_id', res.data.user_id.toString());
        // localStorage.setItem('first_name', res.data.first_name);
        // localStorage.setItem('last_name', res.data.last_name);
        this.props.navigation.navigate('SignInScreen');
      })
      .catch((error) => { });
  };

  submituserRegistrationForm = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      this.handleSubmit();
    }
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={styles.main}>
          <CommonStatusBar />
          <ImageBackground
            style={{ width: '100%', height: '100%' }}
            source={require('../../../assets/images/authBg.jpg')}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={[styles.container, styles.inputDiv]}>
                <View style={styles.logo}>
                  <Image
                    source={require('../../../assets/images/logoWhite.png')}
                    style={CommonStyles.splashImg}
                  />
                </View>
                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter your first name"
                      style={styles.inputGroup}
                      keyboardType="default"
                      placeholderTextColor={'#fff'}
                      value={this.state.firstname}
                      onChange={this.handleInputName}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <AntDesign name="user" size={20} color="#fff" />
                  </View>
                </View>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter your last name"
                      style={styles.inputGroup}
                      keyboardType="default"
                      placeholderTextColor={'#fff'}
                      value={this.state.lastname}
                      onChange={this.handleInputName}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <AntDesign name="user" size={20} color="#fff" />
                  </View>
                </View>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2Num}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="+ 91"
                      style={styles.inputGroup}
                      placeholderTextColor={'#fff'}
                      keyboardType="number-pad"
                      value={this.state.number}
                      onChange={this.handleInputName}
                    />
                  </View>
                  <View style={styles.formSubGroupNum}>
                    <Pressable
                      style={{ backgroundColor: '#595555', borderRadius: 40 }}>
                      <Text
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 5, fontSize: 12,
                          fontFamily: 'Poppins-Regular',
                          color: '#fff',
                        }}
                        onPress={this.onSentOtp}>
                        Send Otp
                      </Text>
                    </Pressable>
                  </View>
                </View>

                {this.state.isSent && (
                  <View style={styles.formGroup1}>
                    <View style={styles.formSubGroup2Num}>
                      <TextInput
                        returnKeyType="done"
                        placeholder="Enter OTP"
                        style={styles.inputGroup}
                        placeholderTextColor={'#fff'}
                        keyboardType="default"
                        secureTextEntry
                      />
                    </View>
                    <View style={styles.formSubGroupNum}>
                      <Pressable
                        style={{ backgroundColor: '#595555', borderRadius: 40 }}>
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            color: '#fff',
                          }}
                        // onPress={()=>this.onSentOtp()}
                        >
                          Verify
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )}

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Type Password"
                      style={styles.inputGroup}
                      keyboardType="default"
                      secureTextEntry={this.state.type}
                      placeholderTextColor={'#fff'}
                      value={this.state.password}
                      onChangeText={this.handleInputPassword}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    {this.state.type === false ? (
                      <FontAwesome name="eye-slash" size={20} color="#fff" onPress={this.showHide} />
                    ) : (
                        <FontAwesome name="eye" size={20} color="#fff" onPress={this.showHide} />
                      )}
                  </View>
                </View>
                <Text
                  style={styles.errorText}>
                  {this.state.errors.password}
                </Text>

                <Pressable
                  style={styles.signinBtn}
                  onPress={this.submituserRegistrationForm}>
                  <Text style={styles.signinText}>Sign Up</Text>
                </Pressable>

                <Text style={styles.signupAcnt}>
                  Already have an account?{' '}
                  <Text
                    style={styles.signupText}
                    onPress={() =>
                      this.props.navigation.navigate('FreelancerSignUpScreen')
                    }>
                    Please Sign In
                  </Text>
                </Text>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

export default SignUpScreen;
