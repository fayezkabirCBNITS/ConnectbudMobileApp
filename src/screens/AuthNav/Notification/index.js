import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';

import axios from 'axios';
import {API_URL} from '../../../config/url';
import {connect} from 'react-redux';
import base64 from 'base-64';
import SyncStorage from 'sync-storage';

import Spinner from 'react-native-loading-spinner-overlay';

class NotificationScreen extends Component {
  constructor() {
    super();
    this.state = {
      notification: [],
      loginType: '',
      showLoader: false,
      status: ''
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    const {userDeatailResponse} = this.props;
    await this.setState({
      loginType: userDeatailResponse.userData.Flag,
      showLoader: true,
    });
    const body = {
      user_id: base64.decode(userDeatailResponse.userData.user_id),
    };
    axios.post(API_URL + 'getNotification', body).then(async (res) => {
      await this.setState({
        notification: res.data,
        showLoader: false,
        status: res.data[0].message
      });
    });
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <StatusBar />
          {/* header section */}
          <View style={CommonStyles.header}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#000" size={35} />
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
              {this.state.loginType === 'WQ==' ? (
                <>
                  {this.state.status !== "N" ? (this.state.notification.map((data, i) => (
                    <TouchableOpacity style={styles.head}>
                      <View style={styles.wrapper}>
                        <View style={styles.imgSec}>
                          <Image
                            source={{uri: data.notification_image}}
                            style={CommonStyles.image}
                          />
                        </View>
                        {data.notification_type === 'HIRE' ? (
                          <>
                            <Text
                              style={styles.notiText}
                              onPress={() =>
                                this.props.navigation.navigate(
                                  'HiringConfirmation',
                                  {
                                    job_id: data.project_id,
                                    receiver_id: data.sender_user_id,
                                    sender_id: data.receiver_user_id,
                                    name: data.sender_name,
                                    user_image: data.notification_image,
                                    user_type: this.state.loginType,
                                    room_id: data.room_id,
                                  },
                                  SyncStorage.set(
                                    'room_id',
                                    data.project_id + '_' + data.sender_user_id,
                                  ),
                                )
                              }>
                              {data.notification_message}
                            </Text>
                          </>
                        ) : (
                          <>
                            {data.type === 'job' ? (
                              <Text
                                style={styles.notiText}
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    'ChatListScreen',
                                    {
                                      job_id: data.job_id,
                                      receiver_id: data.sender_user_id,
                                      sender_id: data.receiver_user_id,
                                      name: data.sender_name,
                                      user_image: data.notification_image,
                                      user_type: this.state.loginType,
                                      room_id: data.room_id,
                                      page_status: 'joblist',
                                      token: data.Token,
                                    },
                                    SyncStorage.set(
                                      'room_id',
                                      data.project_id +
                                        '_' +
                                        data.sender_user_id,
                                    ),
                                  )
                                }>
                                {data.notification_message}
                              </Text>
                            ) : (
                              <Text
                                style={styles.notiText}
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    'ChatListScreen',
                                    {
                                      job_id: data.project_id,
                                      receiver_id: data.sender_user_id,
                                      sender_id: data.receiver_user_id,
                                      name: data.sender_name,
                                      user_image: data.notification_image,
                                      user_type: this.state.loginType,
                                      room_id: data.room_id,
                                      page_status: 'projectlist',
                                      token: data.Token,
                                    },
                                    SyncStorage.set(
                                      'room_id',
                                      data.project_id +
                                        '_' +
                                        data.sender_user_id,
                                    ),
                                  )
                                }>
                                {data.notification_message}
                              </Text>
                            )}
                          </>
                        )}
                      </View>
                      <Text style={styles.notiTime}>
                        {data.notification_time}
                      </Text>
                    </TouchableOpacity>
                  ))) : 
                  <View style={styles.noChat}>
                  <Image source={require('../../../assets/images/noti.png')} />
                  <Text style={styles.userChat2}>No Notification</Text>
                </View>
                }
                </>
              ) : (
                <>
                  {this.state.status !== "N" ? (this.state.notification.map((data, i) => (
                    <TouchableOpacity style={styles.head}>
                      <View style={styles.wrapper}>
                        <View style={styles.imgSec}>
                          <Image
                            source={{uri: data.notification_image}}
                            style={CommonStyles.image}
                          />
                        </View>
                        {data.type === 'job' ? (
                          <Text
                            style={styles.notiText}
                            onPress={() =>
                              this.props.navigation.navigate(
                                'ChatListScreen',
                                {
                                  job_id: data.job_id,
                                  receiver_id: data.sender_user_id,
                                  sender_id: data.receiver_user_id,
                                  name: data.sender_name,
                                  user_image: data.notification_image,
                                  user_type: this.state.loginType,
                                  room_id: data.room_id,
                                  page_status: 'joblist',
                                  token: data.Token,
                                },
                                SyncStorage.set(
                                  'room_id',
                                  data.project_id + '_' + data.sender_user_id,
                                ),
                              )
                            }>
                            {data.notification_message}
                          </Text>
                        ) : (
                          <Text
                            style={styles.notiText}
                            onPress={() =>
                              this.props.navigation.navigate(
                                'ChatListScreen',
                                {
                                  job_id: data.project_id,
                                  receiver_id: data.sender_user_id,
                                  sender_id: data.receiver_user_id,
                                  name: data.sender_name,
                                  user_image: data.notification_image,
                                  user_type: this.state.loginType,
                                  room_id: data.room_id,
                                  page_status: 'projectlist',
                                  token: data.Token,
                                },
                                SyncStorage.set(
                                  'room_id',
                                  data.project_id + '_' + data.sender_user_id,
                                ),
                              )
                            }>
                            {data.notification_message}
                          </Text>
                        )}
                      </View>
                      <Text style={styles.notiTime}>
                        {data.notification_time}
                      </Text>
                    </TouchableOpacity>
                  ))):
                  <View style={styles.noChat}>
                  <Image source={require('../../../assets/images/noti.png')} />
                  <Text style={styles.userChat2}>No Notification</Text>
                </View>
                }
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// export default NotificationScreen;

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    //storeAccessToken: (token) => dispatch(storeAccessToken(token)),
    //updateUserStatus: (status) => dispatch(updateUserStatus(status)),
    // updateJobId: (data) => dispatch(updateJobId(data)),
    //updateUserPaymentMethod: (data) => dispatch(updateUserPaymentMethod(data)),
  };
};

export default connect(mapStateToProps, null)(NotificationScreen);
