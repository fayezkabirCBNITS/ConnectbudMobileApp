import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from "react-native-vector-icons/Entypo";
import ApiUrl from '../../config/ApiUrl';
import { makePostRequestMultipart } from '../../services/http-connectors';
//for redux
import { updateJobId } from "../../redux/actions/user-data";
import { connect } from "react-redux";
import base64 from "base-64";

import Spinner from 'react-native-loading-spinner-overlay';


class TutoringJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorexpertset: [],
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  feedProjects = async () => {
    const { userDeatailResponse } = this.props;
    let body = new FormData();
    body.append("user_id", base64.decode(userDeatailResponse.userData.user_id));
    body.append("type", "tutor");
    body.append("skills", "");
    body.append("search_type", "all");
    body.append("offset", 10);

    let response = await makePostRequestMultipart(ApiUrl.JobSummary, false, body);
    if (response) {
      this.setState({
        tutorexpertset: response,
      });
    }
  };

  componentDidMount() {
    this.feedProjects();
  }

  Method = async () => {
    await this.setState({
      tutorexpertset: this.props.TutorShowData,
    });
  };

  catSkill = async () => {
    await this.setState({
      skillOptions: this.props.ChildSkills,
    });
  };

  child = async () => {
    await this.setState({
      skillOptions: this.props.ChildSkills,
    });
  };

  componentWillReceiveProps() {
    if (this.props.TutorShowData.length > 0) {
      console.log("tutor called");
      this.Method();
      this.catSkill();
      this.child();
    }
  }

  PageNav = async (JobId) => {
    console.log(JobId);
    this.props.navigateToDetailsTutor();
    this.props.updateJobId(JobId);
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
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              this.state.tutorexpertset.map((item, idx) => (
                <TouchableOpacity key={idx} onPress={() => this.PageNav(item.id)}>
                  <View style={CommonStyles.container}>
                    <View style={styles.subjectWrapper}>
                      <View style={styles.leftSection}>
                        <FontAwesome
                          name="tv"
                          color="#000"
                          size={25}
                        />
                      </View>
                      <View style={styles.rightSection}>
                        <Text style={styles.boxTitle}>{item.job_title}</Text>
                        <Text style={styles.boxTexts}>{item.description}
                        </Text>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <Entypo
                            name="time-slot"
                            color="rgba(0,0,0,0.3)"
                            size={15}
                          />
                          <Text style={styles.iconText}>{item.posted_date}</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <FontAwesome
                            name="tag"
                            color="rgba(0,0,0,0.3)"
                            size={15}
                          />
                          <Text style={styles.iconText}>{item.key_skill}</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <FontAwesome
                            name="user"
                            color="rgba(0,0,0,0.3)"
                            size={15}
                          />
                          <Text style={styles.iconText}>{item.match_number}</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <FontAwesome
                            name="search-plus"
                            color="rgba(0,0,0,0.3)"
                            size={15}
                          />
                          <Text style={styles.iconText}>{item.applied_number}</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.moneyContainer]}>
                          <Text style={styles.usdText}>{item.price_amount} USD</Text>
                          <Text style={styles.inrtxt}>({item.price_amount * 70} INR)</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

              ))
            }
            <View style={{marginBottom: 80}}></View>
          </ScrollView>
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
const mapDispatchToProps = (dispatch) => {
  return {
    updateJobId: (data) => dispatch(updateJobId(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TutoringJobs);
