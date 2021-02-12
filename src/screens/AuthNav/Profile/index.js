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
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
// import Overview from '../../../components/Overview';
// import Portfolio from '../../../components/Portfolio';
// import WorkHistory from '../../../components/WorkHistory';
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequestMultipart } from '../../../services/http-connectors';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import base64 from 'base-64';
import NewOverview from '../../../components/NewOverview';
import NewPortfolio from '../../../components/NewPortfolio';
import NewExperience from '../../../components/NewExperience';
import NewWorkHistory from '../../../components/NewWorkHistory';
import UpdateDocument from '../../../components/UpdateDocument';
import { WebView } from 'react-native-webview';
import NewAvailability from '../../../components/NewAvailability';
import Zocial from 'react-native-vector-icons/Zocial';

class ProfileScreen extends Component {
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

  componentDidMount = () => {
    // const {navigation} = this.props;
    // this.focusListener = navigation.addListener('didFocus', () => {
    //   this.FetchUserProfile();
    // });
    this.FetchUserProfile();
  };

  FetchUserProfile = async () => {

    this.setState({ showLoader: true });

    let body = new FormData();

    //mandatory for fetch
    body.append('id', this.props.userDeatailResponse.row_id);
    body.append(
      'user_id',
      base64.decode(this.props.userDeatailResponse.user_id),
    );

    //For Edit Intro
    body.append('first_name', '');
    body.append('last_name', '');
    body.append('category', '');
    body.append('skills', '');
    body.append('socialurls', '');

    //for Job
    body.append('experience_id', '');
    body.append('experience', '');
    body.append('description', '');
    body.append('projecturl', '');
    body.append('professionalurls', '');
    body.append('employment_type', '');
    body.append('willing_to_relocate', '');
    body.append('country', '');
    body.append('city', '');
    body.append('resumefile', '');
    body.append('videoresume', '');

    // For Education
    body.append('department', '');
    body.append('title', '');
    body.append('type', '');
    body.append('location', '');
    body.append('startDate', '');
    body.append('endDate', '');
    body.append('community', '');
    body.append('image', '');
    body.append('portfolio_name', '');

    //For Portfolio
    body.append('portfolio_id', '');
    body.append('portfolio_name', '');
    body.append('portfolio_des', '');
    body.append('portfolio_category', '');
    body.append('portfolio_link', '');
    body.append('image', '');

    //For Availability
    body.append('date', '');

    let response = await makePostRequestMultipart(
      ApiUrl.ExpertProfile + base64.decode(this.props.userDeatailResponse.slug),
      false,
      body,
    );
    if (response) {
      this.setState({
        profiledataset: response,
        videoResume: response[0].videoresume[0].videoresume,
        userImg: response[0].user_image,
        showLoader: false,
        urlsocialset: response.map((item) => item.socialurls.map((obj) => obj.socialurl)),
        year: response[0].dates_availability.map((obj) => (((((obj.date.split("/").join("-").split("-")[2])) + "5" + ((obj.date.split("/").join("-").split("-")[0])) + "-" + ((obj.date.split("/").join("-").split("-")[1]))).replace('"5"', "-")) + " " + "14:00:00")),
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
    }
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={[CommonStyles.main, styles.whiteBg]}>
          <CommonStatusBar />
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
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
            {/* <TouchableOpacity style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#000" size={30} />
            </TouchableOpacity> */}
          </View>
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
            <NewOverview />
            <NewAvailability dates={this.state.sampleEvents} />
            <NewPortfolio />
            <NewExperience />
            <UpdateDocument />
            <NewWorkHistory />
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
export default connect(mapStateToProps, null)(withNavigation(ProfileScreen));
