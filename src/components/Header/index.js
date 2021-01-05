import React, {Component} from 'react';

import {Text, View, Image, TouchableOpacity, StatusBar} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';
import {withNavigation} from 'react-navigation';

import {connect} from 'react-redux';
import base64 from 'base-64';

import axios from 'axios';
import {API_URL} from '../../config/url';

class AppHeader extends Component {
  constructor() {
    super();
    this.state = {
      notiStatus: [],
    };
  }
  componentDidMount = async () => {
    const {userDeatailResponse} = this.props;

    let body = new FormData();
    body.append('user_id', base64.decode(userDeatailResponse.userData.user_id));

    await axios({
      url: API_URL + 'notificationStatus',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        this.setState({
          notiStatus: response.data[0].read_status,
        });
        console.log(this.state.notiStatus);
        this.setState({isLoading: false});
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
  };
  render() {
    return (
      <View style={styles.header}>
        <StatusBar
          backgroundColor="#71b85f"
          barStyle="light-content"
          hidden={false}
          translucent={false}
        />
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <Entypo name="menu" color="#71b85f" size={35} />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.image}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('NotificationScreen')}>
          {this.state.notiStatus === 'true' ? (
            <></>
          ) : (
            <View style={styles.online} />
          )}
          <Feather name="bell" color="#71b85f" size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

// export default withNavigation(AppHeader);

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
  };
};
export default connect(mapStateToProps, null)(withNavigation(AppHeader));
