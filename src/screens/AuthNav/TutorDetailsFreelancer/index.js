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
      pageStatus: this.props.navigation.state.params
        ? this.props.navigation.state.params.page_status
        : '',
      Job: '',
      jobDetails: [],
      jobSet: [],
      user_id: '',
      skillSet: [],
      JobType: '',
      StringDate: [],
      showLoader: false,
      job_id: '',
      projectType: '',
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
      job_id: userDeatailResponse.userData.JOBID,
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
        if (response.data[0].detail_type === 'tutor') {
          this.setState({
            jobDetails: response.data,
            skillSet: response.data[0].key_skill,
            JobType: response.data[0].milestone[0].description,
            StringDate: response.data[0].milestone.map((obj) => obj.date),
            projectType: response.data[0].type,
            showLoader: false,
          });
        } else {
          this.setState({
            jobDetails: response.data,
            skillSet: response.data[0].key_skill,
            projectType: response.data[0].type,
            showLoader: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          showLoader: false,
        });
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
      })
      .catch((error) => {});
  };

  // this.props.navigation.navigate('ProjectDetailsFreelancer');
  employeracceptIgnore = async (EmpId) => {
    this.setState({
      showLoader: true,
    });
    const obj = {
      freelancer_id: this.state.user_id,
      hirer_id: EmpId,
      job_id: this.state.job_id,
      response: 'no',
      confirmation_type: 'invitation',
    };
    console.log(obj);
    await axios
      .post(API_URL + 'tutorproposal', obj, {
        header: {
          'content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        alert('Invitation ignored!');
        this.props.navigation.navigate('StudentInner');
        this.setState({isLoading: false, showLoader: false});
      })
      .catch((error) => {
        this.setState({isLoading: false, showLoader: false});
      });
  };

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
    body.append('offset', 3);

    taglistbody.append('job_id', JobID);
    taglistbody.append('user_id', this.state.user_id);
    taglistbody.append('type', 'tutor');

    await axios({
      url: API_URL + 'expert_jobdetails',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        if (response.data[0].detail_type === 'tutor') {
          this.setState({
            jobDetails: response.data,
            skillSet: response.data[0].key_skill,
            JobType: response.data[0].milestone[0].description,
            StringDate: response.data[0].milestone.map((obj) => obj.date),
            showLoader: false,
          });
        } else {
          this.setState({
            jobDetails: response.data,
            skillSet: response.data[0].key_skill,
            showLoader: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          showLoader: false,
        });
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
      })
      .catch((error) => {});
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
                    <Text style={styles.textSemibold}>Skills :</Text>{' '}
                  </Text>
                  <View style={styles.skillSec}>
                    {value.key_skill.map((value, i) => {
                      return (
                        <View key={i} style={styles.skillTab}>
                          <Text style={styles.skillText}>
                            {value.skill_name}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <Text>
                    <Text style={styles.textSemibold}>Course Amount :</Text>{' '}
                    <Text> {value.price_amount} USD</Text>
                  </Text>

                  {value.detail_type === 'tutor' ? (
                    <>
                      {this.state.JobType === 'Week1' ? '\n' : <></>}
                      {this.state.JobType === 'Week1' ? (
                        <Text>
                          <Text style={styles.textSemibold}>
                            Course Duration :
                          </Text>{' '}
                          <Text> 1 Month</Text>
                        </Text>
                      ) : (
                        <></>
                      )}

                      {this.state.JobType === 'Week1' ? (
                        <Text>
                          <Text style={styles.textSemibold}>
                            Number of Classes :
                          </Text>{' '}
                          <Text> 4 Classes</Text>
                        </Text>
                      ) : (
                        <Text>
                          <Text style={styles.textSemibold}>
                            Number of Classes :
                          </Text>{' '}
                          <Text> {value.Classes}</Text>
                        </Text>
                      )}
                      <Text>
                        <Text style={styles.textSemibold}>Course Date: :</Text>{' '}
                        <Text> {this.state.StringDate.toString()}</Text>
                      </Text>
                    </>
                  ) : (
                    <></>
                  )}

                  <Text>
                    <Text style={styles.textSemibold}>Course Syllabus :</Text>{' '}
                    <Text style={styles.syllabusText}>{value.description}</Text>
                  </Text>

                  <View
                    style={{
                      width: '100%',
                      paddingHorizontal: '5%',
                      marginTop: 10,
                    }}>
                    {this.state.jobDetails.map((value, index) => {
                      return (
                        <>
                          {value.pending_status === 'pending' &&
                          this.state.pageStatus === 'feed' ? (
                            <TouchableOpacity style={styles.newBtn2}>
                              <Text style={styles.applyBtnText}>Waiting</Text>
                            </TouchableOpacity>
                          ) : (
                            <>
                              {this.state.btnStatus === '' ? (
                                <TouchableOpacity style={styles.newBtn2}>
                                  <Text
                                    style={styles.applyBtnText}
                                    onPress={() =>
                                      this.props.navigation.navigate(
                                        'SignInScreen',
                                      )
                                    }>
                                    Apply
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <>
                                  {value.pending_status === 'accept' ? (
                                    <TouchableOpacity style={styles.newBtn2}>
                                      <Text style={styles.applyBtnText}>
                                        Accepted
                                      </Text>
                                    </TouchableOpacity>
                                  ) : (
                                    <>
                                      {this.state.pageStatus ===
                                      'invitation' ? (
                                        <View style={styles.btnSection}>
                                          <TouchableOpacity
                                            style={styles.newBtn}>
                                            <Text
                                              style={styles.authBtnText}
                                              onPress={() =>
                                                this.props.navigation.navigate(
                                                  'AssessmentQuestion',
                                                )
                                              }>
                                              Apply
                                            </Text>
                                          </TouchableOpacity>
                                          <TouchableOpacity
                                            style={styles.newBtn}>
                                            <Text
                                              style={styles.authBtnText}
                                              onPress={() =>
                                                this.employeracceptIgnore(
                                                  value.user_id,
                                                )
                                              }>
                                              Ignore
                                            </Text>
                                          </TouchableOpacity>
                                        </View>
                                      ) : (
                                        <TouchableOpacity
                                          style={styles.newBtn2}>
                                          <Text
                                            style={styles.applyBtnText}
                                            onPress={() =>
                                              this.props.navigation.navigate(
                                                'AssessmentQuestion',
                                              )
                                            }>
                                            Apply
                                          </Text>
                                        </TouchableOpacity>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      );
                    })}
                  </View>
                </View>
              ))}
              {this.state.pageStatus !== 'invitation' ? (
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
                          <Text style={styles.iconText}>
                            {item.match_number}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </View>
              ) : (
                <></>
              )}
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
