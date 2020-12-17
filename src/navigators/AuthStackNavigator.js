import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from '../screens/AuthNav/Home';
import ProfileScreen from '../screens/AuthNav/Profile';
import CategoryScreen from "./../screens/AuthNav/Category"
import AddSkillScreen from "./../screens/AuthNav/AddSkill"
import EditProfileScreen from '../screens/AuthNav/EditProfile';
import StudentInner from '../screens/AuthNav/StudentInner';
import EmployeeInner from '../screens/AuthNav/EmployeeInner';
import PostedProjectByEmployee from "./../screens/AuthNav/PostedProjectByEmploy/index";
import Sidebar from '../components/Sidebar/index';
import AddExperienceScreen from '../screens/AuthNav/AddExperience';

export const MainStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    },
    ProfileScreen: {
      screen: ProfileScreen,
    },
    CategoryScreen: {
      screen: CategoryScreen,
    },
    AddSkillScreen: {
      screen: AddSkillScreen,
    },
    EditProfileScreen: {
      screen: EditProfileScreen,
    },
    StudentInner: {
      screen: StudentInner
    },
    EmployeeInner: {
      screen: EmployeeInner
    },
    PostedProjectByEmployee : {
      screen:PostedProjectByEmployee
    },
    AddExperienceScreen:{
      screen:AddExperienceScreen
    },

  },
  {
    initialRouteName: 'HomeScreen',
  }
);
export const AuthStackNav = createDrawerNavigator(
  {
    MainStack: MainStack,
  },
  {
    contentComponent: (props) => <Sidebar {...props} />,
  },
);