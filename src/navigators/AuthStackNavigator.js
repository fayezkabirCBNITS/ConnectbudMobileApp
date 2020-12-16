import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/AuthNav/Home';
import ProfileScreen from '../screens/AuthNav/Profile';
import CategoryScreen from "./../screens/AuthNav/Category"
import AddSkillScreen from "./../screens/AuthNav/AddSkill"
import EditProfileScreen from '../screens/AuthNav/EditProfile';
import StudentInner from '../screens/AuthNav/StudentInner';
import EmployeeInner from '../screens/AuthNav/EmployeeInner';

export const AuthStackNav = createStackNavigator(
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
    }
  },
  {
    initialRouteName: 'CategoryScreen',
  }
)
