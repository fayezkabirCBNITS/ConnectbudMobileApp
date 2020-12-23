import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../../components/Header';
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';
import {
  // storeAccessToken,
  // updateUserStatus,
  // updateUserPaymentMethod,
  // updateUserDetails,
  updateJobId,
} from '../../../redux/actions/user-data';
import base64 from 'base-64';

import axios from 'axios';
import {API_URL} from '../../../config/url';
import {connect} from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';

class TutorDetailsFreelancer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Job: '',
      jobDetails: [],
      jobSet: [],
      user_id: '',
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    const {userDeatailResponse} = this.props;
    this.setState({
      user_id: base64.decode(userDeatailResponse.userData.user_id),
      showLoader: true,
    });
    let taglistbody = new FormData();
    let body = new FormData();
    body.append('user_id', base64.decode(userDeatailResponse.userData.user_id));
    body.append('type', 'tutor');
    body.append('skills', '');
    body.append('search_type', 'all');
    body.append('offset', 10);

    taglistbody.append('job_id', userDeatailResponse.userData.JOBID);
    taglistbody.append(
      'user_id',
      base64.decode(userDeatailResponse.userData.user_id),
    );
    taglistbody.append('type', 'tutor');

    await axios({
      url: API_URL + 'expert_jobdetails',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        this.setState({
          jobDetails: response.data,
          showLoader: false,
          // priceAmount: response.data[0].price_amount,
          // skillSet: response.data[0].key_skill,
        });
      })
      .catch((error) => { });

    await axios({
      url: API_URL + 'expert_jobsummary',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        this.setState({
          jobSet: response.data,
        });
      })
      .catch((error) => {});
  };

  // this.props.navigation.navigate('ProjectDetailsFreelancer');

  PageNav = async (JobID) => {
    this.setState({
      showLoader: true,
    });
    this.props.updateJobId(JobID);
    let taglistbody = new FormData();
    let body = new FormData();
    body.append('user_id', this.state.user_id);
    body.append('type', 'tutor');
    body.append('skills', '');
    body.append('search_type', 'all');
    body.append('offset', '10');

    taglistbody.append('job_id', JobID);
    taglistbody.append('user_id', this.state.user_id);
    taglistbody.append('type', 'tutor');

    await axios({
      url: API_URL + 'expert_jobdetails',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        this.setState({
          jobDetails: response.data,
          showLoader: false,
          // priceAmount: response.data[0].price_amount,
          // skillSet: response.data[0].key_skill,
        });
        this.setState({isLoading: true});
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });

    await axios({
      url: API_URL + 'expert_jobsummary',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        this.setState({
          jobSet: response.data,
        });

        this.setState({isLoading: true});
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
  };

  render() {
    return (
      <SafeAreaView style={[CommonStyles.safeAreaView, styles.bgColorWhite]}>
        <View style={[CommonStyles.main, styles.bgColorWhite]}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <StatusBar
            backgroundColor="#60a84e"
            barStyle="light-content"
            hidden={false}
            translucent={false}
          />
          <Header />
          <View style={[CommonStyles.container, styles.bgColorWhite]}>
            <ScrollView
              style={styles.scrolling}
              showsVerticalScrollIndicator={false}>
              {this.state.jobDetails.map((value, i) => (
                <View style={styles.boxWrapper}>
                  <Text style={styles.boxTitle}>{value.job_title}</Text>
                  <Text style={styles.daysAgo}>{value.posted_date}</Text>
                  <Text style={styles.courseDetails}>Course Details</Text>
                  <Text>
                    <Text style={styles.textSemibold}> Course Amount : </Text>{' '}
                    <Text> {value.price_amount} USD</Text>
                  </Text>

                  {/* <Text>
                    <Text style={styles.textSemibold}> Course Date : </Text>{' '}
                    {value.milestone.map((item, i) => (
                      <Text>{item.date},</Text>
                    ))}
                  </Text> */}
                  <Text>
                    <Text style={styles.textSemibold}> Course Syllabus : </Text>
                    <Text style={styles.syllabusText}>{value.description}</Text>
                  </Text>

                  <TouchableOpacity style={styles.applyBtn}>
                    <Text style={styles.applyBtnText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.similarJobWrapper}>
                <View style={styles.slimilarJob}>
                  <Text style={styles.similiarjobText}>
                    Similar tutoring jobs for me
                  </Text>
                </View>
                {this.state.jobSet.map((item, idx) => (
                  <Pressable onPress={() => this.PageNav(item.id)}>
                    <View key={idx} style={styles.similarList}>
                      <View style={styles.iconList}>
                        <FontAwesome
                          style={{width: 30}}
                          name="graduation-cap"
                          size={15}
                          color="#d7d7d8"
                        />
                        <Text style={styles.iconText}>{item.job_title}</Text>
                      </View>
                      <View style={styles.iconList}>
                        <FontAwesome
                          style={{width: 30}}
                          name="tag"
                          size={15}
                          color="#d7d7d8"
                        />
                        <Text style={styles.iconText}>{item.match_number}</Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// export default ProjectDetailsFreelancer;

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //fetchCartData: () => dispatch(fetchCartData()),
    //updateStoreId: (id) => dispatch(updateStoreId(id)),
    //showLoader: (text) => dispatch(showLoader(text)),
    // hideLoader: () => dispatch(hideLoader()),
  };
};

const mapDispatch = (dispatch) => {
  return {
    //storeAccessToken: (token) => dispatch(storeAccessToken(token)),
    //updateUserStatus: (status) => dispatch(updateUserStatus(status)),
    updateJobId: (data) => dispatch(updateJobId(data)),
    //updateUserPaymentMethod: (data) => dispatch(updateUserPaymentMethod(data)),
  };
};

export default connect(mapStateToProps, mapDispatch)(TutorDetailsFreelancer);
