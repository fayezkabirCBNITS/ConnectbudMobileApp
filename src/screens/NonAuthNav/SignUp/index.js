import React, {Component} from 'react';
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
  Modal,
  Picker,
  TouchableOpacity,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import CommonStatusBar from '../../../components/StatusBar';
import Validator from '../../../config/Validator';
import ApiUrl from '../../../config/ApiUrl';
import {makePostRequestMultipart} from '../../../services/http-connectors';
import ErrorMsg from '../../../components/ErrorMsg';
import {countryCodes} from '../../../config/countrycodes';
import Toast from 'react-native-simple-toast';

import Spinner from 'react-native-loading-spinner-overlay';

class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      fields: {
        //user_name: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
      },
      number: '',
      errOTP: false,
      choosenIndex: 0,
      countryCode: '+91',
      isSent: false,
      errors: {},
      type: true,
      isModalVisible: false,
      userEmail: '',
      rowID: '',
      showLoader: false,
      // enableSignUp:true,
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

  handleChange(value, name) {
    let fields = this.state.fields;
    fields[name] = value;
    this.setState({fields});
    this.setState({
      errors: Validator.validateForm(
        name,
        this.state.fields,
        this.state.errors,
      ),
    });
  }
  handleOTP = async (e) => {
    await this.setState({
      number: e,
    });
    // this.validateJobForm();
  };
  onSentOtp = async () => {
    this.setState({isSent: !this.state.isSent});

    if (this.state.fields.phone.length < 10) {
      Toast.show('Enter valid phone number', Toast.LONG);
    }
    if (this.state.fields.email.length < 10) {
      Toast.show('Enter valid email address', Toast.LONG);
    } else {
      let body = new FormData();
      body.append('emailid', this.state.fields.email);
      body.append(
        'phone_number',
        this.state.countryCode + this.state.fields.phone,
      );
      let response = await makePostRequestMultipart(
        ApiUrl.SENDSMS,
        false,
        body,
      );
      console.log('handle employee send sms-----', response);
      if (response) {
        Toast.show(response[0]?.message, Toast.LONG);
        this.setState({rowID: response[0]?.rowid});
        // this.setState({isSent: !this.state.isSent});
        // this.setState({isModalVisible:true});
      }
    }
  };

  validateOtp = async () => {
    // this.setState({isSent: !this.state.isSent});
    if (this.state.enteredOTP.length > 2) {
      let body = new FormData();
      body.append('rowid', this.state.rowID);
      body.append('entered_otp', this.state.number);
      let response = await makePostRequestMultipart(
        ApiUrl.VALIDATE_OTP,
        false,
        body,
      );
      console.log('handle employee validate -----', response);
      if (response) {
        Toast.show(response[0]?.message, Toast.LONG);
        // this.setState({enableSignUp:false});
        // this.setState({isModalVisible:true});
      }
    } else {
      Toast.show('Enter valid OTP', Toast.LONG);
    }
  };

  submituserRegistrationForm = async () => {
    this.setState({
      showLoader: true,
      errors: Validator.validateForm(
        null,
        this.state.fields,
        this.state.errors,
      ),
    });

    if (this.state.errors.formIsValid) {
      console.log('calllllllllllllllllllllllllll');
      let body = new FormData();
      body.append('username', this.state.fields.email);
      body.append('password', this.state.fields.password);
      body.append('email', this.state.fields.email);
      body.append('first_name', this.state.fields.first_name);
      body.append('last_name', this.state.fields.last_name);
      body.append('registration_type', 'freelancer');
      body.append('company_name', '');

      let response = await makePostRequestMultipart(
        ApiUrl.EmployerSignUp,
        false,
        body,
      );
      console.log('handle employee Signup-----', response);
      if (response) {
        this.setState({userEmail: response?.email});
        this.setState({isModalVisible: true, showLoader: false});
        alert('A verification link sent to your email id');
        this.props.navigation.navigate('SignInScreen');
      }
    }
    else{
      this.setState({
        showLoader: false
      })
    }
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={styles.main}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <CommonStatusBar />
          <ImageBackground
            style={{width: '100%', height: '100%'}}
            source={require('../../../assets/images/authBg.jpg')}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}>
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
                      value={this.state.fields.first_name}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'first_name')
                      }
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <AntDesign name="user" size={20} color="#fff" />
                  </View>
                </View>
                <ErrorMsg errorMsg={this.state.errors['first_name']} />

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter your last name"
                      style={styles.inputGroup}
                      keyboardType="default"
                      placeholderTextColor={'#fff'}
                      value={this.state.fields.last_name}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'last_name')
                      }
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <AntDesign name="user" size={20} color="#fff" />
                  </View>
                </View>
                <ErrorMsg errorMsg={this.state.errors['last_name']} />

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter your email address"
                      style={styles.inputGroup}
                      keyboardType="default"
                      placeholderTextColor={'#fff'}
                      value={this.state.fields.email}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'email')
                      }
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="at" size={20} color="#fff" />
                  </View>
                </View>
                <ErrorMsg errorMsg={this.state.errors['email']} />

                {/* <View style={styles.formGroup1}>
                  <View
                    style={[styles.formSubGroup2Num, {flexDirection: 'row'}]}>
                    <Picker
                      style={{width: '40%', height: 45}}
                      selectedValue={this.state.countryCode}
                      onValueChange={(itemValue, itemPosition) =>
                        this.setState({
                          countryCode: itemValue,
                          choosenIndex: itemPosition,
                        })
                      }>
                      {countryCodes &&
                        countryCodes.map((data, index) => {
                          return (
                            <Picker.Item
                              key={data._id}
                              label={data.name + ' (' + data.dial_code + ')'}
                              value={data.dial_code}
                            />
                          );
                        })}
                    </Picker>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter Phone Number"
                      style={[styles.inputGroup, {width: '100%'}]}
                      placeholderTextColor={'#fff'}
                      keyboardType="number-pad"
                      maxLength={13}
                      value={this.state.fields.phone}
                      onChangeText={(text) => this.handleChange(text, 'phone')}
                    />
                  </View>
                  <View style={styles.formSubGroupNum}>
                    <Pressable
                      style={{backgroundColor: '#595555', borderRadius: 40}}>
                      <Text
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          fontSize: 12,
                          fontFamily: 'Poppins-Regular',
                          color: '#fff',
                        }}
                        onPress={this.onSentOtp}>
                        Send Otp
                      </Text>
                    </Pressable>
                  </View>
                </View> */}

                {/* <ErrorMsg errorMsg={this.state.errors['phone']} />
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
                        //value={this.state.number}
                        //onChange={this.handleInputLastName}
                        onChangeText={this.handleOTP}
                      />
                    </View>
                    <View style={styles.formSubGroupNum}>
                      <Pressable
                        style={{backgroundColor: '#595555', borderRadius: 40}}>
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            color: '#fff',
                          }}
                          onPress={() => this.validateOtp()}>
                          Verify
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )} */}

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter Password"
                      style={styles.inputGroup}
                      keyboardType="default"
                      secureTextEntry={this.state.type}
                      placeholderTextColor={'#fff'}
                      value={this.state.fields.password}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'password')
                      }
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    {this.state.type === false ? (
                      <FontAwesome
                        name="eye-slash"
                        size={20}
                        color="#fff"
                        onPress={this.showHide}
                      />
                    ) : (
                      <FontAwesome
                        name="eye"
                        size={20}
                        color="#fff"
                        onPress={this.showHide}
                      />
                    )}
                  </View>
                </View>
                <ErrorMsg errorMsg={this.state.errors['password']} />

                {/* <Text style={styles.errorText}>
                  {this.state.errors.password}
                </Text> */}
                {/* 
            <View style={styles.formGroup1}>
              <View style={styles.formSubGroup2}>
                <TextInput
                  returnKeyType="done"
                  placeholder="Type Password"
                  style={styles.inputGroup}
                  keyboardType="default"
                  secureTextEntry
                  value={this.state.password}
                  onChange={this.handleInputName}
                />
              </View>
              <View style={styles.formSubGroup1}>
                <AntDesign name="lock" size={20} color="#fff" />
              </View>
            </View> */}

                <Pressable
                  // disabled={this.state.enableSignUp}
                  style={[styles.signinBtn, {alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto'}]}
                  onPress={this.submituserRegistrationForm}>
                  <Text style={styles.signinText}>Sign Up</Text>
                </Pressable>

                <Text style={styles.signupAcnt}>
                  Already have an account?{' '}
                  <Text
                    style={styles.signupText}
                    onPress={() =>
                      this.props.navigation.navigate('SignInScreen', {
                        userType: 'employee',
                      })
                    }>
                    Please Sign In
                  </Text>
                </Text>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
        {/* {this.state.isModalVisible === true ? (
          <Modal transparent={true} isVisible={this.state.isModalVisible}>
            <View style={CommonStyles.modalBg}>
              <View style={CommonStyles.modalContent}>
                <Image
                  source={require('../../../assets/images/messageSend.png')}
                  style={CommonStyles.modalImg}
                />
                <Text style={CommonStyles.modalText}>
                  A verification link send to your email id
                </Text>
                <Text style={CommonStyles.modalEmail}>
                  {this.state.userEmail}
                </Text>

                <TouchableOpacity
                  style={CommonStyles.modalCross}
                  onPress={this.onDismissModel}>
                  <Entypo name="circle-with-cross" color="#71b85f" size={35} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : (
          <></>
        )} */}
      </SafeAreaView>
    );
  }
}

export default SignUpScreen;
