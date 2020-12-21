import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Picker} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-custom-dropdown';

import axios from 'axios';
import {API_URL} from '../../config/url';
//for redux
import {
  // storeAccessToken,
  // updateUserStatus,
  // updateUserPaymentMethod,
  // updateUserDetails,
  updateJobId,
} from '../../redux/actions/user-data';
import {connect} from 'react-redux';

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
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = () => {
    this.feedProjects();
    this.SkillSearch();
  };

  feedProjects = async () => {
    let taglistbody = new FormData();
    taglistbody.append('user_id', '2519');
    taglistbody.append('type', 'freelancer');
    taglistbody.append('skills', '');
    taglistbody.append('search_type', 'all');
    taglistbody.append('offset', '10');

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
  };

  PageNav = async (JobId) => {
    // await AsyncStorage.setItem('ProjectJobId' , JobId);
    this.props.navigateToDetails();
    this.props.updateJobId(JobId);
  };

  SkillSearch = async () => {
    await axios.get(API_URL + 'keyskill/recruiter').then((response) => {
      this.setState({
        skillOptions: response.data,
      });
    });
  };

  SearchProject = async (data) => {
    await this.setState({
      SearchSkill: data,
    });

    if (this.state.SearchSkill !== null) {
      let taglistbody = new FormData();
      taglistbody.append('user_id', '2519');
      taglistbody.append('type', 'freelancer');
      taglistbody.append('skills', data);
      taglistbody.append('search_type', 'else');
      taglistbody.append('offset', '0');

      await axios({
        url: API_URL + 'expert_jobsummary',
        method: 'POST',
        data: taglistbody,
      })
        .then((response) => {
          this.setState({
            expertset: response.data,
          });
          console.log(this.state.expertset);
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
      taglistbody.append('user_id', '2519');
      taglistbody.append('type', 'freelancer');
      taglistbody.append('skills', '');
      taglistbody.append('search_type', 'all');
      taglistbody.append('offset', '10');
  
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

  expertProjects = async () => {
    console.log('this called');
    let taglistbody = new FormData();
    taglistbody.append('user_id', '2519');
    taglistbody.append('type', 'freelancer');
    taglistbody.append('skills', this.state.SearchSkill);
    taglistbody.append('search_type', 'else');
    taglistbody.append('offset', '0');

    await axios({
      url: API_URL + 'expert_jobsummary',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        this.setState({
          expertset: response.data,
        });
        console.log(this.state.expertset);
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
          <View>
            <DropDownPicker
              items={this.state.skillOptions}
              controller={(instance) => (this.controller = instance)}
              multiple={true}
              // multipleText=
              min={0}
              max={10}
              defaultValue={this.state.skills}
              containerStyle={{height: 50, width: 400, marginRight: 10}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              // onChangeItem={(item) =>
              //   this.setState({
              //     skills: item, // an array of the selected items
              //   })
              //   // console.log(item)
              // }
              onChangeItem={(item) => this.SearchProject(item)}
              value={this.state.skills}
            />
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

const mapDispatchToProps = (dispatch) => {
  return {
    //storeAccessToken: (token) => dispatch(storeAccessToken(token)),
    //updateUserStatus: (status) => dispatch(updateUserStatus(status)),
    updateJobId: (data) => dispatch(updateJobId(data)),
    //updateUserPaymentMethod: (data) => dispatch(updateUserPaymentMethod(data)),
  };
};

export default connect(null, mapDispatchToProps)(StudentProject);
