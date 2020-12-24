import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import styles from './style';
import CommonStyles from '../../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import CommonStatusBar from '../../../components/StatusBar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import { Icon, CheckBox } from 'react-native-elements';
import Validator from '../../../config/Validator';
import ApiUrl from '../../../config/ApiUrl';
import {
  makePostRequestMultipart,
} from '../../../services/http-connectors';
import ErrorMsg from '../../../components/ErrorMsg';

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
        //phone: '',
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
    };
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
        console.log('*Please enter valid college email address.');
      } else {
        let body = new FormData();
        body.append('email', this.state.email);
        let response = await makePostRequestMultipart(
          ApiUrl.ValidateCollegeEmail,
          false,
          body,
        );
        console.log('handle validate college email -----', response);
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

  handleSubmit = async () => {
    // this.setState({showLoader: true});
    console.log('sgggg=========');
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
      console.log('handle formdata -----', body);

      let response = await makePostRequestMultipart(
        ApiUrl.FreelancerSignUp,
        false,
        body,
      );
      console.log('handle freelancer Signup-----', response);
      if (response) {
        this.setState({ userEmail: response?.email });
        this.setState({ isModalVisible: true });
      } else {
        //alert('The email or password you have entered is invalid!');
        // Toast.show(response.msg, Toast.LONG);
      }

    }
  };
  onDismissModel = () => {
    this.setState({ isModalVisible: false });
    this.props.navigation.navigate('HomeScreen')
  }
  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={styles.main}>
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

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter Password"
                      style={styles.inputGroup}
                      keyboardType="default"
                      secureTextEntry
                      placeholderTextColor={'#fff'}
                      value={this.state.fields.password}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'password')
                      }
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="eye" size={20} color="#fff" />
                  </View>
                </View>
                <ErrorMsg errorMsg={this.state.errors['password']} />

                <Pressable style={styles.signinBtn} onPress={this.handleSubmit}>
                  <Text style={styles.signinText}>Sign Up</Text>
                </Pressable>

                <Text style={styles.signupAcnt}>
                  Already have an account?{' '}
                  <Text style={styles.signupText} onPress={() => this.props.navigation.navigate('SignInScreen', { userType: 'student' })}>
                    Please Sign In
                  </Text>
                </Text>
              </View>
            </ScrollView>
          </ImageBackground>
          {this.state.isModalVisible === true ? <Modal transparent={true} isVisible={this.state.isModalVisible}>
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

                <TouchableOpacity style={CommonStyles.modalCross} onPress={this.onDismissModel}>
                  <Entypo name="circle-with-cross" color="#71b85f" size={35} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal> : <></>}
        </View>
      </SafeAreaView>
    );
  }
}

export default FreelancerSignUpScreen;
