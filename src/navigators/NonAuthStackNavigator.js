import { createStackNavigator } from 'react-navigation-stack';

import SignUpScreen from '../screens/NonAuthNav/SignUp';
import SignInScreen from '../screens/NonAuthNav/SignIn';
import FreelancerSignUpScreen from '../screens/NonAuthNav/FreelancerSignUp';
import HomeScreen from '../screens/NonAuthNav/Home';

export const NonAuthStackNav = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    },
    SignInScreen: {
      screen: SignInScreen,
    },
    SignUpScreen: {
      screen: SignUpScreen,
    },
    FreelancerSignUpScreen: {
      screen: FreelancerSignUpScreen,
    },
  },
  {
    initialRouteName: 'HomeScreen',
  },
);
