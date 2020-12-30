import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import StatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequestMultipart, makePutRequest, makeAuthGetRequest } from '../../../services/http-connectors';
import base64 from 'base-64';
import { connect } from 'react-redux';
import ReadMore from 'react-native-read-more-text';

class JobListingScreen extends Component {
  constructor() {
    super();
    this.state = {
      jobSet: [],
      //for Edit Job
      // title: "",
      // companyName: "",
      // about: "",
      // skillOptions: [],
      // skill: "",
      // addSkill: "",
      // country: "",
      // city: "",
      // cityList: [],
      // isJobAutharize: "",
      // jobtype: "",
      // unit: "USD",
      // ctc: "",
      // errors: "",
      // isSponser: true,
      // show: false,
      // showJob: false,
      // jobChat: [],
      // addSkillBox: false,
      // selectJob: false,
      // btnDisable: true,
      // ID: [],
      // btnStatus: false,
      // freelancerbtnStatus: false,
      showLoader: false,
    };
  }
  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    this.setState({ showLoader: true });
    this.AllPostedJobs();
  };

  AllPostedJobs = async () => {

    const { userData } = this.props;

    let body = new FormData();
    body.append("user_id", base64.decode(userData.user_id));
    body.append("search_type", "all");

    let response = await makePostRequestMultipart(ApiUrl.PostedJob, false, body);
    if (response) {
      this.setState({
        jobSet: response,
        showLoader: false
      });
    }
  };

  // FindCandidate = async (jobId) => {
  //   localStorage.setItem("jobId", jobId);
  //   localStorage.setItem("expertStatus", "");

  //   let body = new FormData();
  //   body.append("job_id", jobId);
  //   body.append("type", "recruiter");
  //   body.append("offset", "0");

  //   await axios({
  //     url: API_URL + "job_related_candidates",
  //     method: "POST",
  //     data: body,
  //   })
  //     .then((response) => {
  //       localStorage.setItem("experts", response.data[0].user_id);
  //       if (response.data[0].message === "No Candidates Found") {
  //         swal({
  //           title: "Sorry! No Candidates Found",
  //           icon: "info",
  //         });
  //       } else {
  //         this.props.history.push("/recruiterfindemployee");
  //       }
  //     })
  //     .catch((error) => { });
  // };

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
          <View style={[CommonStyles.header, { marginBottom: 15 }]}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NotificationScreen')
              }
              style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}
          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              {this.state.jobSet.map((value, index) => {
                if (value.message !== "No data found") {
                  return (
                    <View style={styles.card}>
                      <View style={styles.timeSec}>
                        <Entypo
                          name="back-in-time"
                          color="rgba(0,0,0,0.4)"
                          size={13}
                        />
                        <Text style={styles.time}>{value.posted_date}</Text>
                      </View>
                      <View style={styles.topSec}>
                        <Text style={styles.hdng}>
                          {value.job_title}
                        </Text>
                        <Text style={styles.price}>{value.job_amount}</Text>
                      </View>

                      <ReadMore
                        numberOfLines={3}
                        renderTruncatedFooter={this._renderTruncatedFooter}
                        renderRevealedFooter={this._renderRevealedFooter}
                      >
                        <Text style={styles.subtitle}>
                          {value.description ? value.description : ""}
                        </Text>
                      </ReadMore>

                      <View style={styles.wrap}>
                        {value.key_skill
                          ? value.key_skill.map((data, index) => {
                            return (
                              <Text key={index} style={styles.wrapContent}>
                                {data.label}
                              </Text>
                            );
                          })
                          : null}
                      </View>

                      {/* <View style={styles.btnSec}>
                        <TouchableOpacity style={styles.btn50}>
                          <AntDesign name="delete" color="#fff" size={18} />
                          <Text style={styles.btn50Text}>Close Job</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn50}>
                          <FontAwesome name="edit" color="#fff" size={18} />
                          <Text style={styles.btn50Text}>Edit Job</Text>
                        </TouchableOpacity>
                      </View>

                      <View>
                        <TouchableOpacity style={styles.btn}>
                          <AntDesign name="search1" color="#fff" size={20} />
                          <Text style={styles.btn50Text}>Find Candidates</Text>
                        </TouchableOpacity>
                      </View> */}
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.noDataImg}>
                      <Image source={require('../../../assets/images/noData.png')} />
                      <Text style={styles.noDataImgText}>No Data Found</Text>
                    </View>
                  );
                }
              })}
            </ScrollView>
          </View>
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
export default connect(mapStateToProps, null)(JobListingScreen);
