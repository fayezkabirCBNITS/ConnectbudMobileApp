import React, { Component } from 'react';
import { View, Image, StatusBar, Linking, Platform } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import CommonStyles from '../../CommonStyles';
import { deepClone } from '../services/helper-methods';
import { connect } from 'react-redux';
import { changeAppOpenStatus } from '../redux/actions/user-data';
import base64 from "base-64";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deepLinking: false,
      userID: ""
    };

  }

  handleOpenURL(event) {
    console.log('url============', event.url);
    //https://dev.connectbud.com/maintag?MjU5Ng==
    //const route = e.url.replace(/.*?:\/\//g, '');
    // do something with the url, in our case navigate(route)
  }

  async componentDidMount() {

    if (Platform.OS === 'android') {
      await Linking.getInitialURL().then((url) => {
        if (url) {
          let id = url.split("?")[1];
          this.setState({ deepLinking: true, userID: base64.decode(id) });
        }
      });
    }

    if (this.state.deepLinking === false) {
      const { userData } = deepClone(this.props);
      setTimeout(() => {
        if (userData && userData?.Token && userData?.Token.length) {
          //this.rese;
          console.log('open false :===============',userData);

          console.log('open false :>> ');
          this.props.changeAppOpenStatus(false);
          {
            userData?.Flag === 'WQ=='
              ? this.props.navigation.navigate('StudentInner')
              : userData?.Flag === 'Rg=='
                ? this.props.navigation.navigate('EmployeeInner')
                : null;
          }
        } else {
          this.props.changeAppOpenStatus(true);
          console.log('open true :>> ');
          this.props.navigation.navigate('HomeScreen')
          // this.resetStack();
        }
      }, 3000);
    } else {
      this.props.navigation.navigate('CategoryScreen', {userID : this.state.userID});
    }
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
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
      <View style={CommonStyles.splash}>
        <StatusBar
          backgroundColor="#71b85f"
          barStyle="light-content"
          hidden={false}
          translucent={false}
        />
        <Image
          source={require('../assets/images/logoWhite.png')}
          style={CommonStyles.splashImg}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAppOpenStatus: (status) => dispatch(changeAppOpenStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
