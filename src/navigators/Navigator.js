import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreenAuth from '../screens/AuthNav/Home';
import ProfileScreen from '../screens/AuthNav/Profile';
import CategoryScreen from './../screens/AuthNav/Category';
import AddSkillScreen from './../screens/AuthNav/AddSkill';
import EditProfileScreen from '../screens/AuthNav/EditProfile';
import StudentInner from '../screens/AuthNav/StudentInner';
import EmployeeInner from '../screens/AuthNav/EmployeeInner';
import PostedProjectByEmployee from './../screens/AuthNav/PostedProjectByEmploy/index';
import Sidebar from '../components/Sidebar/index';
import ProjectDetailsFreelancer from './../screens/AuthNav/ProjectDetailsFreelancer';
import JobDetailsFreelancer from './../screens/AuthNav/JobDetailsFreelancer';
import TutorDetailsFreelancer from './../screens/AuthNav/TutorDetailsFreelancer';
import ProposalFromFreelancer from './../screens/AuthNav/ProposalFromFreelancer';
import ViewProfileScreen from '../screens/AuthNav/ViewProfile';
import AddPortfolioScreen from '../screens/AuthNav/AddPortfolioItem';
import EmployeeProfileScreen from '../screens/AuthNav/EmployeeProfile';
import EmployeeEditProfileScreen from '../screens/AuthNav/EmployeeEditProfile';
import AddExperienceScreen from '../screens/AuthNav/AddExperience';
import EditPostedProject from '../screens/AuthNav/EditPostedProject';
import SearchProjectStudents from '../screens/AuthNav/SearchProjectStudents';
import AssessmentQuestion from '../screens/AuthNav/AssessmentQuestion';
import AboutUs from '../screens/AuthNav/AboutUs';
import FAQsScreen from '../screens/AuthNav/FAQs';
import TermsOfServices from '../screens/AuthNav/TermsOfServices';
import PrivacyPolicy from '../screens/AuthNav/PrivacyPolicy';
import ContactUs from '../screens/AuthNav/ContactUs';
import ChatScreen from '../screens/AuthNav/Chat';
import ChatListScreen from '../screens/AuthNav/ChatList';
import NotificationScreen from '../screens/AuthNav/Notification';
import BankDetailScreen from '../screens/AuthNav/BankDetails';
import TransactionScreen from '../screens/AuthNav/Transactions';
import MyQuestionScreen from '../screens/AuthNav/MyQuestion';
import FreeContactScreen from '../screens/AuthNav/FreeContracts';
import EmpContactScreen from '../screens/AuthNav/EmpContracts';
import BlogScreen from '../screens/AuthNav/Blog';
import HireStudentsScreen from '../screens/AuthNav/HireStudent';
import CheckoutScreen from '../screens/AuthNav/CheckOut';
import HiringConfirmation from '../screens/AuthNav/HiringConfirmation';
import AddExperienceNew from '../screens/AuthNav/AddExperienceNew';
import JobListingScreen from '../screens/AuthNav/JobListing';
//non stack pages
import SignUpScreen from '../screens/NonAuthNav/SignUp';
import SignInScreen from '../screens/NonAuthNav/SignIn';
import FreelancerSignUpScreen from '../screens/NonAuthNav/FreelancerSignUp';
import HomeScreen from '../screens/NonAuthNav/Home';
import SplashScreen from '../screens/splash';
import ViewUserProfileScreen from '../screens/NonAuthNav/ViewUserProfile';
import PostProjectNA from '../screens/NonAuthNav/PostProjectNA';
import ProjectDetailsFreelancerNA from './../screens/NonAuthNav/ProjectDetailFreelancer';
import OnlineClassesNA from '../components/OnlinCodingClassesNA/onlineClassesNA';
import HomeWorkHelpNA from '../components/HomeWorkHelpNA/index';
//non stack pages

export const MainStack = createStackNavigator(
  {
    HomeScreenAuth: {
      screen: HomeScreenAuth,
    },
    ProfileScreen: {
      screen: ProfileScreen,
    },
    EmployeeInner: {
      screen: EmployeeInner,
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
      screen: StudentInner,
    },
    PostedProjectByEmployee: {
      screen: PostedProjectByEmployee,
    },
    ProjectDetailsFreelancer: {
      screen: ProjectDetailsFreelancer,
    },
    TutorDetailsFreelancer: {
      screen: TutorDetailsFreelancer,
    },
    JobDetailsFreelancer: {
      screen: JobDetailsFreelancer,
    },
    ProposalFromFreelancer: {
      screen: ProposalFromFreelancer,
    },
    ViewProfileScreen: {
      screen: ViewProfileScreen,
    },
    AddPortfolioScreen: {
      screen: AddPortfolioScreen,
    },
    EmployeeProfileScreen: {
      screen: EmployeeProfileScreen,
    },
    EmployeeEditProfileScreen: {
      screen: EmployeeEditProfileScreen,
    },
    AddExperienceScreen: {
      screen: AddExperienceScreen,
    },
    EditPostedProject: {
      screen: EditPostedProject,
    },
    SearchProjectStudents:{
      screen : SearchProjectStudents
    },
    AssessmentQuestion: {
      screen: AssessmentQuestion,
    },
    AboutUs: {
      screen: AboutUs,
    },
    FAQsScreen: {
      screen: FAQsScreen,
    },
    TermsOfServices: {
      screen: TermsOfServices,
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
    },
    ContactUs: {
      screen: ContactUs,
    },
    ChatScreen: {
      screen: ChatScreen,
    },
    ChatListScreen: {
      screen: ChatListScreen,
    },
    NotificationScreen: {
      screen: NotificationScreen,
    },
    BankDetailScreen: {
      screen: BankDetailScreen,
    },
    TransactionScreen: {
      screen: TransactionScreen,
    },
    MyQuestionScreen: {
      screen: MyQuestionScreen,
    },
    FreeContactScreen: {
      screen: FreeContactScreen,
    },
    EmpContactScreen: {
      screen: EmpContactScreen,
    },
    BlogScreen: {
      screen: BlogScreen,
    },
    HireStudentsScreen: {
      screen: HireStudentsScreen,
    },
    CheckoutScreen: {
      screen: CheckoutScreen
    },
    HiringConfirmation: {
      screen: HiringConfirmation
    }   ,
    AddExperienceNew: {
      screen : AddExperienceNew
    },
    JobListingScreen: {
      screen : JobListingScreen
    },
  },

  {
    initialRouteName: 'HomeScreenAuth',
  },
);

const AuthStackNav = createStackNavigator(
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
    OnlineClassesNA : {
      screen : OnlineClassesNA
    },
    HomeWorkHelpNA:{
      screen : HomeWorkHelpNA
    },

    ViewUserProfileScreen: {screen: ViewUserProfileScreen},
    ProjectDetailsFreelancerNA: {screen: ProjectDetailsFreelancerNA},
    PostProjectNA:{screen:PostProjectNA,},
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
    drawerWidth: '80%',
  },
);

const DrawerStackNonAuthNav = createDrawerNavigator(
  {
    AuthStackNav: AuthStackNav,
  },
  {
    contentComponent: (props) => <Sidebar {...props} />,
    drawerWidth: '80%',
  },
);

const LoadingStack = createStackNavigator(
  {
    Loading: SplashScreen,
  },
  {
    headerMode: null,
  },
);
const AppContainer = createSwitchNavigator(
  {
    Loading: LoadingStack,
    //Auth: AuthStackNav,
    Auth: DrawerStackNonAuthNav,
    Drawer: DrawerStackNav,
  },
  {
    initialRouteName: 'Loading',
  },
);
export default createAppContainer(AppContainer);
