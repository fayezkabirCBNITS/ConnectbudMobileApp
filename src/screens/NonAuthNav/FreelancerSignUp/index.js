import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ImageBackground,
  Pressable,
  TextInput,
  Alert,
  BackHandler
} from 'react-native';
import styles from './style';
import CommonStyles from '../../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import CommonStatusBar from '../../../components/StatusBar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import {CheckBox } from 'react-native-elements';
import Validator from '../../../config/Validator';
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequestMultipart } from '../../../services/http-connectors';
import ErrorMsg from '../../../components/ErrorMsg';

import Spinner from 'react-native-loading-spinner-overlay';
import { openInbox } from 'react-native-email-link'


class FreelancerSignUpScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        //user_name: '',
        first_name: '',
        last_name: '',
        //email: '',
        phone: '',
        password: '',
        major: '',
        //enrollment: '',
      },
      email: '',
      college: '',
      courseType: '',
      ugChecked: false,
      pgChecked: false,
      errEmail: false,
      errCourseType: false,
      errCollege: false,
      showCollegeName: false,
      errors: {},
      isModalVisible: false,
      userEmail: '',
      type: true,
      //
      isSent: false,
      number: '',
      errOTP: false,
      choosenIndex: 0,
      countryCode: '+91',
      showLoader: false,
      //
    };
    this.showHide = this.showHide.bind(this);
  }

  _handleAppStateChange = (userEmail) => {
    Alert.alert(
      'A verification link sent to your email id ' + userEmail,
      'Please open your mail to verify', [{
        text: 'OPEN MAIL',
        onPress: () => this.closeApp()
      },], {
      cancelable: false
    }
    )
    return true;
  };

  closeApp = () => {
    BackHandler.exitApp()
    openInbox()
  }

  showHide() {
    this.setState({
      type: this.state.type === false ? true : false,
    });
  }

  setUg = () => {
    this.setState({ ugChecked: true, pgChecked: false });
    this.setState({ courseType: 'Under Graduate' });
  };

  setPg = () => {
    this.setState({ pgChecked: true, ugChecked: false });
    this.setState({ courseType: 'Post Graduate' });
  };

  handleChange(value, name) {
    let fields = this.state.fields;
    fields[name] = value;
    this.setState({ fields });
    this.setState({
      errors: Validator.validateForm(
        name,
        this.state.fields,
        this.state.errors,
      ),
    });
  }

  handleClick = async (e, name) => {
    if (name === 'email') {
      await this.setState({
        email: e.nativeEvent.text,
        errEmail: false,
      });
      await this.handleValidateEmail(this.state.email);
    }
  };

  handleValidateEmail = async (text) => {
    if (text) {
      let pattern = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
      if (!pattern.test(text)) {
      } else {
        let body = new FormData();
        body.append('email', this.state.email);
        let response = await makePostRequestMultipart(
          ApiUrl.ValidateCollegeEmail,
          false,
          body,
        );
        if (response && response[0].message) {
          Toast.show(response[0].message, Toast.LONG);
          this.setState({ showCollegeName: false });
        } else if (response && response[0]?.collegeName) {
          Toast.show(response[0].collegeName, Toast.LONG);
          this.setState({ showCollegeName: true });
          this.setState({ college: response[0].collegeName });
        } else {
          Toast.show(response[0].message, Toast.LONG);
          this.setState({ showCollegeName: true });
        }
      }
    }
  };

  handleOTP = async (e) => {
    await this.setState({
      number: e,
    });
    // this.validateJobForm();
  };
  onSentOtp = async () => {
    this.setState({ isSent: !this.state.isSent });

    if (this.state.fields.phone.length < 10) {
      Toast.show('Enter valid phone number', Toast.LONG);
    }
    if (this.state.email.length < 10) {
      Toast.show('Enter valid email address', Toast.LONG);
    } else {
      let body = new FormData();
      body.append('emailid', this.state.email);
      body.append(
        'phone_number',
        this.state.countryCode + this.state.fields.phone,
      );
      let response = await makePostRequestMultipart(
        ApiUrl.SENDSMS,
        false,
        body,
      );
      if (response) {
        Toast.show(response[0]?.message, Toast.LONG);
        this.setState({ rowID: response[0]?.rowid });
      }
    }
  };

  validateOtp = async () => {
    this.setState({ isSent: !this.state.isSent });
    if (this.state.enteredOTP.length > 2) {
      let body = new FormData();
      body.append('rowid', this.state.rowID);
      body.append('entered_otp', this.state.number);
      let response = await makePostRequestMultipart(
        ApiUrl.VALIDATE_OTP,
        false,
        body,
      );
      if (response) {
        Toast.show(response[0]?.message, Toast.LONG);
        // this.setState({enableSignUp:false});
        // this.setState({isModalVisible:true});
      }
    } else {
      Toast.show('Enter valid OTP', Toast.LONG);
    }
  };

  handleSubmit = async () => {
    //this.setState({showLoader: true});
    this.setState({
      errors: Validator.validateForm(
        null,
        this.state.fields,
        this.state.errors,
      ),
    });
    if (this.state.email === '') {
      this.setState({ errEmail: true });
    } else if (
      this.state.ugChecked === false &&
      this.state.pgChecked === false
    ) {
      this.setState({ errCourseType: true });
    } else if (this.state.college === '') {
      this.setState({ errCollege: true });
    } else if (this.state.errors.formIsValid) {
      this.setState({
        showLoader: true,
      })
      let body = new FormData();
      body.append('username', this.state.email);
      body.append('password', this.state.fields.password);
      body.append('email', this.state.email);
      body.append('first_name', this.state.fields.first_name);
      body.append('last_name', this.state.fields.last_name);
      body.append('collegeName', this.state.college);
      body.append('major', this.state.fields.major);
      body.append('course_type', this.state.courseType);
      this.setState({ errEmail: false });
      this.setState({ errCollege: false });
      this.setState({ errCourseType: false });

      let response = await makePostRequestMultipart(
        ApiUrl.FreelancerSignUp,
        false,
        body,
      );
      if (response) {
        this.setState({ userEmail: response?.email });
        this.setState({ isModalVisible: true, showLoader: false });
        // alert('A verification link sent to your email id');
        // this.props.navigation.navigate('SignInScreen');
        // Toast.show(response.msg, Toast.LONG);
        this._handleAppStateChange(this.state.userEmail);
      } else {
      }
    }
  };
  // onDismissModel = () => {
  //   this.setState({isModalVisible: false});
  //   this.props.navigation.navigate('HomeScreen');
  // };
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
            style={{ width: styles.deviceWidth, height: styles.deviceHeight }}
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
                      placeholderTextColor={'#fff'}
                      keyboardType="default"
                      value={this.state.fields.first_name}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'first_name')
                      }
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="user" size={20} color="#fff" />
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
                    <FontAwesome name="user" size={20} color="#fff" />
                  </View>
                </View>
                <ErrorMsg errorMsg={this.state.errors['last_name']} />

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    {/* <TextInput
                      returnKeyType="done"
                      placeholder="Enter email address"
                      style={styles.inputGroup}
                      placeholderTextColor={'#fff'}
                      keyboardType="email-address"
                      // value={this.state.email}
                      // onChange={this.handleInputEmail}
                      onChangeText={
                        (text) => this.handleChange(text.trim(), 'email')
                        //                       this.handleValidateEmail(text.trim())
                      }
                    />
                     */}
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter your email address"
                      style={styles.inputGroup}
                      placeholderTextColor={'#fff'}
                      keyboardType="email-address"
                      onChange={(evt) => this.handleClick(evt, 'email')}
                      value={this.state.email}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="at" size={20} color="#fff" />
                  </View>
                </View>
                {this.state.errEmail === true ? (
                  <ErrorMsg errorMsg="Invalid Email Address" />
                ) : (
                    <></>
                  )}

                {this.state.showCollegeName === true ? (
                  <>
                    <View style={styles.formGroup1}>
                      <View style={styles.formSubGroup2}>
                        <TextInput
                          returnKeyType="done"
                          placeholder="Enter your college name"
                          style={styles.inputGroup}
                          keyboardType="default"
                          placeholderTextColor={'#fff'}
                          //editable={false}
                          value={this.state.college}
                          onChangeText={(text) =>
                            this.handleChange(text.trim(), 'college')
                          }
                        />
                      </View>
                      <View style={styles.formSubGroup1}>
                        <FontAwesome
                          name="graduation-cap"
                          size={20}
                          color="#fff"
                        />
                      </View>
                    </View>
                    {this.state.errCollege === true ? (
                      <ErrorMsg errorMsg="Enter College Name" />
                    ) : (
                        <></>
                      )}

                    {/* <ErrorMsg errorMsg={this.state.errors['college']} /> */}
                  </>
                ) : (
                    <></>
                  )}

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter your major"
                      style={styles.inputGroup}
                      keyboardType="default"
                      placeholderTextColor={'#fff'}
                      value={this.state.fields.major}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'major')
                      }
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="graduation-cap" size={20} color="#fff" />
                  </View>
                </View>
                <ErrorMsg errorMsg={this.state.errors['major']} />

                <Text style={styles.inputHead}>Current Enrollment</Text>

                <View style={[styles.formrow]}>
                  <CheckBox
                    center
                    title="Undergraduate"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-thin"
                    checkedColor="#fff"
                    containerStyle={styles.radio}
                    textStyle={{ color: 'white', fontSize: 13 }}
                    checked={this.state.ugChecked}
                    onPress={this.setUg}
                  />
                  <CheckBox
                    center
                    title="Postgraduate"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-thin"
                    checkedColor="#fff"
                    containerStyle={styles.radio}
                    textStyle={{ color: 'white', fontSize: 13 }}
                    checked={this.state.pgChecked}
                    onPress={this.setPg}
                  />
                </View>
                {/* <ErrorMsg errorMsg={this.state.errors['enrollment']} /> */}
                {this.state.errCourseType === true ? (
                  <ErrorMsg errorMsg="Select Course Type" />
                ) : (
                    <></>
                  )}

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

                <Pressable style={styles.signinBtn} onPress={this.handleSubmit}>
                  <Text style={styles.signinText}>Sign Up</Text>
                </Pressable>

                <Text style={styles.signupAcnt}>
                  Already have an account?{' '}
                  <Text
                    style={styles.signupText}
                    onPress={() =>
                      this.props.navigation.navigate('SignInScreen', {
                        userType: 'student',
                      })
                    }>
                    Please Sign In
                  </Text>
                </Text>
              </View>
            </ScrollView>
          </ImageBackground>
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
                    <Entypo
                      name="circle-with-cross"
                      color="#71b85f"
                      size={35}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : (
            <></>
          )} */}
        </View>
      </SafeAreaView>
    );
  }
}

export default FreelancerSignUpScreen;
