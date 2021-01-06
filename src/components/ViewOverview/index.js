import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';
import ApiUrl from '../../config/ApiUrl';
import { makeGetRequest } from '../../services/http-connectors';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class ViewOverview extends Component {
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

  componentDidMount = async () => {
    let response = await makeGetRequest(ApiUrl.ExpertProfile + this.props.slugname, false, "");
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

  render() {
    return (
      <View style={CommonStyles.container}>
        {this.state.profiledataset.map((item, i) => {
          if (this.state.profiledataset.length > 0) {
            return (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.editBtn} />
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
                    <View key={i}>
                      <Text style={styles.skillHead}>Info</Text>
                      <Text style={styles.skillText}>{item.about}</Text>
                    </View>
                  )
                }
              </ScrollView>
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

export default ViewOverview;
