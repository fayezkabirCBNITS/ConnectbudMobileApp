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
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequestMultipart } from '../../../services/http-connectors';
import { connect } from 'react-redux';
import base64 from 'base-64';
import Spinner from 'react-native-loading-spinner-overlay';
import ReadMore from 'react-native-read-more-text';


class EmployeeProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiledataset: [],
      jobcount: [],
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    this.props.navigation.addListener('didFocus', () => { this.updateData(); });
    this.setState({ showLoader: true });
    this.allPost();

    const { userData } = this.props;

    let body = new FormData();

    if (userData.row_id === "") {
      //mandatory for fetch
      body.append("id", "");
      body.append("user_id", base64.decode(userData.user_id));
      body.append("first_name", "");
      body.append("last_name", "");
      body.append("company_name", "");
      body.append("designation", "");
      body.append("country", "");
      body.append("city", "");
      body.append("about", "");

      let response = await makePostRequestMultipart(ApiUrl.RecruiterProfile + base64.decode(userData.slug), false, body);
      if (response) {
        this.setState({
          profiledataset: response,
          showLoader: false
        });
      }
    } else {
      body.append("id", userData.row_id);
      body.append("user_id", base64.decode(userData.user_id));
      body.append("first_name", "");
      body.append("last_name", "");
      body.append("company_name", "");
      body.append("designation", "");
      body.append("country", "");
      body.append("city", "");
      body.append("about", "");

      let response = await makePostRequestMultipart(ApiUrl.RecruiterProfile + base64.decode(userData.slug), false, body);
      if (response) {
        this.setState({
          profiledataset: response,
          showLoader: false
        });
      }
    }
  };

  updateData = async () => {
    
    this.setState({ showLoader: true });
    const { userData } = this.props;
    let body = new FormData();

    body.append("id", userData.row_id);
    body.append("user_id", base64.decode(userData.user_id));
    body.append("first_name", "");
    body.append("last_name", "");
    body.append("company_name", "");
    body.append("designation", "");
    body.append("country", "");
    body.append("city", "");
    body.append("about", "");

    let response = await makePostRequestMultipart(ApiUrl.RecruiterProfile + base64.decode(userData.slug), false, body);
    if (response) {
      this.setState({
        profiledataset: response,
        showLoader: false
      });
    }
  }

  allPost = async () => {
    const { userData } = this.props;

    if (base64.decode(userData.Flag) === "F") {

      let body = new FormData();

      body.append("hirer_id", base64.decode(userData.user_id));
      body.append("search_type", "all");

      let response = await makePostRequestMultipart(ApiUrl.FreelancerJobList, false, body);
      if (response) {
        this.setState({
          jobcount: response,
        });
      }
    } else {
      let body = new FormData();

      body.append("user_id", base64.decode(userData.user_id));
      body.append("search_type", "all");

      let response = await makePostRequestMultipart(ApiUrl.PostedJob, false, body);
      if (response) {
        this.setState({
          jobcount: response,
        });
      }
    }
  };

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={styles.readMore} onPress={handlePress}>
        Read more
      </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={styles.readMore} onPress={handlePress}>
        Read less
      </Text>
    );
  }

  render() {
    const { userData } = this.props;
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <CommonStatusBar />
          {this.state.profiledataset.length > 0 ? this.state.profiledataset.map((item, i) => (
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <ImageBackground
                key={i}
                source={{ uri: item.cover_image }}
                style={styles.coverImage}>
                <TouchableOpacity style={CommonStyles.hanPosition} onPress={() => this.props.navigation.openDrawer()}>
                  <Entypo name="menu" color="#71b85f" size={35} />
                </TouchableOpacity>
                <View style={styles.userImg}>
                  <Image
                    source={{ uri: item.user_image }}
                    style={CommonStyles.usrImage}
                  />
                  {/* <TouchableOpacity style={CommonStyles.userPhoto}>
                  <FontAwesome name="camera" color="#71b85f" size={22} />
                </TouchableOpacity> */}
                </View>
                {/* <TouchableOpacity style={styles.camPosition}>
                <FontAwesome name="camera" color="#71b85f" size={22} />
              </TouchableOpacity> */}
              </ImageBackground>

              <ScrollView
                style={{ flexDirection: 'row', marginTop: -70 }}
                showsHorizontalScrollIndicator={false}
                key={i}
                horizontal>
                <View style={styles.details}>
                  <FontAwesome name="user" color="#71b85f" size={30} />
                  <View style={{marginLeft: 10}}>
                  <Text style={styles.userInfoHead}>Name</Text>
                  <Text style={styles.userInfoDetails}>{item.first_name + " " + item.last_name}</Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <FontAwesome name="briefcase" color="#71b85f" size={30} />
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.userInfoHead}>Designation</Text>
                    <Text style={styles.userInfoDetails}>{item.designation}</Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <FontAwesome name="building" color="#71b85f" size={30} />
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.userInfoHead}>Company Name</Text>
                    <Text style={styles.userInfoDetails}>{item.company_name}</Text>
                  </View>
                </View>
              </ScrollView>

              <View style={[CommonStyles.container, styles.marTop30]}>
                <View style={styles.hdngSec}>
                  <Text style={styles.hdngText}>Your Details</Text>
                  <TouchableOpacity style={styles.editBtn} onPress={() => this.props.navigation.navigate('EmployeeEditProfileScreen', { slugname: base64.decode(userData.slug) })}>
                    <MaterialIcons name="mode-edit" color="#fff" size={18} />
                    <Text style={styles.editBtnText}>Edit</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                  {item.company_name !== "" &&
                    item.company_name !== "NULL" && (
                      <View style={styles.fieldHead}>
                        <Text style={styles.name}>Company Name</Text>
                        <Text style={styles.details2}>{item.company_name}</Text>
                      </View>
                    )}
                  {item.designation !== "" &&
                    item.designation !== "NULL" && (
                      <View style={styles.fieldHead}>
                        <Text style={styles.name}>Designation</Text>
                        <Text style={styles.details2}>{item.designation}</Text>
                      </View>
                    )}
                  <View style={styles.fieldHead}>
                    <Text style={styles.name}>Phone No.</Text>
                    <Text style={styles.details2}>{item.phone_number}</Text>
                  </View>
                  <View style={styles.fieldHead}>
                    <Text style={styles.name}>Open Jobs</Text>
                    <Text style={styles.details2}>{item.job_opening}</Text>
                  </View>
                  {item.country !== "" &&
                    item.country !== "NULL" && (
                      <View style={styles.fieldHead}>
                        <Text style={styles.name}>Location</Text>
                        <Text style={styles.details2}>{item.country}, {item.city}</Text>
                      </View>
                    )}
                  <View style={styles.fieldHead}>
                    <Text style={styles.name}>Connection</Text>
                    <Text style={styles.details2}>{item.total_connections}</Text>
                  </View>
                </View>

                {item.about !== "" && item.about !== "NULL" && (
                  <View style={[styles.hdngSec2, styles.marTop30]}>
                    <Text style={styles.hdngTextBlk}>About</Text>
                    <Text style={styles.aboutText}>{item.about}</Text>
                  </View>
                )}

                {base64.decode(userData.Flag) === "F" ? (
                  <>
                    {this.state.jobcount.map((value, index) => {
                      if (value.msg === "No results found")
                        return (
                          <View style={[styles.hdngSec2, styles.marTop30]}>
                            <Text style={styles.hdngTextBlk}>You haven't posted any project yet.</Text>
                          </View>
                        )
                      if (index < 1)
                        return (
                          <View style={[styles.hdngSec2, styles.marTop30]}>
                            <Text style={styles.hdngTextBlk}>Project posted by:</Text>
                            <Text style={styles.hdngTextGrey}>{userData.name}</Text>
                          </View>
                        )
                      return null
                    })}
                    {this.state.jobcount.map((value, index) => {
                      if (value.msg !== "No results found") {
                        return (
                          <View style={styles.project}>
                            <Text style={styles.projTitle}>{index + 1}. {value.job_name}</Text>

                            <TouchableOpacity style={{ marginRight: 'auto' }}>
                              <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                              >
                                <Text style={styles.projDetails}>{value.description}</Text>
                              </ReadMore>
                            </TouchableOpacity>
                          </View>
                        )
                      }
                      return null
                    })}
                  </>
                ) : (
                    <>
                      {this.state.jobcount.map((value, index) => {
                        if (value.message === "No data found")
                          return (
                            <View style={[styles.hdngSec2, styles.marTop30]}>
                              <Text style={styles.hdngTextBlk}>You haven't posted any job yet.</Text>
                            </View>
                          )
                        if (index < 1)
                          return (
                            <View style={[styles.hdngSec2, styles.marTop30]}>
                              <Text style={styles.hdngTextBlk}>Job posted by:</Text>
                              <Text style={styles.hdngTextGrey}>{userData.name}</Text>
                            </View>
                          )
                        return null
                      })}
                      {this.state.jobcount.map((value, index) => {
                        if (value.message !== "No data found") {
                          return (
                            <View style={styles.project}>
                              <Text style={styles.projTitle}>{index + 1}. {value.job_title}</Text>
                              <TouchableOpacity style={{ marginRight: 'auto' }}>
                                <ReadMore
                                  numberOfLines={3}
                                  renderTruncatedFooter={this._renderTruncatedFooter}
                                  renderRevealedFooter={this._renderRevealedFooter}
                                >
                                  <Text style={styles.projDetails}>{value.description}</Text>
                                </ReadMore>
                              </TouchableOpacity>
                            </View>
                          )
                        }
                        return null
                      })}
                    </>
                  )}
              </View>
            </ScrollView>
          )) :
            <View style={styles.noDataImg}>
              <Image source={require('../../../assets/images/noData.png')} />
              <Text style={styles.noDataImgText}>No Data Found</Text>
            </View>
          }
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};
export default connect(mapStateToProps, null)(EmployeeProfileScreen);
