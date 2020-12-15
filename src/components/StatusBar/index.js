import React, {Component} from 'react';
import {StatusBar} from 'react-native';

class CommonStatusBar extends Component {
  render() {
    return (
      <StatusBar
        backgroundColor="#60a84e"
        barStyle="light-content"
        hidden={false}
        translucent={false}
      />
    );
  }
}

export default CommonStatusBar;
