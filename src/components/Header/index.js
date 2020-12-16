import React, {Component} from 'react';

import {Text, View, Image, TouchableOpacity} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';

class AppHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity>
          <Entypo name="menu" color="#71b85f" size={35} />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.image}
        />
        <TouchableOpacity>
          <Feather name="bell" color="#71b85f" size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default AppHeader;
