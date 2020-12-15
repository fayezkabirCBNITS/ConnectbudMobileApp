import React, { Component } from 'react';
import { SafeAreaView, StatusBar, View, Text, TextInput, Pressable, ImageBackground, Image, TouchableOpacity } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './style';


class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar
            barStyle="default"
            hidden={false}
            backgroundColor="#009387"
          />
          <ImageBackground
            source={require('../../../assets/images/bnr.jpg')}
            style={styles.coverImage}
          >
            <View style={[CommonStyles.container, styles.inputDiv]}>
              <TextInput
                placeholder="Enter your username"
                style={styles.inputText}
                value={this.state.username}
                onChange={(e) => console.warn('userr')}
              />
              <TextInput
                placeholder="Enter your password"
                style={styles.inputText}
                secureTextEntry
                value={this.state.password}
                onChange={(e) => console.warn('passord')}
              />
              <Pressable
                style={styles.forgetDiv}
              >
                <Text style={styles.forgetText}>Forget Password?</Text>
              </Pressable>
              <Pressable
                style={styles.signinBtn}
              >
                <Text style={styles.signinText}>Sign In</Text>
              </Pressable>
              <View style={styles.iconDiv}>
                <Entypo name="facebook-with-circle" color="#71b85f" size={40}
                  style={styles.Icon}
                />
                <AntDesign name="google" color="#71b85f" size={40}
                  style={styles.Icon}
                />
                <MaterialIcons name="gmail" color="#71b85f" size={40}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.signupAcnt}>Don't have an account?{" "}
                <Text style={styles.signupText}
                  onPress={() => console.warn('press')}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

export default SignUpScreen;
