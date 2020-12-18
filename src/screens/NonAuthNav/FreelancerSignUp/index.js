import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import styles from './style';
import CommonStyles from '../../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import CommonStatusBar from '../../../components/StatusBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
//import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Icon, CheckBox} from 'react-native-elements';

class FreelancerSignUpScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor() {
    super();
    this.state = {
      firtName: '',
      lastName: '',
      college: '',
      major: '',
      currentEnrollment: '',
      typeValue: '',
      location: '',
      startDate: '',
      endDate: '',
      community: '',
      socialUrl: '',
      profileImageSource: '',
      coverImageSource: '',
      profileImageToUpload: {},
      coverImageToUpload: {},
      showStartDatePicker: false,
      showEndDatePicker: false,
      showLoader: false,
      showSkills: false,
      showCategories: false,
      skillsData: [
        {title: 'C'},
        {title: 'JAVA'},
        {title: 'C++'},
        {title: 'C#'},
      ],
      categoriesData: [
        {title: 'Data Entry'},
        {title: 'Software Development'},
        {title: 'Sales and Marketing'},
        {title: 'Music and Arts'},
      ],
      skill: [
        {name: 'Concentration'},
        {name: 'Fast Typing Speed'},
        {name: 'Microsoft Word'},
        {name: 'Microsoft Excel'},
        {name: 'Blockchain'},
        {name: 'Data Science'},
        {name: 'Mathematics'},
      ],
      categories: [
        {name: 'Data Entry'},
        {name: 'Software Development'},
        {name: 'Sales and Marketing'},
        {name: 'Music and Arts'},
      ],
      ugChecked: false,
      pgChecked: false,
    };
  }
  setUg = () => {
    this.setState({ugChecked: true, pgChecked: false, gender: 'Undergraduate'});
  };

  setPg = () => {
    this.setState({pgChecked: true, ugChecked: false, gender: 'Postgraduate'});
  };
  handleSubmit = async () => {
    this.setState({showLoader: true});
    Toast.show('submit action', Toast.LONG);
  };
  render() {
    return (<SafeAreaView style={CommonStyles.safeAreaView}>
          <View style={styles.main}>
            <CommonStatusBar />
            <ImageBackground
            style={{width:styles.deviceWidth,height:styles.deviceHeight}}
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
                        value={this.state.firstname}
                        onChange={this.handleInputName}
                      />
                    </View>
                    <View style={styles.formSubGroup1}>
                      <FontAwesome name="user" size={20} color="#fff" />
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
                      <FontAwesome name="user" size={20} color="#fff" />
                    </View>
                  </View>

                  <View style={styles.formGroup1}>
                    <View style={styles.formSubGroup2}>
                      <TextInput
                        returnKeyType="done"
                        placeholder="Enter email address"
                        style={styles.inputGroup}
                        placeholderTextColor={'#fff'}
                        keyboardType="email-address"
                        value={this.state.email}
                        onChange={this.handleInputName}
                      />
                    </View>
                    <View style={styles.formSubGroup1}>
                      <FontAwesome name="at" size={20} color="#fff" />
                    </View>
                  </View>

                  <View style={styles.formGroup1}>
                    <View style={styles.formSubGroup2}>
                      <TextInput
                        returnKeyType="done"
                        placeholder="Enter your college name"
                        style={styles.inputGroup}
                        keyboardType="default"
                        placeholderTextColor={'#fff'}
                        value={this.state.lastname}
                        onChange={this.handleInputName}
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

                  <View style={styles.formGroup1}>
                    <View style={styles.formSubGroup2}>
                      <TextInput
                        returnKeyType="done"
                        placeholder="Enter major"
                        style={styles.inputGroup}
                        keyboardType="default"
                        placeholderTextColor={'#fff'}
                        value={this.state.lastname}
                        onChange={this.handleInputName}
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

                  <View style={styles.formGroup1}>
                    <View style={styles.formSubGroup2}>
                      <TextInput
                        returnKeyType="done"
                        placeholder="Enter Password"
                        style={styles.inputGroup}
                        keyboardType="default"
                        secureTextEntry
                        placeholderTextColor={'#fff'}
                        value={this.state.password}
                        onChange={this.handleInputName}
                      />
                    </View>
                    <View style={styles.formSubGroup1}>
                      <FontAwesome name="eye" size={20} color="#fff" />
                    </View>
                  </View>

                  <Pressable
                    style={styles.signinBtn}>
                    <Text style={styles.signinText}>Sign Up</Text>
                  </Pressable>

                  <Text style={styles.signupAcnt}>
                    Already have an account?{' '}
                    <Text
                      style={styles.signupText}>
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

export default FreelancerSignUpScreen;
