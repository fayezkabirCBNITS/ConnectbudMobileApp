import {createStackNavigator} from 'react-navigation-stack';

import ProfileScreen from '../screens/AuthNav/Profile';
import CategoryScreen from "./../screens/AuthNav/Category"
import AddSkillScreen from "./../screens/AuthNav/AddSkill"

export const AuthStackNav = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
    },
    CategoryScreen: {
      screen: CategoryScreen,
    },
    AddSkillScreen: {
      screen: AddSkillScreen,
    },
  },
  {
    initialRouteName: 'CategoryScreen',
  },
);
