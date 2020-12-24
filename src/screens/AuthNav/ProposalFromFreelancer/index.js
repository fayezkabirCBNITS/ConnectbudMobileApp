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
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {Thumbnail, List, ListItem, Separator} from 'native-base';
import {connect} from 'react-redux';

import axios from 'axios';
import {API_URL} from '../../../config/url';
import {Value} from 'react-native-reanimated';
import base64 from 'base-64';

class ProposalFromFreelancer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionset: [],
      skillset: [],
      jobskillset: [],
      user_id: '',
      project_name: '',
      recID: '',
      reqStatus: '',
      FrelancerType: '',
      showLoader: false,
      job_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.job_id
        : '',
      receiver_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.receiver_id
        : '',
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
    //get chat
    let body1 = new FormData();
    body1.append(
      'sender_id',
      base64.decode(userDeatailResponse.userData.user_id),
    );
    body1.append(
      'login_userid',
      base64.decode(userDeatailResponse.userData.user_id),
    );
    body1.append('receiver_id', this.state.receiver_id);
    body1.append('job_id', this.state.job_id);
    body1.append('sender_Flag', 'F');
    await axios({
      url: API_URL + 'chat/getChat',
      method: 'POST',
      data: body1,
    })
      .then(async (response) => {
        if (response.data[0].detail_type === 'tutor') {
          await this.setState({
            FrelancerType: 'tutor',
          });
        } else {
          await this.setState({
            FrelancerType: 'freelancer',
          });
        }
        await this.setState({
          recID: response.data[0].sender_id,
          reqStatus: response.data[0].request_status,
        });

        //    localStorage.setItem("slug", response.data[0].job_slug);
        //    this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });

    let taglistbody = new FormData();
    taglistbody.append(
      'hirer_id',
      base64.decode(userDeatailResponse.userData.user_id),
    );
    taglistbody.append('freelancer_id', this.state.receiver_id);
    taglistbody.append('job_id', this.state.job_id);
    taglistbody.append('method', 'get');
    taglistbody.append('resumefile', '');
    taglistbody.append('videolink', '');
    taglistbody.append('type', this.state.FrelancerType);

    await axios({
      url: API_URL + 'freelancerproposal',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        this.setState({
          questionset: response.data.sort(function (a, b) {
            if (a.expert_Name < b.expert_Name) return -1;
            else if (a.expert_Name > b.expert_Name) return 1;
            return 0;
          }),
          jobskillset: response.data[0].job_skills,
          skillset: response.data[0].freelancer_skills,
          project_name: response.data[0].project_name,
          showLoader: false,
        });
        //    if (this.state.FrelancerType === "tutor") {
        //      this.setState({
        //        file: response.data[0].resumefile,
        //        filetype: response.data[0].resumefile.split(".")[3],
        //      });
        //    }

        this.setState({isLoading: false});
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
  };

  acceptRequest = async () => {
    this.setState({
      showLoader: true,
    });
    const obj = {
      milestone_id: '',
      receiver_id: this.state.recID.toString(),
      sender_id: this.state.user_id,
      job_type: 'freelancer',
      job_id: this.state.job_id.toString(),
      status: 'yes',
      confirmation_type: 'proposal',
    };
    await axios
      .post(API_URL + 'confirmation', obj, {
        header: {
          'content-Type': 'application/json',
        },
      })
      .then((response) => {
        this.setState({
          showLoader: false,
        });
        alert('Successfully accepted the proposal!');
        this.props.navigation.navigate('ChatListScreen');
        this.setState({isLoading: false});
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
    // var payload = {
    //   action: "sendmessage",
    //   data: "notification",
    //   to_user: localStorage.getItem("userchatuId"),
    // };
    // socket.send(JSON.stringify(payload));
  };

  acceptIgnore = async () => {
    this.setState({
      showLoader:true
    })
    const obj = {
      milestone_id: '',
      receiver_id: this.state.recID.toString(),
      sender_id: this.state.user_id,
      job_type: 'freelancer',
      job_id: this.state.job_id.toString(),
      status: 'no',
      confirmation_type: 'proposal',
    };

    await axios
      .post(API_URL + 'confirmation', obj, {
        header: {
          'content-Type': 'application/json',
        },
      })
      .then((response) => {
        this.setState({
          showLoader:false
        })
        this.props.navigation.navigate('ChatListScreen');
        alert('You ignored the proposal!');
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
    // var payload = {
    //   action: "sendmessage",
    //   data: "notification",
    //   to_user: localStorage.getItem("userchatuId"),
    // };
    // socket.send(JSON.stringify(payload));
  };

  tutoracceptRequest = async () => {
    this.setState({
      showLoader:true
    })
    let body1 = new FormData();

    body1.append('receiver_id', this.state.user_id);

    const obj = {
      freelancer_id: this.state.recID.toString(),
      hirer_id: this.state.user_id,
      job_id: this.state.job_id.toString(),
      response: 'yes',
      confirmation_type: 'proposal',
    };

    await axios
      .post(API_URL + 'tutorproposal', obj, {
        header: {
          'content-Type': 'application/json',
        },
      })
      .then((response) => {
        this.setState({
          showLoader:false
        })
        this.props.navigation.navigate('ChatListScreen');
        alert('Successfully accepted the proposal!');
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
  };

  tutoracceptIgnore = async () => {
    this.setState({
      showLoader:true
    })
    let body1 = new FormData();

    body1.append('receiver_id', this.state.user_id);

    const obj = {
      freelancer_id: this.state.recID.toString(),
      hirer_id: this.state.user_id,
      job_id: this.state.job_id.toString(),
      response: 'no',
      confirmation_type: 'proposal',
    };

    await axios
      .post(API_URL + 'tutorproposal', obj, {
        header: {
          'content-Type': 'application/json',
        },
      })
      .then((response) => {
        this.props.navigation.navigate('ChatListScreen');
        alert('You ignored the proposal!');
        this.setState({
          showLoader:false
        })
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
              <View>
                <Collapse style={styles.collapseWrap}>
                  <CollapseHeader>
                    <Separator style={styles.separator} bordered>
                      <View style={styles.collapseTitle}>
                        <Text style={styles.projectHead}>Project Name : </Text>
                        <Text style={styles.projectName}>
                          {this.state.project_name}
                        </Text>
                      </View>
                    </Separator>
                    {/* </CollapseHeader> */}
                    {/* <CollapseBody> */}
                    <View>
                      {this.state.questionset.map((data, index) => (
                        <>
                          <View key={index} style={styles.quesAns}>
                            <Text>{data.question}</Text>
                            <Text>{data.answer}</Text>
                          </View>
                        </>
                      ))}
                      <View style={styles.reqprSkill}>
                        <Text>Required skills for the Project</Text>
                        {this.state.jobskillset.map((item, i) => (
                          <View style={styles.skillGroup}>
                            <Text style={styles.PrSkills}>
                              {item.key_skill}
                            </Text>
                          </View>
                        ))}
                      </View>
                      <View style={styles.reqprSkill}>
                        <Text>Students Matched skills</Text>
                        {this.state.skillset.map((item, i) => (
                          <View style={styles.skillGroup}>
                            <Text style={styles.PrSkills}>
                              {item.key_skill}
                            </Text>
                          </View>
                        ))}
                      </View>
                      {this.state.reqStatus === 'accept' ? (
                        <></>
                      ) : (
                        <>
                          {this.state.FrelancerType === 'tutor' ? (
                            <View style={styles.btnWrapper}>
                              <TouchableOpacity style={styles.accbtn}>
                                <Text
                                  style={styles.btnText}
                                  onPress={() => this.tutoracceptRequest()}>
                                  Accept
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.rejBtn}>
                                <Text
                                  style={styles.btnText}
                                  onPress={() => this.tutoracceptIgnore()}>
                                  Reject
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <View style={styles.btnWrapper}>
                              <TouchableOpacity style={styles.accbtn}>
                                <Text
                                  style={styles.btnText}
                                  onPress={() => this.acceptRequest()}>
                                  Accept
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.rejBtn}>
                                <Text
                                  style={styles.btnText}
                                  onPress={() => this.acceptIgnore()}>
                                  Reject
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}
                    </View>
                  </CollapseHeader>
                </Collapse>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// export default ProposalFromFreelancer;

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

export default connect(mapStateToProps, null)(ProposalFromFreelancer);
