import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import Header from '../../../components/Header';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, TabBar } from 'react-native-tab-view';
import ViewOverview from '../../../components/ViewOverview';
import ViewPortfolio from '../../../components/ViewPortfolio';
import ViewWorkHistory from '../../../components/ViewWorkHistory';
import ViewExperience from '../../../components/ViewExperience';
import ViewDocument from '../../../components/ViewDocument';
import axios from 'axios';
import { API_URL } from "../../../config/url";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {WebView} from 'react-native-webview';


class ViewUserProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      videoResume: '',
      index: 0,
      routes: [
        { key: 'first', title: 'Overview' },
        { key: 'second', title: 'Portfolio' },
        { key: 'third', title: 'Work History' },
      ],
      profiledataset: [],
      showLoader: false,
      userImg: '',
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    const { params } = this.props.navigation.state;
    this.setState({ showLoader: true })
    await axios({
      url: API_URL + "expertProfile/" + params.username,
      method: "GET",
    })
      .then((response) => {
        this.setState({
          profiledataset: response.data,
          videoResume: response.data[0].videoresume[0].videoresume,
          userImg: response.data[0].user_image,
          showLoader: false,
        });
      })
      .catch(() => {
        this.setState({ showLoader: false })
      });
  };

  render() {
    const { userDeatail } = this.props;
    const { params } = this.props.navigation.state;
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={[CommonStyles.main, styles.whiteBg]}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <View style={CommonStyles.main}>
            {userDeatail.user_id !== "" && userDeatail.user_id !== "undefined" && userDeatail.Status !== "" ? (
              <Header />
            ) : (
                <CommonStatusBar />
              )}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <View style={styles.userProfle}>
                <View style={styles.videoSec}>
                  <WebView
                    style={{ width: '100%', height: '100%' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsFullscreenVideo={true}
                    mediaPlaybackRequiresUserAction={false}
                    allowsInlineMediaPlayback={true}
                    source={{
                      uri: this.state.videoResume,
                    }}
                  />
                </View>
                <View style={styles.newProfile}>
                  <Image
                    source={{ uri: this.state.userImg }}
                    style={CommonStyles.image}
                  />
                </View>
                <View style={styles.newUserDetails}>
                  {this.state.profiledataset.map((value, i) => (
                    <>
                      <Text style={styles.newUserName}>{value.first_name}{" "}{value.last_name}</Text>
                      <Text style={styles.newUserInfo}>
                        {value.about}
                      </Text>
                    </>
                  ))}
                  <View style={styles.newSocial}>
                    <TouchableOpacity style={styles.newSocialIcon}>
                      <AntDesign
                        name="linkedin-square"
                        color="#014670"
                        size={30}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.newSocialIcon}>
                      <AntDesign name="youtube" color="#f44336" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.newSocialIcon}>
                      <AntDesign
                        name="facebook-square"
                        color="#3c5a9a"
                        size={30}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.newSocialIcon}>
                      <AntDesign name="github" color="#212121" size={30} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <ViewOverview slugname={params.username} />
              {/* <NewAvailability /> */}
              <ViewPortfolio slugname={params.username} />
              <ViewExperience slugname={params.username} />
              <ViewDocument slugname={params.username} />
              <ViewWorkHistory freeId={userDeatail.view_user_id} />

            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDeatail: state.userData,
  };
};
export default connect(mapStateToProps, null)(ViewUserProfileScreen);
