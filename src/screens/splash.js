import React, {Component} from 'react';
import {SafeAreaView, ImageBackground, StatusBar, Text} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

class SplashScreen extends Component {
  componentDidMount() {
    console.log('123456 :>> ', 123456);
    // setTimeout(() => {
    //   this.resetStack();
    // }, 3000);
  }

  /**
   * Reset Navigation stack with a new route
   */
  resetStack = (routeName = 'NonAuthStackNav') => {
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
    return (
      <SafeAreaView >
        <Text>Welcome to Connectbud</Text>
      </SafeAreaView>
    );
  }
}

export default SplashScreen;
