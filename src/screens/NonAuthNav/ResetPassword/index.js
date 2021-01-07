import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import StatusBar from '../../../components/StatusBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header} from 'react-navigation-stack';

class ResetPassword extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar />
          {/* header section */}
          <View style={styles.back}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.goBack()}>
              <AntDesign name="arrowleft" color="#000" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}
          <View style={CommonStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <KeyboardAvoidingView
                keyboardVerticalOffset={Header.HEIGHT + 90}
                style={{flex: 1}}
                behavior="padding">
                <Text style={styles.hdngText}>Reset Password</Text>                
                <View style={[styles.inputField, styles.marTop]}>
                  <Text style={styles.label}>New Password</Text>
                  <TextInput placeholder="Enter New Password" style={styles.input} />
                </View>
                <View style={[styles.inputField, styles.marBtm]}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput placeholder="Enter Confirm Password" style={styles.input} />
                </View>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    this.props.navigation.navigate('')
                  }>
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default ResetPassword;
