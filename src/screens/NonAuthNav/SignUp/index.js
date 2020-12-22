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
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './style';
// import axios from 'axios';
// import {API_URL} from '../../../config/url';
import CommonStatusBar from '../../../components/StatusBar';
import Validator from '../../../config/Validator';
import ApiUrl from '../../../config/ApiUrl';
import {makePostRequest} from '../../../services/http-connectors';
import ErrorMsg from '../../../components/ErrorMsg';

class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      fields: {
        //user_name: '',
        first_name: '',
        last_name: '',
        email: '',
        //phone: '',
        password: '',
      },
      //firstname: '',
      //lastname: '',
      //email: '',
      //password: '',
      //number: '',
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

  onSentOtp = () => {
    this.setState({isSent: true});
  };

  /*

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

    if (this.state.firstname !== 'undefined') {
      if (!this.state.firstname.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors['firstname'] = '*Please enter alphabet characters only.';
      }
    }

    if (!this.state.lastname) {
      formIsValid = false;
      errors['lastname'] = '*Please enter your last name.';
    }

    if (this.state.lastname !== 'undefined') {
      if (!this.state.lastname.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors['lastname'] = '*Please enter alphabet characters only.';
      }
    }

    if (!this.state.email) {
      formIsValid = false;
      errors['email'] = '*Please enter your email address.';
    }

    if (this.state.email !== 'undefined') {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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

    if (this.state.password !== 'undefined') {
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
*/
  
submituserRegistrationForm = async () => {
  console.log('sgggg=========');
    // if (!this.state.isVerified) {
    //   alert('Please verify that you are a human!');
    //   return false;
    // }
    this.setState({
      errors: Validator.validateForm(
        null,
        this.state.fields,
        this.state.errors,
      ),
    });

    if(this.state.errors.formIsValid) {
      console.log('sgggg=========2')
      //body.append('username', this.state.fields.user_name);

    let body = new FormData();
    body.append('username', this.state.fields.email);
    body.append('password', this.state.fields.password);
    body.append('email', this.state.fields.email);
    body.append('first_name', this.state.fields.first_name);
    body.append('last_name', this.state.fields.last_name);
    let response = await makePostRequest(ApiUrl.EmployerSignUp,false,body);
    console.log('handle employee Signup-----', response);
    if (response) {
      //Toast.show(response.msg, Toast.LONG);
      //this.props.updateUserDetails(response);
      //console.log('resdtlres============', response[0]?.Flag);
      // {
      //   response[0]?.Flag === 'WQ=='
      //     ? this.props.navigation.navigate('StudentInner')
      //     : response[0]?.Flag === 'Rg=='
      //     ? this.props.navigation.navigate('EmployeeInner')
      //     : null;
      // }
    } else {
      //alert('The email or password you have entered is invalid!');
      // Toast.show(response.msg, Toast.LONG);
    }
  }
    /*
    axios
      .post(API_URL + "auth/register_recruiter", body)
      .then((res) => {
        alert('Please verify your email & login');
        this.props.navigation.navigate('SignInScreen');
      })
      .catch((error) => { });
      */
  };

  // submituserRegistrationForm = () => {
  //   // let dataSet = this.validateForm();
  //   // if (dataSet === true) {
  //   //   this.handleSubmit();
  //   // }

  // };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={styles.main}>
          <CommonStatusBar />
          <ImageBackground
            style={{width: '100%', height: '100%'}}
            source={require('../../../assets/images/authBg.jpg')}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
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
                      //value={this.state.firstname}
                      //onChange={this.handleInputFirstName}
                      value={this.state.fields.first_name}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'first_name')
                      }
                     // errorMessage={this.state.errors['first_name']}
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
                      //value={this.state.lastname}
                      //onChange={this.handleInputLastName}
                      value={this.state.fields.last_name}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'last_name')
                      }
                      //errorMessage={this.state.errors['last_name']}
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
                      //value={this.state.email}
                      //onChange={this.handleInputEmail}
                      value={this.state.fields.email}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'email')
                      }
                      //errorMessage={this.state.errors['email']}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <AntDesign name="user" size={20} color="#fff" />
                  </View>
                </View>
                <ErrorMsg errorMsg={this.state.errors['email']} />

                {/* <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2Num}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="+ 91"
                      style={styles.inputGroup}
                      placeholderTextColor={'#fff'}
                      keyboardType="number-pad"
                      value={this.state.number}
                      onChange={this.handleInputLastName}
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
                )} */}

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter Password"
                      style={styles.inputGroup}
                      keyboardType="default"
                      secureTextEntry={true}
                      //secureTextEntry={this.state.type}
                      placeholderTextColor={'#fff'}
                      //value={this.state.password}
                      //onChangeText={this.handleInputPassword}
                      value={this.state.fields.password}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'password')
                      }
                      //errorMessage={this.state.errors['password']}
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
