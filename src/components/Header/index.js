import React, {Component} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import style from './../../../CommonStyles';
import styles from './style';

class AppHeader extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#e30021"
          translucent
        />
        <ImageBackground
          source={require('./../../assets/images/headerbg.png')}
          style={style.toptabs}>
          <View style={[style.tabstop, style.rowjustify]}>
            <TouchableOpacity
              style={style.cattabs}
              onPress={() => this.props.navigation.navigate('DashboardScreen')}>
              <Image
                source={require('./../../assets/images/him.png')}
                style={style.tabimg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.cattabs}
              onPress={() =>
                this.props.navigation.navigate('SubscriptionScreen')
              }>
              <Image
                source={require('./../../assets/images/people.png')}
                style={style.tabimg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.cattabs}
              onPress={() =>
                this.props.navigation.navigate('ConnectionScreen')
              }>
              <Image
                source={require('./../../assets/images/chat.png')}
                style={style.tabimg}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={style.cattabs}
              onPress={() => this.props.navigation.navigate('SettingsScreen')}>
              <Image
                source={require('./../../assets/images/filter.png')}
                style={style.tabimg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.cattabs}
              onPress={() => this.props.navigation.navigate('ProfileScreen')}>
              <Image
                source={require('./../../assets/images/user.png')}
                style={style.tabimg}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default AppHeader;
