import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
// import DropDownPicker from 'react-native-custom-dropdown';
import {Picker} from '@react-native-community/picker';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';
import {API_URL} from '../../config/url';
import Spinner from 'react-native-loading-spinner-overlay';

//for redux
import {
  // storeAccessToken,
  // updateUserStatus,
  // updateUserPaymentMethod,
  // updateUserDetails,
  updateJobId,
} from '../../redux/actions/user-data';
import {connect} from 'react-redux';
import base64 from 'base-64';

var items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];
class StudentProject extends Component {
  constructor() {
    super();

    this.state = {
      skillOptions: [],
      selectedItems: [
        {
          id: 7,
          name: 'Go',
        },
        {
          id: 8,
          name: 'Swift',
        },
      ],
      expertset: [],
      SearchSkill: [],
      user_id: '',
      skills: [],
      selectedSkills: '',
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
    taglistbody.append('offset', '15');

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
        this.setState({isLoading: true});
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
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
      taglistbody.append('offset', '5');

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
          this.setState({isLoading: true});
        })
        .catch((error) => {
          this.setState({isLoading: false});
        });

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
          });
          this.setState({isLoading: true});
        })
        .catch((error) => {
          this.setState({isLoading: false});
        });
    }
  };

  expertProjects = async (skill) => {
    this.setState({
      skillValuePlaceHolder: [{value: skill, label: skill}],
      selectedSkills: skill,
    });
    console.log('sssssssssssssssss');
    let taglistbody = new FormData();
    taglistbody.append('user_id', this.state.user_id);
    taglistbody.append('type', 'freelancer');
    taglistbody.append('skills', skill);
    taglistbody.append('search_type', 'else');
    taglistbody.append('offset', '0');

    await axios({
      url: API_URL + 'expert_jobsummary',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          expertset: response.data,
        });
        this.setState({isLoading: true});
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <View>
            <Picker
              style={{width: '100%', height: 45, color: '#3B1D25'}}
              // selectedValue={this.state.selectedSkills}
              onValueChange={(itemValue) => this.expertProjects(itemValue)}>
              {this.state.skills.length > 0 ? (
                this.state?.skills?.map((data) => {
                  return <Picker.Item label={data.label} value={data.value} />;
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
            {this.state.expertset.map((item, idx) => (
              <TouchableOpacity key={idx} onPress={() => this.PageNav(item.id)}>
                <View style={CommonStyles.container}>
                  <View style={styles.subjectWrapper}>
                    <View style={styles.leftSection}>
                      <FontAwesome name="tv" color="#000" size={25} />
                    </View>
                    <View style={styles.rightSection}>
                      <Text style={styles.boxTitle}>{item.job_title}</Text>
                      <Text style={styles.boxTexts}>{item.description}</Text>
                      <View style={[styles.flexstyle, styles.timeAgo]}>
                        <Entypo name="time-slot" color="#000" size={15} />
                        <Text style={styles.iconText}>{item.posted_date}</Text>
                      </View>
                      <View style={[styles.flexstyle, styles.timeAgo]}>
                        <FontAwesome name="tag" color="#000" size={15} />
                        <Text style={styles.iconText}>{item.key_skill}</Text>
                      </View>
                      <View style={[styles.flexstyle, styles.timeAgo]}>
                        <FontAwesome name="user" color="#000" size={15} />
                        <Text style={styles.iconText}>{item.match_number}</Text>
                      </View>
                      <View style={[styles.flexstyle, styles.timeAgo]}>
                        <FontAwesome
                          name="search-plus"
                          color="#000"
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
            ))}
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
