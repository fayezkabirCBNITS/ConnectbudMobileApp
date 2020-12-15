import {createStackNavigator} from 'react-navigation-stack';

import ProfileScreen from '../screens/AuthNav/Profile';
import EditProfileScreen from '../screens/AuthNav/EditProfile';

export const AuthStackNav = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
    },  
    EditProfileScreen:EditProfileScreen,

  },
  {
    initialRouteName: 'EditProfileScreen',
  },
);
