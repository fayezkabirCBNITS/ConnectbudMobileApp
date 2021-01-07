import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';
import ApiUrl from '../../config/ApiUrl';
import { makePostRequestMultipart } from '../../services/http-connectors';
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import base64 from 'base-64';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiledataset: [],
      showLoader: false,
      urlsocialset: "",
      urlsocial: ""
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.FetchOverview();
    });
    this.FetchOverview();
  };

  FetchOverview = async () => {

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
        urlsocialset: response.map((item) => item.socialurls.map((obj) => obj.socialurl)),
        showLoader: false
      });
      this.setState({
        urlsocial: this.state.urlsocialset.toString().split(" ,").join(", "),
      });
    }
  };

  gotoEditPage = data => {
    this.props.navigation.navigate('EditProfileScreen', { slugname: this.props.userDeatailResponse.slugname })
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <Spinner
          visible={this.state.showLoader}
          animation="fade"
          textContent={'Loading...'}
        />
        {this.state.profiledataset.map((item, i) => {
          if (this.state.profiledataset.length > 0) {
            return (
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.editBtn} onPress={this.gotoEditPage}>
                  <MaterialIcons name="mode-edit" color="#fff" size={18} />
                  <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>

                <View key={i} style={styles.details}>
                  <Text style={styles.userInfoHead}>College</Text>
                  <Text style={styles.userInfoDetails}>{item.college}</Text>
                </View>

                <View key={i} style={styles.details}>
                  <Text style={styles.userInfoHead}>Major</Text>
                  <Text style={styles.userInfoDetails}>{item.department}</Text>
                </View>

                <View key={i} style={styles.details}>
                  <Text style={styles.userInfoHead}>Enrollment</Text>
                  <Text style={styles.userInfoDetails}>{item.title}</Text>
                </View>

                <View key={i} style={styles.details}>
                  <Text style={styles.userInfoHead}>Type</Text>
                  <Text style={styles.userInfoDetails}>{item.type}</Text>
                </View>

                <View key={i} style={styles.details}>
                  <Text style={styles.userInfoHead}>Duration</Text>
                  <Text style={styles.userInfoDetails}>
                    {item.startDateFormat} - {item.endDateFormat}
                  </Text>
                </View>

                <View key={i} style={styles.details}>
                  <Text style={styles.userInfoHead}>City</Text>
                  <Text style={styles.userInfoDetails}>{item.location}</Text>
                </View>

                <Text style={styles.userInfoHead}>Categories</Text>
                <View style={styles.details}>
                  {item.category.map((value, i) => (
                    <Text style={styles.userInfoDetails}>{value.label},{"  "}</Text>
                  ))}
                </View>

                {this.state.urlsocial !== "" &&
                  this.state.urlsocial !== "NULL" && (
                    <View style={styles.socialIconSec}>
                      <Text style={styles.userInfoHead}>Social Url's</Text>
                      <View style={styles.socialIcon}>
                        {item.socialurls.map((value) => {
                          if (value.type === "linkedin") {
                            return (
                              <TouchableOpacity
                                onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
                                <Zocial name="linkedin" color='#014670' size={16} />
                              </TouchableOpacity>
                            );
                          }
                        })}
                        {item.socialurls.map((value) => {
                          if (value.type === "youtube") {
                            return (
                              <TouchableOpacity
                                onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
                                <Zocial name="youtube" color='#F44336' size={16} />
                              </TouchableOpacity>
                            );
                          }
                        })}
                        {item.socialurls.map((value) => {
                          if (value.type === "facebook") {
                            return (
                              <TouchableOpacity
                                onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
                                <Zocial name="facebook" color='#3c5a9a' size={16} />
                              </TouchableOpacity>
                            );
                          }
                        })}
                        {item.socialurls.map((value) => {
                          if (value.type === "twitter") {
                            return (
                              <TouchableOpacity
                                onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
                                <Zocial name="twitter" color='#00acee' size={16} />
                              </TouchableOpacity>
                            );
                          }
                        })}
                        {item.socialurls.map((value) => {
                          if (value.type === "instagram") {
                            return (
                              <TouchableOpacity
                                onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
                                <Zocial name="instagram" color='#3f729b' size={16} />
                              </TouchableOpacity>
                            );
                          }
                        })}
                        {item.socialurls.map((value) => {
                          if (value.type === "github") {
                            return (
                              <TouchableOpacity
                                onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
                                <Zocial name="github" color='#212121' size={16} />
                              </TouchableOpacity>
                            );
                          }
                        })}
                        {item.socialurls.map((value) => {
                          if (value.type === "stackoverflow") {
                            return (
                              <TouchableOpacity
                                onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
                                <Zocial name="stackoverflow" color='#f48024' size={16} />
                              </TouchableOpacity>
                            );
                          }
                        })}
                        {item.socialurls.map((value) => {
                          if (value.type === "other") {
                            return (
                              <TouchableOpacity
                                onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10, paddingTop: 5 }}>
                                <FontAwesome name="external-link" color='#71B85F' size={18} />
                              </TouchableOpacity>
                            );
                          }
                        })}
                      </View>
                    </View>
                  )
                }

                <Text style={styles.skillHead}>Skills</Text>
                <View style={styles.skillSec}>
                  {item.skills.map((value, i) => (
                    <View key={i} style={styles.skillTab}>
                      <Text style={styles.skillText}>{value.label}</Text>
                    </View>
                  ))}
                </View>

                {
                  item.about !== "" && (
                    <View style={{ marginBottom: 100, }} key={i}>
                      <Text style={styles.skillHead}>Info</Text>
                      <Text style={styles.skillText}>{item.about}</Text>
                    </View>
                  )
                }

              </ScrollView >
            );
          } else {
            return (
              <View style={styles.noData}>
                <Image source={require('../../assets/images/noData.png')} />
                <Text style={styles.noDataText}>No Data Found</Text>
              </View>
            );
          }
        })}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps, null,)(withNavigation(Overview));
