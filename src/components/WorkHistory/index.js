import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View>
        <Text>Work History</Text>
      </View>
    );
  }
}

export default Portfolio;
