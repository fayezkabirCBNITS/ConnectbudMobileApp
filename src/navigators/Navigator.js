import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
//import HomeScreen from '../screens/AuthNav/Home';
import ProfileScreen from '../screens/AuthNav/Profile';
import CategoryScreen from "./../screens/AuthNav/Category"
import AddSkillScreen from "./../screens/AuthNav/AddSkill"
import EditProfileScreen from '../screens/AuthNav/EditProfile';
import StudentInner from '../screens/AuthNav/StudentInner';
import EmployeeInner from '../screens/AuthNav/EmployeeInner';
import PostedProjectByEmployee from "./../screens/AuthNav/PostedProjectByEmploy/index";
import Sidebar from '../components/Sidebar/index';
import ProjectDetailsFreelancer from "./../screens/AuthNav/ProjectDetailsFreelancer";
import JobDetailsFreelancer from "./../screens/AuthNav/JobDetailsFreelancer";
import TutorDetailsFreelancer from "./../screens/AuthNav/TutorDetailsFreelancer";

import ProposalFromFreelancer from "./../screens/AuthNav/ProposalFromFreelancer"
import ViewProfileScreen from '../screens/AuthNav/ViewProfile';
import AddPortfolioScreen from "../screens/AuthNav/AddPortfolioItem";
import EmployeeProfileScreen from '../screens/AuthNav/EmployeeProfile'
import AddExperienceScreen from '../screens/AuthNav/AddExperience';
// import InnerChatting from "./../screens/AuthNav/chats/chattingInner";
import EditPostedProject from '../screens/AuthNav/EditPostedProject';
import PostedProjectDetails from '../screens/AuthNav/PostedProjectDetails';
import AssessmentQuestion from '../screens/AuthNav/AssessmentQuestion';

import SignUpScreen from '../screens/NonAuthNav/SignUp';
import SignInScreen from '../screens/NonAuthNav/SignIn';
import FreelancerSignUpScreen from '../screens/NonAuthNav/FreelancerSignUp';
import HomeScreen from '../screens/NonAuthNav/Home';
import SplashScreen from '../screens/splash';


export const MainStack = createStackNavigator(
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
    ProjectDetailsFreelancer : {
      screen : ProjectDetailsFreelancer
    },
    TutorDetailsFreelancer : {
      screen : TutorDetailsFreelancer
    },
    JobDetailsFreelancer : {
      screen : JobDetailsFreelancer
    },
    ProposalFromFreelancer : {
      screen : ProposalFromFreelancer
    },
    ViewProfileScreen: {
      screen: ViewProfileScreen
    },
    AddPortfolioScreen :{
      screen : AddPortfolioScreen
    },

    EmployeeProfileScreen : {
      screen: EmployeeProfileScreen
    },
    AddExperienceScreen:{
      screen:AddExperienceScreen
    },
    // InnerChatting:{
    //   screen:InnerChatting
    // },
    EditPostedProject:{
      screen: EditPostedProject
    },
    PostedProjectDetails:{
      screen : PostedProjectDetails
    },
    AssessmentQuestion:{
      screen : AssessmentQuestion
    },
  },
  {
    initialRouteName: 'CategoryScreen',
  }
);

const AuthStackNav = createStackNavigator(
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
      FreelancerSignUpScreen:{
        screen:FreelancerSignUpScreen,
      },
    },
    {
      initialRouteName: 'HomeScreen',
    },
  );
const DrawerStackNav = createDrawerNavigator(
  {
    MainStack: MainStack,
  },
  {
    contentComponent: (props) => <Sidebar {...props} />,
  },
);

const LoadingStack = createStackNavigator(
    {
        Loading:SplashScreen
    },{
        headerMode:null
    }
)
const AppContainer = createSwitchNavigator(
    {
        Loading:LoadingStack,
        Auth:AuthStackNav,
        Drawer:DrawerStackNav,
    },{
        initialRouteName:"Loading",
    }
)
export default createAppContainer(AppContainer);