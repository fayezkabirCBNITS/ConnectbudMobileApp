import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import CommonStyles from '../../../CommonStyles';

export default class ErrorMsg extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View style={CommonStyles.errorMsg}>
        <Text
          style={CommonStyles.errorMsgText}>
          {this.props.errorMsg}
        </Text>
      </View>
    );
  }
}
