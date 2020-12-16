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
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './singInstyle';

class SignInScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  handleChange = (e) => {
    this.setState({
      username: e.target.value,
      password: e.target.value,
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
              <Image
                source={require('../../../assets/images/logoWhite.png')}
                style={CommonStyles.splashImg}
              />
            </View>
            <View style={styles.formGroup1}>
              <View style={styles.formSubGroup2}>
                <TextInput
                  returnKeyType="done"
                  placeholder="Type Name"
                  style={styles.inputGroup}
                  keyboardType="default"
                  value={this.state.username}
                  onChange={(e) => this.handleChange(e)}
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
                  placeholder="Type Password"
                  style={styles.inputGroup}
                  keyboardType="default"
                  secureTextEntry
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </View>
              <View style={styles.formSubGroup1}>
                <AntDesign name="lock" size={20} color="#fff" />
              </View>
            </View>

                        <Pressable style={styles.forgetDiv}>
                            <Text style={styles.forgetText}>Forget Password?</Text>
                        </Pressable>
                        <Pressable
                            style={styles.signinBtn}
                        >
                            <Text style={styles.signinText}
                                onPress={() => this.props.navigation.navigate('ProfileScreen')}
                                >Sign In</Text>
                        </Pressable>
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
