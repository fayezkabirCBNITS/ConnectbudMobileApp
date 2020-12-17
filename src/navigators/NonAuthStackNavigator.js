import {createStackNavigator} from 'react-navigation-stack';

import SignUpScreen from '../screens/NonAuthNav/SignUp';
import SignInScreen from '../screens/NonAuthNav/SignIn';
import FreelancerSignUpScreen from '../screens/NonAuthNav/FreelancerSignUp';

export const NonAuthStackNav = createStackNavigator(
  {
    SignInScreen: {
      screen: SignInScreen,
    },
    SignUpScreen: {
          screen: SignUpScreen,
    },
    FreelancerSignUpScreen:{
      screen:FreelancerSignUpScreen,
    },
  },
  {
    initialRouteName: 'SignInScreen',
  },
);
