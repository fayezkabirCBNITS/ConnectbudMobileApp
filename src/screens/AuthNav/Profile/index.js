import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Overview from '../../../components/Overview';
import Portfolio from '../../../components/Portfolio';
import WorkHistory from '../../../components/WorkHistory';
import axios from 'axios';
import { API_URL } from "../../../config/url";
import { BASE_URL } from "../../../config/ApiUrl"
// import { makeGetRequest } from '../../../services/http-connectors';
import ApiUrl from '../../../config/ApiUrl';
import { makeGetRequest } from '../../../services/http-connectors';
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import base64 from 'base-64';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: 'Overview'},
        {key: 'second', title: 'Portfolio'},
        {key: 'third', title: 'Work History'},
      ],
      profiledataset: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      axios({
        url: `${BASE_URL}expertProfile/${base64.decode(this.props.userDeatailResponse.slug)}`,
        method: "GET",
      })
        .then((response) => {
          console.log(response, "profile responseee")
          this.setState({
            profiledataset: response.data,
          });
        })
        .catch(() => { });
    });
  };
  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {this.state.profiledataset.map((item, i) => (
              <ImageBackground key={i}
                source={{ uri: item.cover_image }}
                style={styles.coverImage}>
                <TouchableOpacity
                  style={CommonStyles.hanPosition}
                  onPress={() => this.props.navigation.openDrawer()}>
                  <Entypo name="menu" color="#71b85f" size={35} />
                </TouchableOpacity>
                <View style={styles.userImg}>
                  <Image
                    // source={require(item.user_image ? `${item.user_image}` : '../../../assets/images/userPro.jpg')}
                    source={{ uri: item.user_image }}
                    style={CommonStyles.usrImage}
                  />
                  <TouchableOpacity style={CommonStyles.userPhoto}>
                    <FontAwesome name="camera" color="#71b85f" size={22} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.camPosition}>
                  <FontAwesome name="camera" color="#71b85f" size={22} />
                </TouchableOpacity>
              </ImageBackground>
            ))}
            {this.state.profiledataset.map((item, i) => (
              <ScrollView
                style={{flexDirection: 'row', marginTop: -70}}
                showsHorizontalScrollIndicator={false}
                key={i}
                horizontal>
                <View style={styles.details}>
                  <Text style={styles.userInfoHead}>Name</Text>
                  <Text style={styles.userInfoDetails}>
                    {item.first_name} {item.last_name}
                  </Text>
                </View>

                <View style={styles.details}>
                  <Text style={styles.userInfoHead}>College</Text>
                  <Text style={styles.userInfoDetails}>{item.college}</Text>
                </View>

                <View style={styles.details}>
                  <Text style={styles.userInfoHead}>Department</Text>
                  <Text style={styles.userInfoDetails}>{item.department}</Text>
                </View>
              </ScrollView>
            ))}

            <View style={styles.tabSec}>
              <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                  first: Overview,
                  second: Portfolio,
                  third: WorkHistory,
                })}
                onIndexChange={(index) => this.setState({index})}
                style={{flex: 1, justifyContent: 'center'}}
                renderTabBar={(props) => {
                  return (
                    <TabBar
                      scrollEnabled
                      {...props}
                      renderLabel={({route, focused, color}) => (
                        <Text style={focused ? styles.label : styles.label2}>
                          {route.title}
                        </Text>
                      )}
                      indicatorStyle={styles.indicator}
                      style={styles.tab}
                      inactiveColor={'#a5a5b4'}
                      activeColor={'#6e83e3'}
                    />
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};

// export default  withNavigation(connect(Overview),(mapStateToProps, null));
export default connect(mapStateToProps, null,)(withNavigation(ProfileScreen));
