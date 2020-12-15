import {createStackNavigator} from 'react-navigation-stack';

import ProfileScreen from '../screens/AuthNav/Profile';

export const AuthStackNav = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'ProfileScreen',
  },
);
