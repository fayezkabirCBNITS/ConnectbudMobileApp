import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,

} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './singInstyle';

import base64 from "base-64";
import axios from "axios";
import { API_URL } from "../../../config/url";


class SignInScreen extends Component {
  constructor() {
    super();
    this.state = {
      showLoader: false,
      username: '',
      password: '',
      errors: {},
      type: true,
    };
    this.showHide = this.showHide.bind(this);
  }

  static navigationOptions = {
    headerShown: false,
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
      username: e
    })
  }

  handlePassword = async (e) => {
    await this.setState({
      password: e
    })
  }

  submitLogin = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      this.userLogin();
      this.setState({showLoader: true});
      // Toast.show('submit action', Toast.LONG);
    }
  };

  validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.username) {
      formIsValid = false;
      errors["username"] = "*Please enter your email address.";
    }
    else if (typeof this.state.username !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(this.state.username)) {
        formIsValid = false;
        errors["username"] = "*Please enter your valid email address.";
      }
    }
    if (!this.state.password) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  userLogin = async () => {
    console.log("user login hit");
    const obj = {
      username: base64.encode(this.state.username),
      password: base64.encode(this.state.password),
      login_type: base64.encode("normal"),
    };
    //this.setState({ isLoading: true });
    await axios
      .post(API_URL + "auth/login", obj, {
        header: {
          "content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        this.props.navigation.navigate('EmployeeInner')
        // localStorage.setItem("username", base64.decode(response.data[0].name));
        // localStorage.setItem("slugname", base64.decode(response.data[0].slug));
        // localStorage.setItem(
        //   "user_id",
        //   base64.decode(response.data[0].user_id)
        // );
        // localStorage.setItem("flag", base64.decode(response.data[0].Flag));
        // localStorage.setItem("token", base64.decode(response.data[0].Token));
        // localStorage.setItem("status", base64.decode(response.data[0].Status));
        // localStorage.setItem("searchType", "")

        // if (
        //   base64.decode(response.data[0].Flag) === "Y" &&
        //   localStorage.getItem("pageStatus") === null
        // ) {
        //   this.props.history.push("/feed");
        // } else if (
        //   base64.decode(response.data[0].Flag) === "Y" &&
        //   localStorage.getItem("pageStatus") === "project"
        // ) {
        //   this.props.history.push("/project-details");
        // }  else if (
        //   base64.decode(response.data[0].Flag) === "Y" &&
        //   localStorage.getItem("pageStatus") === "Tutorproject"
        // ) {
        //   this.props.history.push("/tutor-details");
        // }else if (
        //   base64.decode(response.data[0].Flag) === "Y" &&
        //   localStorage.getItem("pageStatus") === "job"
        // ) {
        //   this.props.history.push("/job-details");
        // } else {
        //   swal("The email or password you have entered is invalid!");
        //   this.setState({ isLoading: false });
        // }
      })
      .catch((error) => {
        if (error.response.data.error === "You are signed up as Employer") {
          alert("You are signed up as an employer!");
        } else {
          alert("The email or password you have entered is invalid!");
        }
        // this.setState({ isLoading: false });
      });
  };

  render() {
    // console.warn(this.state.username)
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={styles.main}>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#0000"
            translucent={true}
          />
          {/* <ImageBackground
              source={require('../../../assets/images/bnr.jpg')}
              style={styles.coverImage}
            > */}

          <View style={[CommonStyles.container, styles.inputDiv]}>
            <View style={styles.logo}>
              <Image source={require('../../../assets/images/logoWhite.png')} style={CommonStyles.splashImg} />
            </View>
            <View style={styles.formGroup1}>
              <View style={styles.formSubGroup2}>
                <TextInput
                  returnKeyType="done"
                  placeholder="Enter your email address"
                  style={styles.inputGroup}
                  keyboardType='email-address'
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
                  placeholder="Enter your password"
                  style={styles.inputGroup}
                  keyboardType="default"
                  secureTextEntry={this.state.type}
                  value={this.state.password}
                  onChangeText={this.handlePassword}
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
            <Text style={styles.errorText}>
              {this.state.errors.password}
            </Text>

            <Pressable style={styles.forgetDiv}>
              <Text style={styles.forgetText}>Forgot Password?</Text>
            </Pressable>
            <Pressable
              style={styles.signinBtn}
              onPress={this.submitLogin}
            >
              <Text style={styles.signinText}>Sign In</Text>
              {/* {this.state.showLoader && (
                <ActivityIndicator
                  size="large"
                  color="#fff"
                  // style={CommonStyles.loader}
                />
              )} */}
            </Pressable>
            {this.state.showLoader && (
                <ActivityIndicator
                  size="large"
                  color="#fff"
                  // style={CommonStyles.loader}
                />
              )}
            <View style={styles.iconDiv}>
              <Image source={require('../../../assets/images/fb.png')} style={styles.iconImg} />
              <Image source={require('../../../assets/images/g.png')} style={styles.iconImg} />
              <Image source={require('../../../assets/images/google.png')} style={styles.iconImg} />
            </View>
            <Text style={styles.signupAcnt}>Don't have an account?{" "}
              <Text style={styles.signupText}
                onPress={() => this.props.navigation.navigate('SignUpScreen')}
              >
                Sign Up
              </Text>
            </Text>
          </View>
          {/* </ImageBackground> */}
        </View>
      </SafeAreaView >
    );
  }
}

export default SignInScreen;
