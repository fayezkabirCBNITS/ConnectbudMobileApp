import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <ImageBackground
            source={require('../../../assets/images/bnr.jpg')}
            style={styles.coverImage}>
            <TouchableOpacity style={CommonStyles.hanPosition}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <View style={styles.userImg}>
              <Image
                source={require('../../../assets/images/userPro.jpg')}
                style={CommonStyles.image}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default ProfileScreen;
