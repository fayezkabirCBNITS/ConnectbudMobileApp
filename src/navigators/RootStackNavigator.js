import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from '../screens/splash';
import {AuthStackNav} from './AuthStackNavigator';
import {NonAuthStackNav} from './NonAuthStackNavigator';

export default RootStackNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: ({navigation}) => {
        return {
          headerShown: false,
        };
      },
    },
    NonAuthStackNav: {
      screen: NonAuthStackNav,
      navigationOptions: ({navigation}) => {
        return {
          headerShown: false,
        };
      },
    },
    AuthStackNav: {
      screen: AuthStackNav,
      navigationOptions: ({navigation}) => {
        return {
          headerShown: false,
        };
      },
    },
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: null,
  },
);
