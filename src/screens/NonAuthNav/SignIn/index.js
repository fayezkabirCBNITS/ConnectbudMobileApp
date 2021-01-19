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
  KeyboardAvoidingView,
  TouchableOpacity,
  Linking,
  Platform,
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

import {deepClone} from '../../../services/helper-methods';

import {withNavigation} from 'react-navigation';

import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes
// } from "@react-native-community/google-signin";

// GoogleSignin.configure({
//   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
//   webClientId:
//   "367228152991-ft3qki8h4dls21t36j1tpne39gidbltt.apps.googleusercontent.com",
//   offlineAccess: true,
//   forceCodeForRefreshToken: true
// });

import axios from 'axios';

import {API_URL} from '../../../config/url';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.userID
        : '',
      user_type: this.props.navigation.state.params
        ? this.props.navigation.state.params.userStatus
        : '',
      social_type: this.props.navigation.state.params
        ? this.props.navigation.state.params.userType
        : '',
      pageStatus: this.props.navigation.state.params
        ? this.props.navigation.state.params.page_status
        : '',
      projectType: this.props.navigation.state.params
        ? this.props.navigation.state.params.project_type
        : '',
      showLoader: false,
      username: '',
      password: '',
      userId: '',
      errors: {},
      type: true,
      deviceTokenId: '',
      devicetype: '',
      deepLinking: false,
      userID: '',
      userType: '',
      jobId: '',
    };
    this.showHide = this.showHide.bind(this);
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    console.log(this.state.projectType);
    console.log(this.state.pageStatus);

    //  START
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('willFocus', async () => {
      console.log('kkkkkkkkkkkkkkkk');
    });

    // END
    // console.log(this.state.social_type);
    if (this.state.user_type === 'employer') {
      let body1 = new FormData();
      body1.append('user_id', this.state.user_id);
      body1.append('type', 'yes');
      body1.append('registration_type', 'freelancer');
      console.log(body1);
      axios({
        url: API_URL + 'recruiterVerification',
        method: 'POST',
        data: body1,
      })
        .then((response) => {
          console.log('verify', response);
        })
        .catch((error) => {});
    }
    var _this = this;
    PushNotification.configure({
      onRegister: function (token) {
        if (token) {
          _this.setState({deviceTokenId: token.token, devicetype: token.os});
        }
      },

      onNotification: function (notification) {},
      onAction: function (notification) {
        // process the action
      },
      onRegistrationError: function (err) {
        console.error('err.message', err);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };
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
    console.log('user loginnnnnnnnnnnn called');
    console.log(this.props.navigation.state.params.userType);
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
      console.log(obj);
    } else if (this.state.user_type === 'employer') {
      obj = {
        username: base64.encode(this.state.username),
        password: base64.encode(this.state.password),
        login_type: base64.encode('employer'),
        deviceTokenId: this.state.deviceTokenId,
        devicetype: this.state.devicetype,
      };
      console.log(obj);
    }
    ///
    let response = await makePostRequest(ApiUrl.LOGIN, false, obj);
    console.log('login', response);
    if (!response.error) {
      this.setState({showLoader: false});
      //Toast.show(response.msg, Toast.LONG);
      console.log('sandipppp', response);
      this.props.updateUserDetails(response);
      {
        response.error === 'You are signed up as Employer'
          ? alert('You are signed up as Employer')
          : null;
      }
      this.setState({userId: response[0]?.user_id});
      {
        response[0]?.Flag === 'WQ=='
          ? this.props.navigation.navigate('StudentInner', {
              page_status: this.state.pageStatus,
              project_type: this.state.projectType,
            })
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
    console.log(this.props.userDeatailResponse?.tmpPostJob?.hire_by);
    if (this.props.userDeatailResponse?.tmpPostJob.hasOwnProperty('tmpJobID')) {
      console.log('called update id if');

      this.setState({
        jobId: this.props.userDeatailResponse?.tmpPostJob?.tmpJobID,
      });

      let jobDescription = new FormData();
      jobDescription.append('user_id', base64.decode(this.state.userId));
      jobDescription.append(
        'job_id',
        this.props.userDeatailResponse?.tmpPostJob?.tmpJobID,
      );
      jobDescription.append(
        'hire_by',
        this.props.userDeatailResponse?.tmpPostJob?.hire_by,
      );

      console.log(jobDescription);

      let response = await makePostRequestMultipart(
        ApiUrl.UPDATE_ID,
        false,
        jobDescription,
      );
      if (response && response[0].message === 'success') {
        if (this.props.userDeatailResponse?.tmpPostJob?.hire_by === 'connectbud') {
          this.props.navigation.navigate('CheckoutScreen', {
            page_status: 'tutorlanding',
            job_id: this.state.jobId,
          });
        } else {
          alert('Successfully posted the Project!');
          this.props.navigation.navigate('PostedProjectByEmployee');
        }
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

  signInFirst = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      var google_data = JSON.stringify(userInfo);
      let name = userInfo.user.name;
      let first_name = userInfo.user.givenName;
      let last_name = userInfo.user.familyName;
      let email = userInfo.user.email;
      let picture = userInfo.user.photo;
      let provider_id = userInfo.user.id;
      let provider = 'google';

      this.sociallogin(email, name, provider_id, picture, provider);
    } catch (error) {
      console.log('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('SIGN_IN_CANCELLED-error', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log('IN_PROGRESS-error', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('PLAY_SERVICES_NOT_AVAILABLE-error', error);
      } else {
        // some other error happened
        console.log('other-error', error);
      }
    }
  };

  faceBookLogin = async () => {
    LoginManager.logOut();
    console.log('faceBookLogin');
    try {
      const userInfo = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      console.log(userInfo);
      if (userInfo.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log('Login success with permissions: ' + userInfo);
        AccessToken.getCurrentAccessToken().then((data) => {
          let accessToken = data.accessToken.toString();
          console.log('accesstoken', accessToken);
          if (accessToken) {
            fetch(
              'https://graph.facebook.com/v2.5/me?fields=email,name,picture,friends&access_token=' +
                accessToken,
            )
              .then((response) => response.json())
              .then((json) => {
                console.log('userdetails', json);

                let email = json.email;
                let name = json.name;
                let provider_id = json.id;
                let picture = json.picture.data.url;
                let provider = 'facebook';

                console.log(email);
                if (email === undefined) {
                  console.log('ffffffffffffffffffffffff');
                  alert(
                    'No email-id found in your fb account.Please do manual Signup',
                  );
                } else {
                  this.sociallogin(email, name, provider_id, picture, provider);
                }
              })
              .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK');
              });
          }
        });
      }
    } catch (error) {
      console.log('signin error', error);
      Toast.show('Something went wrong!');
    }
  };

  sociallogin = async (email, name, provider_id, picture, provider) => {
    console.log('called');
    let body = new FormData();
    body.append('socialLogintype', provider);
    body.append('first_name', name.split(' ')[0]);
    body.append('last_name', name.split(' ')[1]);
    if (provider === 'google') {
      body.append('appId', '');
      body.append('googleId', provider_id);
    } else {
      body.append('appId', provider_id);
      body.append('googleId', '');
    }

    body.append('profileImage', picture);
    body.append('email', email);

    console.log(body);

    await axios({
      url: API_URL + 'auth/socialLogin',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        console.log(response.data, 'ss');
        this.props.updateUserDetails(response.data);
        this.props.navigation.navigate('EmployeeInner');
      })
      .catch((error) => {
        console.log(error);
        this.setState({isLoading: false});
        // swal('Facebook-Id already exists');
      });
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
                      autoCapitalize="none"
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

                <Pressable
                  style={styles.forgetDiv}
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPassword')
                  }>
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
                {this.state.social_type === 'employee' ? (
                  <View style={styles.iconDiv}>
                    <TouchableOpacity onPress={this.faceBookLogin}>
                      <Image
                        source={require('../../../assets/images/fb.png')}
                        style={styles.iconImg}
                      />
                    </TouchableOpacity>
                    {/* <Image
                      source={require('../../../assets/images/g.png')}
                      style={styles.iconImg}
                    />
                    <TouchableOpacity
                    // onPress={this.signInFirst}
                    >
                    <Image
                      source={require('../../../assets/images/google.png')}
                      style={styles.iconImg}
                    />
                    /> */}
                    <TouchableOpacity onPress={this.signInFirst}>
                      <Image
                        source={require('../../../assets/images/google.png')}
                        style={styles.iconImg}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(SignInScreen));
