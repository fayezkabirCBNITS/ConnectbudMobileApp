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
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {Thumbnail, List, ListItem, Separator} from 'native-base';

import axios from 'axios';
import {API_URL} from '../../../config/url';
import {connect} from 'react-redux';
import {Value} from 'react-native-reanimated';

class ProposalFromFreelancer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionset: [],
      skillset: [],
      jobskillset: [],
      project_name: '',
    };
  }

  static navigationOptions = {
    headerShown: false,
  };
  componentDidMount = async () => {
    //get chat
    let body1 = new FormData();

    body1.append('sender_id', '2489');
    body1.append('login_userid', '2489');
    body1.append('receiver_id', '2519');
    body1.append('job_id', '745');
    body1.append('sender_Flag', 'F');
    await axios({
      url: API_URL + 'chat/getChat',
      method: 'POST',
      data: body1,
    })
      .then(async (response) => {
        //    if (response.data[0].detail_type === "tutor") {
        //      await this.setState({
        //        FrelancerType: "tutor",
        //      });
        //    }
        await this.setState({
          recID: response.data[0].sender_id,
        });
        //    localStorage.setItem("slug", response.data[0].job_slug);
        //    this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });

    let taglistbody = new FormData();
    taglistbody.append('hirer_id', '2489');
    taglistbody.append('freelancer_id', '2519');
    taglistbody.append('job_id', '745');
    taglistbody.append('method', 'get');
    taglistbody.append('resumefile', '');
    taglistbody.append('videolink', '');
    taglistbody.append('type', 'freelancer');

    await axios({
      url: API_URL + 'freelancerproposal',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          questionset: response.data.sort(function (a, b) {
            if (a.expert_Name < b.expert_Name) return -1;
            else if (a.expert_Name > b.expert_Name) return 1;
            return 0;
          }),
          jobskillset: response.data[0].job_skills,
          skillset: response.data[0].freelancer_skills,
          project_name: response.data[0].project_name,
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
    const obj = {
      milestone_id: '',
      receiver_id: this.state.recID,
      sender_id: localStorage.getItem('user_id'),
      job_type: 'freelancer',
      job_id: localStorage.getItem('userjobId'),
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
        console.log(response);
        alert('Successfully accepted the proposal!');
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
    const obj = {
      milestone_id: '',
      receiver_id: this.state.recID,
      sender_id: localStorage.getItem('user_id'),
      job_type: 'freelancer',
      job_id: localStorage.getItem('userjobId'),
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

  render() {
    return (
      <SafeAreaView style={[CommonStyles.safeAreaView, styles.bgColorWhite]}>
        <View style={[CommonStyles.main, styles.bgColorWhite]}>
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

export default ProposalFromFreelancer;
