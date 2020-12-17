import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';


import axios from 'axios';
import {API_URL} from '../../config/url';
import {Value} from 'react-native-reanimated';

class SearchClgStu extends Component {
  constructor() {
    super();
    this.state = {
      showSkills: false,
      skillsData: [
        {title: 'C'},
        {title: 'JAVA'},
        {title: 'C++'},
        {title: 'C#'},
      ],
      FreelancerSet: [],
      skillOptions: [],
    };
  }

  SkillSearch = async () => {
    await axios.get(API_URL + 'keyskill/recruiter').then((response) => {
      this.setState({
        skillOptions: response.data,
      });
    });
  };

  handleSkills = async () => {
    this.setState({showSkills: !this.state.showSkills});
  };

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = () => {
    this.AllEmployee();
    this.SkillSearch();
  };

  AllEmployee = async () => {
    let body = new FormData();
    body.append('user_id', '');
    body.append('job_id', '');
    body.append('skillset', '');
    body.append('status', '');
    body.append('search_type', 'all');
    body.append('experience', '');
    body.append('relocate', '');
    body.append('job_type', '');
    body.append('job_location', '');
    body.append('key_skill', '');
    body.append('offset', '0');
    body.append('type', 'freelancer');

    await axios({
      url: API_URL + 'recruiter_feedpage',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        this.setState({
          // lodarStatus: false,
          FreelancerSet: response.data.sort(function (a, b) {
            if (a.avg_rating > b.avg_rating) return -1;
            else if (a.avg_rating > b.avg_rating) return 1;
            return 0;
          }),
        });
        console.log(this.state.FreelancerSet);
        // this.setState({
        //   uniqueSkill: [
        //     ...new Set(
        //       this.state.uniqueSkill.concat(
        //         ...new Set(
        //           this.state.expertSet.map((obj) =>
        //             obj.string_skills.split(",")
        //           )
        //         )
        //       )
        //     ),
        //   ],
        //   uniqueLocation: [
        //     ...new Set(this.state.expertSet.map((obj) => obj.location)),
        //   ],
        // });
      })
      .catch((error) => {
        console.log('errors');
      });
  };

  render() {
    const renderSkillItems = ({item}) => (
      <TouchableOpacity style={styles.headSec}>
        <View style={styles.details}>
          <Text style={styles.flastListHead}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <Text style={styles.title}>Search</Text>
          <View style={styles.skillView}>
            <View style={[styles.formGroup1]}>
              <View style={[styles.formSubGroup2, { flexWrap: 'wrap' }]}>
                <TextInput
                  returnKeyType="done"
                  placeholder="Java"
                  style={styles.inputGroup}
                  keyboardType="default"
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <FontAwesome
                  name="angle-down"
                  size={28}
                  color="#d7d7d8"
                  onPress={() => this.handleSkills()}
                />
              </View>
            </View>
          </View>
          {this.state.showSkills === true ? (
            <View style={[styles.flatList, {marginTop: -15}]}>
              <FlatList
                data={this.state.skillsData}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={renderSkillItems}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ) : (
            <></>
          )}
          <Text style={styles.title}>College Student List</Text>
          <ScrollView>
          {this.state.FreelancerSet.map((item, i) => {
            return (
              <TouchableOpacity style={{marginTop: -5}}>
                <View style={CommonStyles.container}>
                  <View style={styles.subjectWrapper}>
                    <View style={[styles.leftSection]}>
                      <Image
                        source={{uri: item.user_image}}
                        style={styles.userImg}
                      />
                    </View>
                    <View style={styles.rightSection}>
                      <Text style={styles.boxTitle}>{item.name}</Text>
                      <View style={[styles.flexstyle, styles.timeAgo]}>
                        <FontAwesome
                          name="graduation-cap"
                          color="#71b85f"
                          size={15}
                        />
                        <Text style={styles.iconText}>
                          Institute :<Text> {item.institute}</Text>
                        </Text>
                      </View>
                      <View style={[styles.flexstyle, styles.timeAgo]}>
                        <FontAwesome
                          name="institution"
                          color="#71b85f"
                          size={15}
                        />
                        <Text style={styles.iconText}>
                          Prefered :<Text> {item.prefferedskill}</Text>
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.flexstyle,
                          styles.timeAgo,
                          {marginLeft: -5},
                        ]}>
                        <Entypo name="location-pin" color="#71b85f" size={25} />
                        <Text style={styles.iconText}>
                          Location :<Text> {Value.location}</Text>
                        </Text>
                      </View>
                      {item.skillset.map((value, i) => (
                        <View style={styles.btnGrp}>
                          <TouchableOpacity style={styles.subBtn}>
                            <Text style={styles.btnText}>
                              {value.skill_name}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default SearchClgStu;
