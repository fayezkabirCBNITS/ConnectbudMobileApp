import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { API_URL } from '../../config/url';
//for redux
import { updateJobId } from "../../redux/actions/user-data";
import { connect } from "react-redux";

class InternshipJobs extends Component {
  constructor() {
    super();
    this.state = {
      jobexpertSet: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  expertJobs = async () => {
    let taglistbody = new FormData();
    taglistbody.append('user_id', '2519');
    taglistbody.append('type', 'recruiter');
    taglistbody.append('skills', '');
    taglistbody.append('search_type', 'all');
    taglistbody.append('offset', 10);

    await axios({
      url: API_URL + 'expert_jobsummary',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        this.setState({
          // lodarStatus: false,
          jobexpertSet: response.data,
        });
      })
      .catch((error) => { });
  };

  componentDidMount() {
    this.expertJobs();
  }

  Method = async () => {
    await this.setState({
      jobexpertSet: this.props.JobShowData,
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
    if (this.props.JobShowData.length > 0) {
      this.Method();
      this.catSkill();
      this.child();
    }
  }

  PageNav = async (JobId) => {
    // await AsyncStorage.setItem('ProjectJobId' , JobId);
    this.props.navigateToDetailsJob();
    this.props.updateJobId(JobId);
  }


  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.jobexpertSet.map((item, idx) => {
              if (item.message != "No data found") {
                return (
                  <TouchableOpacity key={idx} onPress={() => this.PageNav(item.id)}>
                    <View style={CommonStyles.container}>
                      <View style={styles.subjectWrapper}>
                        {/* <View style={styles.leftSection}>
                      <FontAwesome name="tv" color="#000" size={25} />
                    </View> */}
                        <View style={styles.rightSection}>
                          <Text style={styles.boxTitle}>{item.job_title}</Text>
                          <Text style={styles.boxTexts}>{item.description}</Text>
                          <View style={[styles.flexstyle, styles.timeAgo]}>
                            <Entypo name="time-slot" color="rgba(0,0,0,0.3)" size={15} />
                            <Text style={styles.iconText}>{item.posted_date}</Text>
                          </View>
                          <View style={[styles.flexstyle, styles.timeAgo]}>
                            <FontAwesome name="tag" color="rgba(0,0,0,0.3)" size={15} />
                            <Text style={styles.iconText}>{item.key_skill}</Text>
                          </View>
                          <View style={[styles.flexstyle, styles.timeAgo]}>
                            <FontAwesome name="user" color="rgba(0,0,0,0.3)" size={15} />
                            <Text style={styles.iconText}>{item.match_number}</Text>
                          </View>
                          <View style={[styles.flexstyle, styles.timeAgo]}>
                            <FontAwesome
                              name="search-plus"
                              color="rgba(0,0,0,0.3)"
                              size={15}
                            />
                            <Text style={styles.iconText}>
                              {item.applied_number}
                            </Text>
                          </View>
                          <View style={[styles.flexstyle, styles.moneyContainer]}>
                            <Text style={styles.usdText}>
                              {item.price_amount} USD
                        </Text>
                            <Text style={styles.inrtxt}>
                              ({item.price_amount * 70} INR)
                        </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <View style={styles.noData}>
                    <Image source={require('../../assets/images/resultNotFound.png')} style={{ width: 120, height: 121 }} />
                    <Text style={styles.noDataText}>No Result Found</Text>
                  </View>
                );
              }
            })}
            <View style={{ marginBottom: 80 }}></View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

// export default InternshipJobs;

const mapDispatchToProps = (dispatch) => {
  return {
    //storeAccessToken: (token) => dispatch(storeAccessToken(token)),
    //updateUserStatus: (status) => dispatch(updateUserStatus(status)),
    updateJobId: (data) => dispatch(updateJobId(data)),
    //updateUserPaymentMethod: (data) => dispatch(updateUserPaymentMethod(data)),
  };
};

export default connect(null, mapDispatchToProps)(InternshipJobs);
