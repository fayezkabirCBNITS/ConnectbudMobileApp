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
import ProjectDetailsFreelancer from "./../screens/AuthNav/ProjectDetailsFreelancer";
import JobDetailsFreelancer from "./../screens/AuthNav/JobDetailsFreelancer";
import TutorDetailsFreelancer from "./../screens/AuthNav/TutorDetailsFreelancer";

import ProposalFromFreelancer from "./../screens/AuthNav/ProposalFromFreelancer"
import ViewProfileScreen from '../screens/AuthNav/ViewProfile';
import AddPortfolioScreen from "../screens/AuthNav/AddPortfolioItem";
import EmployeeProfileScreen from '../screens/AuthNav/EmployeeProfile'
import AddExperienceScreen from '../screens/AuthNav/AddExperience';
import EditPostedProject from '../screens/AuthNav/EditPostedProject';
import PostedProjectDetails from '../screens/AuthNav/PostedProjectDetails';
import AssessmentQuestion from '../screens/AuthNav/AssessmentQuestion';
import AboutUs from '../screens/AuthNav/AboutUs';
import FAQs from '../screens/AuthNav/FAQs';
import TermsOfServices from '../screens/AuthNav/TermsOfServices';
import PrivacyPolicy from '../screens/AuthNav/PrivacyPolicy';
import ContactUs from '../screens/AuthNav/ContactUs'
import ChatScreen from '../screens/AuthNav/Chat';
import ChatListScreen  from '../screens/AuthNav/ChatList';
import NotificationScreen from '../screens/AuthNav/Notification';
import BankDetailScreen from '../screens/AuthNav/BankDetails';
import TransactionScreen from '../screens/AuthNav/Transactions';
import MyQuestionScreen from '../screens/AuthNav/MyQuestion';
import FreeContactScreen from '../screens/AuthNav/FreeContracts';
import EmpContactScreen from '../screens/AuthNav/EmpContracts';
import BlogScreen from '../screens/AuthNav/Blog';
import HireStudentsScreen from '../screens/AuthNav/HireStudent';


export const MainStack = createStackNavigator(
  {
    // HomeScreen: {
    //   screen: HomeScreen
    // },
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
    EditPostedProject:{
      screen: EditPostedProject
    },
    PostedProjectDetails:{
      screen : PostedProjectDetails
    },
    AssessmentQuestion:{
      screen : AssessmentQuestion
    },
    AboutUs:{
      screen : AboutUs
    },
    FAQs:{
      screen : FAQs
    },
    TermsOfServices:{
      screen : TermsOfServices
    },
    PrivacyPolicy:{
      screen : PrivacyPolicy
    },
    ContactUs : {
      screen : ContactUs
    },
    ChatScreen: {
      screen : ChatScreen
    },
    ChatListScreen: {
      screen : ChatListScreen
    },
    NotificationScreen: {
      screen : NotificationScreen
    },
    BankDetailScreen: {
      screen : BankDetailScreen
    },
    TransactionScreen: {
      screen : TransactionScreen
    },
    MyQuestionScreen: {
      screen : MyQuestionScreen
    },
    FreeContactScreen: {
      screen : FreeContactScreen
    },
    EmpContactScreen: {
      screen: EmpContactScreen
    },
    BlogScreen: {
      screen: BlogScreen
    },
    HireStudentsScreen: {
      screen: HireStudentsScreen
    },
  },
  {
    initialRouteName: 'CategoryScreen',
  }
);
export const AuthStackNav = createDrawerNavigator(
  {
    MainStack: MainStack,
  },
  {
    contentComponent: (props) => <Sidebar {...props} />,
    drawerWidth: "80%",
  },
);