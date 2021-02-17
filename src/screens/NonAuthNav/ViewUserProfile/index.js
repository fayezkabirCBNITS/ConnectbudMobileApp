import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import Header from '../../../components/Header';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';
import ViewOverview from '../../../components/ViewOverview';
import ViewAvailability from '../../../components/ViewAvailability';
import ViewPortfolio from '../../../components/ViewPortfolio';
import ViewWorkHistory from '../../../components/ViewWorkHistory';
import ViewExperience from '../../../components/ViewExperience';
import ViewDocument from '../../../components/ViewDocument';
import axios from 'axios';
import { API_URL } from "../../../config/url";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Zocial from 'react-native-vector-icons/Zocial';
import { WebView } from 'react-native-webview';


class ViewUserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoResume: '',
      profiledataset: [],
      showLoader: false,
      userImg: '',
      sampleEvents: [],
      year: "",
      urlsocialset: "",
      urlsocial: ""
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
          urlsocialset: response.data.map((item) => item.socialurls.map((obj) => obj.socialurl)),
          year: response.data[0].dates_availability.map((obj) => (((((obj.date.split("/").join("-").split("-")[2])) + "5" + ((obj.date.split("/").join("-").split("-")[0])) + "-" + ((obj.date.split("/").join("-").split("-")[1]))).replace('"5"', "-")) + " " + "14:00:00")),
        });
        this.setState({
          sampleEvents: [
            { 'start': this.state.year[0], 'duration': '00:20:00', 'note': 'Available for class' },
            { 'start': this.state.year[1], 'duration': '01:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[2], 'duration': '00:30:00', 'note': 'Available for class' },
            { 'start': this.state.year[3], 'duration': '02:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[4], 'duration': '01:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[5], 'duration': '01:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[6], 'duration': '02:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[7], 'duration': '01:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[8], 'duration': '02:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[9], 'duration': '01:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[10], 'duration': '02:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[11], 'duration': '01:30:00', 'note': 'Available for class' },
            { 'start': this.state.year[12], 'duration': '02:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[13], 'duration': '01:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[14], 'duration': '02:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[15], 'duration': '01:30:00', 'note': 'Available for class' },
            { 'start': this.state.year[16], 'duration': '02:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[17], 'duration': '01:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[18], 'duration': '02:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[19], 'duration': '01:30:00', 'note': 'Available for class' },
            { 'start': this.state.year[20], 'duration': '02:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[21], 'duration': '01:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[22], 'duration': '02:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[23], 'duration': '01:30:00', 'note': 'Available for class' },
            { 'start': this.state.year[24], 'duration': '02:00:00', 'note': 'Available for class' },
            { 'start': this.state.year[25], 'duration': '01:00:00', 'note': 'Available for class' },
          ]
        });
        this.setState({
          urlsocial: this.state.urlsocialset.toString().split(" ,").join(", "),
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
                {this.state.videoResume.length > 0 ? (
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
                ) : (
                    <View style={styles.videoSec}>
                      <WebView
                        style={{ width: '100%', height: '100%' }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        allowsFullscreenVideo={true}
                        mediaPlaybackRequiresUserAction={false}
                        allowsInlineMediaPlayback={true}
                        source={{
                          uri: 'https://api-prod.connectbud.com/media/temp_79ndJxu.png',
                        }}
                      />
                    </View>
                  )}
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
                  {this.state.profiledataset.map((item, i) => {
                    return (
                      <>
                        {this.state.urlsocial !== "" &&
                          this.state.urlsocial !== "NULL" && (
                            <View style={styles.newSocial}>
                              {item.socialurls.map((value) => {
                                if (value.type === "linkedin") {
                                  return (
                                    <TouchableOpacity
                                      onPress={() => Linking.openURL(value.socialurl)} style={styles.newSocialIcon}>
                                      <AntDesign name="linkedin-square" color="#014670" size={30} />
                                    </TouchableOpacity>
                                  );
                                }
                              })}
                              {item.socialurls.map((value) => {
                                if (value.type === "youtube") {
                                  return (
                                    <TouchableOpacity
                                      onPress={() => Linking.openURL(value.socialurl)} style={styles.newSocialIcon}>
                                      <AntDesign name="youtube" color="#f44336" size={30} />
                                    </TouchableOpacity>
                                  );
                                }
                              })}
                              {item.socialurls.map((value) => {
                                if (value.type === "facebook") {
                                  return (
                                    <TouchableOpacity
                                      onPress={() => Linking.openURL(value.socialurl)} style={styles.newSocialIcon}>
                                      <AntDesign name="facebook-square" color="#3c5a9a" size={30} />
                                    </TouchableOpacity>
                                  );
                                }
                              })}
                              {item.socialurls.map((value) => {
                                if (value.type === "twitter") {
                                  return (
                                    <TouchableOpacity
                                      onPress={() => Linking.openURL(value.socialurl)} style={styles.newSocialIcon}>
                                      <AntDesign name="twitter" color='#00acee' size={30} />
                                    </TouchableOpacity>
                                  );
                                }
                              })}
                              {item.socialurls.map((value) => {
                                if (value.type === "instagram") {
                                  return (
                                    <TouchableOpacity
                                      onPress={() => Linking.openURL(value.socialurl)} style={styles.newSocialIcon}>
                                      <AntDesign name="instagram" color='#3f729b' size={30} />
                                    </TouchableOpacity>
                                  );
                                }
                              })}
                              {item.socialurls.map((value) => {
                                if (value.type === "github") {
                                  return (
                                    <TouchableOpacity
                                      onPress={() => Linking.openURL(value.socialurl)} style={styles.newSocialIcon}>
                                      <AntDesign name="github" color="#212121" size={30} />
                                    </TouchableOpacity>
                                  );
                                }
                              })}
                              {item.socialurls.map((value) => {
                                if (value.type === "stackoverflow") {
                                  return (
                                    <TouchableOpacity
                                      onPress={() => Linking.openURL(value.socialurl)} style={styles.newSocialIcon}>
                                      <Zocial name="stackoverflow" color='#f48024' size={30} />
                                    </TouchableOpacity>
                                  );
                                }
                              })}
                              {item.socialurls.map((value) => {
                                if (value.type === "other") {
                                  return (
                                    <TouchableOpacity
                                      onPress={() => Linking.openURL(value.socialurl)} style={styles.newSocialIcon}>
                                      <FontAwesome name="external-link" color='#71B85F' size={30} />
                                    </TouchableOpacity>
                                  );
                                }
                              })}
                            </View>
                          )}
                      </>
                    );
                  })}
                </View>
              </View>
              <ViewOverview slugname={params.username} />
              <ViewAvailability dates={this.state.sampleEvents} />
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
