import React, {Component} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import CommonStyles from '../../CommonStyles';
import {deepClone} from '../services/helper-methods';
import {connect} from 'react-redux';
import {changeAppOpenStatus} from '../redux/actions/user-data';
class SplashScreen extends Component {
  async componentDidMount() {
    console.log('123456 :>> ', 123456);
    const {userData} = deepClone(this.props);
    console.log('props data=============== :>> ', this.props);

    setTimeout(() => {
      if (userData && userData?.Token && userData?.Token.length) {
        //this.rese;
        console.log('open false :>> ');
        this.props.changeAppOpenStatus(false);
        //this.resetStack('AuthStackNav');
        {
          userData?.Flag === 'WQ=='
            ? this.props.navigation.navigate('StudentInner')
            : userData?.Flag === 'Rg=='
            ? this.props.navigation.navigate('EmployeeInner')
            : null;
        }
      }
      else {
        this.props.changeAppOpenStatus(true);
        console.log('open true :>> ');

        this.resetStack();
      }
    }, 3000);
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
