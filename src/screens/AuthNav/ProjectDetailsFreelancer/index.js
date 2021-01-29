import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
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

class ProjectDetailsFreelancer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStatus: this.props.navigation.state.params
        ? this.props.navigation.state.params.page_status
        : '',
      Job: '',
      jobDetails: [],
      jobSet: [],
      btnStatus: '',
      showLoader: false,
      user_id: '',
      projectType: '',
      job_id: '',
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    const {userDeatailResponse} = this.props;
    this.setState({
      btnStatus: userDeatailResponse.userData.user_id,
      showLoader: true,
      user_id: base64.decode(userDeatailResponse.userData.user_id),
      job_id: userDeatailResponse.userData.JOBID,
    });
    let taglistbody = new FormData();
    let body = new FormData();
    body.append('user_id', base64.decode(userDeatailResponse.userData.user_id));
    body.append('type', 'freelancer');
    body.append('skills', '');
    body.append('search_type', 'all');
    body.append('offset', '0');

    taglistbody.append('job_id', userDeatailResponse.userData.JOBID);
    taglistbody.append(
      'user_id',
      base64.decode(userDeatailResponse.userData.user_id),
    );
    taglistbody.append('type', 'freelancer');

    await axios({
      url: API_URL + 'expert_jobdetails',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        this.setState({
          jobDetails: response.data,
          showLoader: false,
          projectType: response.data[0].type,
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

  PageNav = async (JobId) => {
    this.setState({
      showLoader: true,
    });
    this.props.updateJobId(JobId);
    // this.props.navigation.navigate('ProjectDetailsFreelancer');
    let taglistbody = new FormData();
    let body = new FormData();
    body.append('user_id', this.state.user_id);
    body.append('type', 'freelancer');
    body.append('skills', '');
    body.append('search_type', 'all');
    body.append('offset', '0');

    taglistbody.append('job_id', JobId);
    taglistbody.append('user_id', this.state.user_id);
    taglistbody.append('type', 'freelancer');

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

  acceptIgnore = async (EmpId) => {
    this.setState({
      showLoader: true,
    });
    const obj = {
      milestone_id: '',
      receiver_id: EmpId.toString(),
      sender_id: this.state.user_id,
      job_type: 'freelancer',
      job_id: this.state.job_id.toString(),
      status: 'no',
      confirmation_type: 'invitation',
    };


    await axios
      .post(API_URL + 'confirmation', obj, {
        header: {
          'content-Type': 'application/json',
        },
      })
      .then((response) => {
        alert('Invitation ignored');
        this.setState({
          isLoading: false,
          showLoader: false,
        });
        this.props.navigation.navigate('StudentInner');
      })
      .catch((error) => {
        this.setState({isLoading: false, showLoader: false});
      });
  };

  btnName = (textName) => {
    return (
      <View
        style={{
          width: '100%',
          paddingHorizontal: '5%',
        }}>
        <Text style={styles.applyBtnText}>{textName}</Text>
      </View>
    );
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
                  <Text style={styles.courseDetails}>Project Details</Text>
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
                    <Text style={styles.textSemibold}>Budget :</Text>{' '}
                    <Text> {value.price_amount} USD</Text>
                  </Text>
                  {/* <Text>
                  <Text style={styles.textSemibold}> Course Duration : </Text>{' '}
                  <Text></Text> month
                </Text>
                <Text>
                  <Text style={styles.textSemibold}> Course Date : </Text>{' '}
                  <Text>2020-12-16</Text>
                </Text> */}
                  <Text>
                    <Text style={styles.textSemibold}>Description :</Text>{' '}
                    <Text style={styles.syllabusText}>{value.description}</Text>
                  </Text>
                  {/* <View
                    style={{
                      width: '100%',
                      paddingHorizontal: '5%',
                      marginTop: 10,
                    }}> */}
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
                                <TouchableOpacity style={styles.newBtn2}
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    'SignInScreen',
                                  )
                                }>
                                {this.btnName("Apply")}
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
                                            style={styles.newBtn}
                                            onPress={() =>
                                              this.props.navigation.navigate(
                                                'AssessmentQuestion',
                                              )
                                            }>
                                            {this.btnName("Apply")}
                                          </TouchableOpacity>
                                          <TouchableOpacity
                                            style={styles.newBtn}
                                            onPress={() =>
                                              this.acceptIgnore(value.user_id)
                                            }>
                                            {this.btnName("Ignore")}
                                          </TouchableOpacity>
                                        </View>
                                      ) : (
                                        <TouchableOpacity
                                          style={styles.newBtn2}
                                          onPress={() =>
                                            this.props.navigation.navigate(
                                              'AssessmentQuestion',
                                            )
                                          }>
                                          {this.btnName('Apply')}
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
                  {/* </View> */}
                </View>
              ))}
              {this.state.pageStatus !== 'invitation' ? (
                <View style={styles.similarJobWrapper}>
                  <View style={styles.slimilarJob}>
                    <Text style={styles.similiarjobText}>
                      Similar projects for me
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
const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
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

export default connect(mapStateToProps, mapDispatch)(ProjectDetailsFreelancer);
