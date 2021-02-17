import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import {API_URL} from '../../config/url';
import Spinner from 'react-native-loading-spinner-overlay';
//for redux
import {updateJobId} from '../../redux/actions/user-data';
import {connect} from 'react-redux';
import base64 from 'base-64';

class StudentProject extends Component {
  constructor() {
    super();

    this.state = {
      skillOptions: [],
      expertset: [],
      SearchSkill: [],
      user_id: '',
      skills: [],
      selectedSkills: 'select',
      showLoader: false,
      skillValuePlaceHolder: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    const {userDeatailResponse} = this.props;
    await this.setState({
      user_id: base64.decode(userDeatailResponse.userData.user_id),
      showLoader: true,
    });
    this.feedProjects(userDeatailResponse);
    this.SkillSearch();
  };

  feedProjects = async (userDeatailResponse) => {
    let taglistbody = new FormData();
    taglistbody.append(
      'user_id',
      base64.decode(userDeatailResponse.userData.user_id),
    );
    taglistbody.append('type', 'freelancer');
    taglistbody.append('skills', '');
    taglistbody.append('search_type', 'all');
    taglistbody.append('offset', 15);

    await axios({
      url: API_URL + 'expert_jobsummary',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        this.setState({
          // lodarStatus: false,
          showLoader: false,
          expertset: response.data,
        });
      })
      .catch((error) => {});
  };

  resetProjects = async () => {
    this.setState({
      selectedSkills: '',
      showLoader: true,
    });
    let taglistbody = new FormData();
    taglistbody.append('user_id', this.state.user_id);
    taglistbody.append('type', 'freelancer');
    taglistbody.append('skills', '');
    taglistbody.append('search_type', 'all');
    taglistbody.append('offset', '15');

    await axios({
      url: API_URL + 'expert_jobsummary',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        this.setState({
          // lodarStatus: false,
          expertset: response.data,
          showLoader: false,
        });
        this.setState({isLoading: true});
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
  };

  PageNav = async (JobId) => {
    // await AsyncStorage.setItem('ProjectJobId' , JobId);
    this.props.navigateToDetails();
    this.props.updateJobId(JobId);
  };

  SkillSearch = async () => {
    await axios.get(API_URL + 'keyskill/recruiter').then((response) => {
      this.setState({
        skillValuePlaceHolder: this.state.placeholder,
        skills: this.state.skillValuePlaceHolder.concat(response.data),
      });
    });
  };

  SearchProject = async (data) => {
    await this.setState({
      SearchSkill: data,
      showLoader: true,
    });

    if (this.state.SearchSkill !== null) {
      let taglistbody = new FormData();
      taglistbody.append('user_id', this.state.user_id);
      taglistbody.append('type', 'freelancer');
      taglistbody.append('skills', data);
      taglistbody.append('search_type', 'else');
      taglistbody.append('offset', 15);

      await axios({
        url: API_URL + 'expert_jobsummary',
        method: 'POST',
        data: taglistbody,
      })
        .then((response) => {
          this.setState({
            expertset: response.data,
            showLoader: false,
          });
        })
        .catch((error) => {});

      // this.expertProjects;
    } else {
      // this.setState({
      //   lodarStatus: true,
      // });
      let taglistbody = new FormData();
      taglistbody.append('user_id', this.state.user_id);
      taglistbody.append('type', 'freelancer');
      taglistbody.append('skills', '');
      taglistbody.append('search_type', 'all');
      taglistbody.append('offset', 15);

      await axios({
        url: API_URL + 'expert_jobsummary',
        method: 'POST',
        data: taglistbody,
      })
        .then((response) => {
          this.setState({
            // lodarStatus: false,
            expertset: response.data,
          });
        })
        .catch((error) => {});
    }
  };

  expertProjects = async (skill) => {
    this.setState({
      skillValuePlaceHolder: [{value: skill, label: skill}],
      selectedSkills: skill,
    });
    let taglistbody = new FormData();
    taglistbody.append('user_id', this.state.user_id);
    taglistbody.append('type', 'freelancer');
    taglistbody.append('skills', skill);
    taglistbody.append('search_type', 'else');
    taglistbody.append('offset', 15);

    await axios({
      url: API_URL + 'expert_jobsummary',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        this.setState({
          expertset: response.data,
        });
      })
      .catch((error) => {});
  };

  Method = async () => {
    await this.setState({
      expertset: this.props.ProjectShowData,
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
    if (this.props.ProjectShowData.length > 0) {
      this.Method();
      this.catSkill();
      this.child();
    }
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
          <View style={[CommonStyles.container, {flexDirection: 'row'}]}>
            <Picker
              style={{width: '70%', height: 45, color: '#3B1D25'}}
              selectedValue={this.state.selectedSkills}
              placeholder="san"
              onValueChange={(itemValue) => this.expertProjects(itemValue)}>
              <Picker.Item label="Select Skill" value="" />
              {this.state.skills.length > 0 ? (
                this.state?.skills?.map((data) => {
                  return <Picker.Item label={data.label} value={data.label} />;
                })
              ) : (
                <></>
              )}
            </Picker>
            {this.state.selectedSkills !== '' ? (
              <TouchableOpacity style={styles.editBtn}>
                {/* <MaterialIcons name="mode-edit" color="#fff" size={18} /> */}
                <Text style={styles.editBtnText} onPress={this.resetProjects}>
                  Reset
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.expertset.map((item, idx) => {
              if (item.message != 'No data found') {
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => this.PageNav(item.id)}>
                    <View style={CommonStyles.container}>
                      <View style={styles.subjectWrapper}>
                        {/* <View style={styles.leftSection}>
                      <FontAwesome name="tv" color="#000" size={25} />
                    </View> */}
                        <View style={styles.rightSection}>
                          <Text style={styles.boxTitle}>{item.job_title}</Text>
                          <Text style={styles.boxTexts}>
                            {item.description}
                          </Text>
                          <View style={[styles.flexstyle, styles.timeAgo]}>
                            <Entypo
                              name="time-slot"
                              color="rgba(0,0,0,0.3)"
                              size={15}
                            />
                            <Text style={styles.iconText}>
                              {item.posted_date}
                            </Text>
                          </View>
                          <View style={[styles.flexstyle, styles.timeAgo]}>
                            <FontAwesome
                              name="tag"
                              color="rgba(0,0,0,0.3)"
                              size={15}
                            />
                            <Text style={styles.iconText}>
                              {item.key_skill}
                            </Text>
                          </View>
                          <View style={[styles.flexstyle, styles.timeAgo]}>
                            <FontAwesome
                              name="user"
                              color="rgba(0,0,0,0.3)"
                              size={15}
                            />
                            <Text style={styles.iconText}>
                              {item.match_number}
                            </Text>
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
                          <View
                            style={[styles.flexstyle, styles.moneyContainer]}>
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
                    <Image
                      source={require('../../assets/images/resultNotFound.png')}
                      style={{width: 120, height: 121}}
                    />
                    <Text style={styles.noDataText}>No Result Found</Text>
                  </View>
                );
              }
            })}
            <View style={{marginBottom: 80}}></View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

// export default StudentProject;

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //storeAccessToken: (token) => dispatch(storeAccessToken(token)),
    //updateUserStatus: (status) => dispatch(updateUserStatus(status)),
    updateJobId: (data) => dispatch(updateJobId(data)),
    //updateUserPaymentMethod: (data) => dispatch(updateUserPaymentMethod(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentProject);
