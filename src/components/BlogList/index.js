import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import styles from './styles';
import CommonStyles from '../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';

class BlogListScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <TouchableOpacity style={styles.main}>
        <View style={styles.imgSec}>
          <Image
            source={require('../../assets/images/bnr.jpg')}
            style={CommonStyles.image}
          />
        </View>
        <View style={styles.bottomSec}>
          <Text style={styles.cnctBud}>By ConnectBud</Text>
          <Text style={styles.headlines}>
            Why we should introduce our kids with Robotics Technology
          </Text>
          <Text style={styles.date}>15.12.2020</Text>

          <View style={styles.socialIcon}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.facebook.com/ConnectBud/')
              }>
              <Entypo name="facebook-with-circle" color="#71b85f" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://twitter.com/ConnectBud')}>
              <Entypo name="twitter-with-circle" color="#71b85f" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.linkedin.com/company/connectbud/')
              }>
              <Entypo name="linkedin-with-circle" color="#71b85f" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.instagram.com/connectbud_edu/')
              }>
              <Entypo name="instagram-with-circle" color="#71b85f" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.youtube.com/c/connectbud')
              }>
              <Entypo name="youtube-with-circle" color="#71b85f" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default BlogListScreen;
