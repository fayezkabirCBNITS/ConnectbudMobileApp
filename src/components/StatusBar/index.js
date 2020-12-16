import React, {Component} from 'react';
import {StatusBar} from 'react-native';

class CommonStatusBar extends Component {
  render() {
    return (
      <StatusBar
        backgroundColor="#71b85f"
        barStyle="light-content"
        hidden={false}
        translucent={false}
      />
    );
  }
}

export default CommonStatusBar;
