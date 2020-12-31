import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonStatusBar from '../../../components/StatusBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ApiUrl from '../../../config/ApiUrl';
import {
  makePostRequest,
  makePostRequestMultipart,
} from '../../../services/http-connectors';
import styles from './singInstyle';
import base64 from 'base-64';
import {updateUserDetails} from '../../../redux/actions/user-data';
import {connect} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import {ThemeContext} from 'react-navigation';
import {Header} from 'react-navigation-stack'

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      username: '',
      password: '',
      userId: '',
      errors: {},
      type: true,
      deviceTokenId: '',
      devicetype: '',
    };
    this.showHide = this.showHide.bind(this);
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount() {
    var _this = this;
    PushNotification.configure({
      onRegister: function (token) {
        if (token) {
          _this.setState({deviceTokenId: token.token, devicetype: token.os});
        }
      },

      onNotification: function (notification) {
      },
      onAction: function (notification) {
        // process the action
      },
      onRegistrationError: function (err) {
        console.error('err.message', err);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }
  handleSkills = async () => {
    this.setState({showSkills: !this.state.showSkills});
  };

  showHide() {
    this.setState({
      type: this.state.type === false ? true : false,
    });
  }

  handleEmail = async (e) => {
    await this.setState({
      username: e,
    });
  };

  handlePassword = async (e) => {
    await this.setState({
      password: e,
    });
  };

  submitLogin = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      this.userLogin();

      // Toast.show('submit action', Toast.LONG);
    }
  };

  validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.username) {
      formIsValid = false;
      errors['username'] = '*Please enter your email address.';
    } else if (typeof this.state.username !== 'undefined') {
      var pattern = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
      ///^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i

      if (!pattern.test(this.state.username)) {
        formIsValid = false;
        errors['username'] = '*Please enter your valid email address.';
      }
    }
    if (!this.state.password) {
      formIsValid = false;
      errors['password'] = '*Please enter your password.';
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  userLogin = async () => {
    this.setState({showLoader: true});
    let obj = {};
    if (this.props.navigation.state.params.userType === 'student') {
      obj = {
        username: base64.encode(this.state.username),
        password: base64.encode(this.state.password),
        login_type: base64.encode('normal'),
        deviceTokenId: this.state.deviceTokenId,
        devicetype: this.state.devicetype,
      };
    } else if (this.props.navigation.state.params.userType === 'employee') {
      obj = {
        username: base64.encode(this.state.username),
        password: base64.encode(this.state.password),
        login_type: base64.encode('employer'),
        deviceTokenId: this.state.deviceTokenId,
        devicetype: this.state.devicetype,
      };
    }
    ///
    let response = await makePostRequest(ApiUrl.LOGIN, false, obj);
    if (!response.error) {
      this.setState({showLoader: false});
      //Toast.show(response.msg, Toast.LONG);
      this.props.updateUserDetails(response);
      {
        response.error === 'You are signed up as Employer'
          ? alert('You are signed up as Employer')
          : null;
      }
      this.setState({userId: response[0]?.user_id});
      {
        response[0]?.Flag === 'WQ=='
          ? this.props.navigation.navigate('StudentInner')
          : response[0]?.Flag === 'Rg=='
          ? // ? (this.props.userDeatailResponse?.tmpPostJob && this.props.userDeatailResponse?.tmpPostJob?.tmpJobID)
            this.validateLogin()
          : // ? this.props.navigation.navigate('EmployeeInner')
            null;
      }
    } else if (response.error !== '') {
      this.setState({showLoader: false});
      alert(response.error);
    } else {
      this.setState({showLoader: false});
      alert('The email or password you have entered is invalid!');
      // Toast.show(response.msg, Toast.LONG);
    }
    ///
  };
  validateLogin = async () => {
    if (this.props.userDeatailResponse?.tmpPostJob.hasOwnProperty('tmpJobID')) {
      let jobDescription = new FormData();
      jobDescription.append('user_id', this.state.userId);
      jobDescription.append(
        'job_id',
        this.props.userDeatailResponse?.tmpPostJob?.tmpJobID,
      );
      jobDescription.append(
        'hire_by',
        this.props.userDeatailResponse?.tmpPostJob?.hire_by,
      );
      let response = await makePostRequestMultipart(
        ApiUrl.UPDATE_ID,
        false,
        jobDescription,
      );
      if (response && response[0].message === 'success') {
        alert('Job posted Successfully');
        this.props.navigation.navigate('EmployeeInner');
      }
    } else {
      this.props.navigation.navigate('EmployeeInner');
    }
  };
  handleSignUp = () => {
    if (this.props.navigation.state.params.userType === 'student') {
      this.props.navigation.navigate('FreelancerSignUpScreen');
    } else if (this.props.navigation.state.params.userType === 'employee') {
      this.props.navigation.navigate('SignUpScreen');
    }
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={styles.main}>
          <CommonStatusBar />
          <ImageBackground
            style={{width: '100%', height: '100%'}}
            source={require('../../../assets/images/authBg.jpg')}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}>
                <KeyboardAvoidingView
                  keyboardVerticalOffset = {Header.HEIGHT + 160}
                  style = {{ flex: 1 }}
                  behavior = "padding" >
              <View style={[CommonStyles.container, styles.inputDiv]}>
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
                      placeholder="Enter Username"
                      style={styles.inputGroup}
                      keyboardType="default"
                      placeholderTextColor={'#fff'}
                      value={this.state.username}
                      onChangeText={this.handleEmail}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <AntDesign name="user" size={20} color="#fff" />
                  </View>
                </View>
                <Text style={styles.errorText}>
                  {this.state.errors.username}
                </Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter Password"
                      style={styles.inputGroup}
                      keyboardType="default"
                      placeholderTextColor={'#fff'}
                      secureTextEntry={this.state.type}
                      value={this.state.password}
                      onChangeText={this.handlePassword}
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
                <Text style={styles.errorText}>
                  {this.state.errors.password}
                </Text>

                <Pressable style={styles.forgetDiv}>
                  <Text style={styles.forgetText}>Forgot Password?</Text>
                </Pressable>
                <Pressable
                  style={styles.signinBtn}
                  onPress={this.submitLogin}
                  disabled={this.state.showLoader}>
                  {this.state.showLoader === true ? (
                    <ActivityIndicator
                      size="small"
                      color="#fff"
                      // style={CommonStyles.loader}
                    />
                  ) : (
                    <Text style={styles.signinText}>Sign In </Text>
                  )}
                </Pressable>
                <View style={styles.iconDiv}>
                  <Image
                    source={require('../../../assets/images/fb.png')}
                    style={styles.iconImg}
                  />
                  <Image
                    source={require('../../../assets/images/g.png')}
                    style={styles.iconImg}
                  />
                  <Image
                    source={require('../../../assets/images/google.png')}
                    style={styles.iconImg}
                  />
                </View>
                <Text style={styles.signupAcnt}>
                  Don't have an account?{' '}
                  <Text style={styles.signupText} onPress={this.handleSignUp}>
                    Sign Up
                  </Text>
                </Text>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
    //updateTmpPostJob: state.jobData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUserDetails: (data) => dispatch(updateUserDetails(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
