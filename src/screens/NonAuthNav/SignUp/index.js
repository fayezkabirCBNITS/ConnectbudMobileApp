import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';

class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <Text>Signup Screen</Text>
        </View>
      </View>
    );
  }
}

export default SignUpScreen;
