import React, {Component} from 'react';
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
// import {Picker} from '@react-native-community/picker';
import styles from './style';
import CommonStyles from '../../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import CommonStatusBar from '../../../components/StatusBar';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import moment from 'moment';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
// //import ImagePicker from 'react-native-image-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import {Icon, CheckBox} from 'react-native-elements';
import Validator from '../../../config/Validator';
import ApiUrl from '../../../config/ApiUrl';
import {
  makePostRequest,
  makePostRequestMultipart,
} from '../../../services/http-connectors';
import ErrorMsg from '../../../components/ErrorMsg';

class FreelancerSignUpScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor() {
    super();
    this.state = {
      fields: {
        //user_name: '',
        first_name: '',
        last_name: '',
        //email: '',
        //phone: '',
        password: '',
        college: '',
        major: '',
        enrollment: '',
      },
      email: '',
      errEmail: false,
      showCollegeName: false,
      errors: {},
      courseType: '',
      typeValue: '',
      // skill: [
      //   {name: 'Concentration'},
      //   {name: 'Fast Typing Speed'},
      //   {name: 'Microsoft Word'},
      //   {name: 'Microsoft Excel'},
      //   {name: 'Blockchain'},
      //   {name: 'Data Science'},
      //   {name: 'Mathematics'},
      // ],
      // categories: [
      //   {name: 'Data Entry'},
      //   {name: 'Software Development'},
      //   {name: 'Sales and Marketing'},
      //   {name: 'Music and Arts'},
      // ],
      ugChecked: false,
      pgChecked: false,
    };
  }
  setUg = () => {
    this.setState({ugChecked: true, pgChecked: false, gender: 'Undergraduate'});
    this.setState({fields: {enrollment: 'underGraduate'}});
  };

  setPg = () => {
    this.setState({pgChecked: true, ugChecked: false, gender: 'Postgraduate'});
    this.setState({fields: {enrollment: 'postGraduate'}});
  };

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
          this.setState({showCollegeName:false})
        } else if (response && response[0]?.collegeName) {
          Toast.show(response[0].collegeName, Toast.LONG);
          this.setState({fields: {college: response[0].collegeName}});
          this.setState({showCollegeName:true})
        } else {
          Toast.show(response[0].message, Toast.LONG);
          this.setState({showCollegeName:false})
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

    if (this.state.errors.formIsValid) {
      let body = new FormData();
      body.append('username', this.state.email);
      body.append('password', this.state.fields.password);
      body.append('email', this.state.email);
      body.append('first_name', this.state.fields.first_name);
      body.append('last_name', this.state.fields.last_name);
      body.append('collegeName', this.state.fields.college);
      body.append('major', this.state.fields.major);
      body.append('course_type', this.state.fields.enrollment);
      console.log('handle formdata -----', body);
      /*
      let response = await makePostRequestMultipart(
        ApiUrl.FreelancerSignUp,
        false,
        body,
      );
      console.log('handle freelancer Signup-----', response);
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
      */
    }
  };
  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={styles.main}>
          <CommonStatusBar />
          <ImageBackground
            style={{width: styles.deviceWidth, height: styles.deviceHeight}}
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
                      // value={this.state.firstname}
                      // onChange={this.handleInputName}
                      value={this.state.fields.first_name}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'first_name')
                      }
                      // errorMessage={this.state.errors['first_name']}
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
                      // value={this.state.lastname}
                      // onChange={this.handleInputName}
                      value={this.state.fields.last_name}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'last_name')
                      }
                      // errorMessage={this.state.errors['last_name']}
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
                      placeholder="Enter email address"
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
                <ErrorMsg errorMsg={this.state.errors['email']} />
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
                          editable={false}
                          // value={this.state.lastname}
                          // onChange={this.handleInputName}
                          value={this.state.fields.college}
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
                    <ErrorMsg errorMsg={this.state.errors['college']} />
                  </>
                ) : (
                  <></>
                )}

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter major"
                      style={styles.inputGroup}
                      keyboardType="default"
                      placeholderTextColor={'#fff'}
                      // value={this.state.lastname}
                      // onChange={this.handleInputName}
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

                <Text style={styles.inputHead}>Current Enrollment *</Text>

                <View style={[styles.formrow]}>
                  <CheckBox
                    center
                    title="Undergraduate"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-thin"
                    checkedColor="#fff"
                    containerStyle={styles.radio}
                    textStyle={{color: 'white', fontSize: 13}}
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
                    textStyle={{color: 'white', fontSize: 13}}
                    checked={this.state.pgChecked}
                    onPress={this.setPg}
                  />
                </View>
                <ErrorMsg errorMsg={this.state.errors['enrollment']} />

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Enter Password"
                      style={styles.inputGroup}
                      keyboardType="default"
                      secureTextEntry
                      placeholderTextColor={'#fff'}
                      //value={this.state.password}
                      //onChange={this.handleInputName}
                      value={this.state.fields.password}
                      onChangeText={(text) =>
                        this.handleChange(text.trim(), 'password')
                      }
                      //errorMessage={this.state.errors['password']}
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
                  <Text style={styles.signupText}>Please Sign In</Text>
                </Text>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

export default FreelancerSignUpScreen;
