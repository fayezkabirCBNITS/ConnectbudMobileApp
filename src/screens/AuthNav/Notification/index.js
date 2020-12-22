import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';

class NotificationScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar />
          {/* header section */}
          <View style={CommonStyles.header}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              <TouchableOpacity style={styles.head}>
                <View style={styles.wrapper}>
                  <View style={styles.imgSec}>
                    <Image
                      source={require('../../../assets/images/profileImg.jpg')}
                      style={CommonStyles.image}
                    />
                  </View>
                  <Text style={styles.notiText}>
                    Priya Rani has sent you an invitation for Physics tutor
                    needed
                  </Text>
                </View>
                <Text style={styles.notiTime}>47 days ago</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default NotificationScreen;
