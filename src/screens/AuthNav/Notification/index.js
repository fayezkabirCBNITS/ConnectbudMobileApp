import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';

import axios from 'axios';
import {API_URL} from '../../../config/url';

class NotificationScreen extends Component {
  constructor() {
    super();
    this.state = {
      notification: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    const body = {
      user_id: '2489',
    };
    axios.post(API_URL + 'getNotification', body).then(async (res) => {
      console.log(res);
      await this.setState({
        notification: res.data,
      });
    });
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
              {this.state.notification.map((data, i) => (
                <TouchableOpacity style={styles.head}>
                  <View style={styles.wrapper}>
                    <View style={styles.imgSec}>
                      <Image
                        source={{uri: data.notification_image}}
                        style={CommonStyles.image}
                      />
                    </View>
                    <Text
                      style={styles.notiText}
                      onPress={() =>
                        this.props.navigation.navigate('ChatScreen')
                      }>
                      {data.notification_message}
                    </Text>
                  </View>
                  <Text style={styles.notiTime}>{data.notification_time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default NotificationScreen;
