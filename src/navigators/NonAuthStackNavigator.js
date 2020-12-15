import {createStackNavigator} from 'react-navigation-stack';

import SignUpScreen from '../screens/NonAuthNav/SignUp';

export const NonAuthStackNav = createStackNavigator(
  {
    SignupScreen: {
      screen: SignUpScreen,
    },
  },
  {
    initialRouteName: 'SignupScreen',
  },
);
