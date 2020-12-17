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
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './style';

class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      password: '',
      number: '',
      isSent: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  onSentOtp = () => {
    this.setState({isSent: true});
  };

  handleInputName = (e) => {
    this.setState({
      firstname: e.target.value,
      lastname: e.target.value,
      number: e.target.value,
      password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.warn(this.state.firstname);
  };

  render() {
    // console.warn(this.state.firstname);
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
                  keyboardType="number-pad"
                  value={this.state.number}
                  onChange={this.handleInputName}
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
                    keyboardType="default"
                    secureTextEntry
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
                  secureTextEntry
                  value={this.state.password}
                  onChange={this.handleInputName}
                />
              </View>
              <View style={styles.formSubGroup1}>
                <AntDesign name="lock" size={20} color="#fff" />
              </View>
            </View>

            <Pressable
              style={styles.signinBtn}
              onPress={() => this.props.navigation.navigate('AddPortfolioScreen')}>
              <Text style={styles.signinText}>Sign Up</Text>
            </Pressable>

            <Text style={styles.signupAcnt}>
              Already have an account?{' '}
              <Text
                style={styles.signupText}
                onPress={() => this.props.navigation.navigate('ProfileScreen')}
                >
                Please Sign In
              </Text>
            </Text>
          </View>
          {/* </ImageBackground> */}
        </View>
      </SafeAreaView>
    );
  }
}

export default SignUpScreen;
