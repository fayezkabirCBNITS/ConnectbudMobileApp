import {createStackNavigator} from 'react-navigation-stack';

import SignUpScreen from '../screens/NonAuthNav/SignUp';
import SignInScreen from '../screens/NonAuthNav/SignIn';

export const NonAuthStackNav = createStackNavigator(
  {
    SigninScreen: {
      screen: SignInScreen,
    },
    SignupScreen: {
          screen: SignUpScreen,
    },
  },
  {
    initialRouteName: 'SigninScreen',
  },
);
