import { createStackNavigator } from 'react-navigation-stack';

import SignUpScreen from '../screens/NonAuthNav/SignUp';
import SignInScreen from '../screens/NonAuthNav/SignIn';
import FreelancerSignUpScreen from '../screens/NonAuthNav/FreelancerSignUp';
import HomeScreen from '../screens/NonAuthNav/Home';
import CategoryScreen from '../screens/NonAuthNav/Category';
import AddSkillScreen from '../screens/NonAuthNav/AddSkill';
// import StudentInner from '../screens/AuthNav/StudentInner';
// import EmployeeInner from '../screens/AuthNav/EmployeeInner';
export const NonAuthStackNav = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
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
    CategoryScreen: {
      screen: CategoryScreen,
    },
    AddSkillScreen: {
      screen: AddSkillScreen,
    },
    // EmployeeInner: {
    //   screen: EmployeeInner,
    // },
    // StudentInner: {
    //   screen: StudentInner,
    // },
  },
  {
    initialRouteName: 'HomeScreen',
  },
);
