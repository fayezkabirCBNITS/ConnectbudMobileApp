import React, {Component} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import CommonStyles from '../../CommonStyles';

class SplashScreen extends Component {
  componentDidMount() {
    console.log('123456 :>> ', 123456);
    setTimeout(() => {
      this.resetStack();
    }, 1000);
  }

  /**
   * Reset Navigation stack with a new route
   */
  //NonAuthStackNav
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
    return (
      <View style={CommonStyles.splash}>
        <StatusBar
          backgroundColor="#0000"
          barStyle="loght-content"
          hidden={false}
          translucent={true}
        />
        <Image
          source={require('../assets/images/logoWhite.png')}
          style={CommonStyles.splashImg}
        />
      </View>
    );
  }
}

export default SplashScreen;
