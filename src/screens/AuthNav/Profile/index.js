import React, {Component} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

class ProfileScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  /**
   * Reset Navigation stack with a new route
   */
  resetStack = (routeName = 'AuthStackNav') => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName,
          }),
        ],
      }),
    );
  };

  render() {
    return <Text>Profile screen</Text>;
  }
}

export default ProfileScreen;
