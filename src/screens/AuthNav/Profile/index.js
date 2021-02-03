import React, { Component } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Overview from '../../../components/Overview';
import Portfolio from '../../../components/Portfolio';
import WorkHistory from '../../../components/WorkHistory';
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequestMultipart } from '../../../services/http-connectors';
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';
import base64 from 'base-64';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Overview' },
        { key: 'second', title: 'Portfolio' },
        { key: 'third', title: 'Work History' },
      ],
      profiledataset: [],
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.FetchUserProfile();
    });
    this.FetchUserProfile();
  };

  FetchUserProfile = async () => {

    this.setState({ showLoader: true });

    let body = new FormData();

    //mandatory for fetch
    body.append("id", this.props.userDeatailResponse.row_id);
    body.append("user_id", base64.decode(this.props.userDeatailResponse.user_id));

    //For Edit Intro
    body.append("first_name", "");
    body.append("last_name", "");
    body.append("category", "");
    body.append("skills", "");
    body.append("socialurls", "");

    //for Job
    body.append("experience_id", "");
    body.append("experience", "");
    body.append("description", "");
    body.append("projecturl", "");
    body.append("professionalurls", "");
    body.append("employment_type", "");
    body.append("willing_to_relocate", "");
    body.append("country", "");
    body.append("city", "");
    body.append("resumefile", "");
    body.append("videoresume", "");

    // For Education
    body.append("department", "");
    body.append("title", "");
    body.append("type", "");
    body.append("location", "");
    body.append("startDate", "");
    body.append("endDate", "");
    body.append("community", "");
    body.append("image", "");
    body.append("portfolio_name", "");

    //For Portfolio
    body.append("portfolio_id", "")
    body.append("portfolio_name", "");
    body.append("portfolio_des", "");
    body.append("portfolio_category", "");
    body.append("portfolio_link", "");
    body.append("image", "");

    let response = await makePostRequestMultipart(ApiUrl.ExpertProfile + base64.decode(this.props.userDeatailResponse.slug), false, body);
    if (response) {
      this.setState({
        profiledataset: response,
        showLoader: false
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {this.state.profiledataset.map((item, i) => (
              <ImageBackground key={i}
                source={{ uri: item.cover_image }}
                style={styles.coverImage}>
                <TouchableOpacity
                  style={CommonStyles.hanPosition}
                  onPress={() => this.props.navigation.openDrawer()}>
                  <Entypo name="menu" color="#000" size={35} />
                </TouchableOpacity>
                <View style={styles.userImg}>
                  <Image
                    source={{ uri: item.user_image }}
                    style={CommonStyles.usrImage}
                  />
                </View>
              </ImageBackground>
            ))}
            {this.state.profiledataset.map((item, i) => (
              <ScrollView
                style={{ flexDirection: 'row', marginTop: -70 }}
                showsHorizontalScrollIndicator={false}
                key={i}
                horizontal>
                <View style={styles.details}>
                  <FontAwesome name="user" color="#71b85f" size={30} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.userInfoHead}>Name</Text>
                    <Text style={styles.userInfoDetails}>
                      {item.first_name} {item.last_name}
                    </Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <FontAwesome name="bank" color="#71b85f" size={30} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.userInfoHead}>College</Text>
                    <Text style={styles.userInfoDetails}>{item.college}</Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <FontAwesome name="graduation-cap" color="#71b85f" size={30} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.userInfoHead}>Department</Text>
                    <Text style={styles.userInfoDetails}>{item.department}</Text>
                  </View>
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
                onIndexChange={(index) => this.setState({ index })}
                style={{ flex: 1, justifyContent: 'center' }}
                renderTabBar={(props) => {
                  return (
                    <TabBar
                      scrollEnabled
                      {...props}
                      renderLabel={({ route, focused, color }) => (
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
export default connect(mapStateToProps, null,)(withNavigation(ProfileScreen));
