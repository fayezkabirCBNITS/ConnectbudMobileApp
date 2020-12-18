import React, { Component } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';
import SearchableDropdown from 'react-native-searchable-dropdown';


import axios from 'axios';
import { API_URL } from '../../config/url';
import { Value } from 'react-native-reanimated';

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

class SearchClgStu extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [
        {
          id: 7,
          name: 'Go',
        },
        {
          id: 8,
          name: 'Swift',
        }
      ]
    };
  }


  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = () => {
    this.AllEmployee();
    //this.SkillSearch();
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
    const renderSkillItems = ({ item }) => (
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
          <View>
            <SearchableDropdown
              onItemSelect={(item) => {
                alert(item)
                const items = this.state.selectedItems;
                items.push(item)
                this.setState({ selectedItems: items });
              }}
              containerStyle={{ padding: 5, marginVertical: 15, width: "90%", marginHorizontal: "5%" }}
              // onRemoveItem={(item, index) => {
              //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
              //   this.setState({ selectedItems: items });
              // }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={items}
              defaultIndex={2}
              resetValue={false}
              textInputProps={
                {
                  placeholder: "Search your project",
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                  // onTextChange: text => alert(text)
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
            />
          </View>

          <Text style={styles.title}>College Student List</Text>
          <TouchableOpacity style={{ marginTop: -5 }}>
            <View style={CommonStyles.container}>
              <View style={styles.subjectWrapper}>
                <View style={[styles.leftSection]}>
                  <Image
                    source={require('../../assets/images/userPro.jpg')}
                    style={styles.userImg}
                  />
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.boxTitle}>Angad Kumar</Text>
                  <View style={[styles.flexstyle, styles.timeAgo]}>

                    <FontAwesome
                      name="graduation-cap"
                      color="#71b85f"
                      size={15}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={styles.iconText}>Institute :</Text><Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> San Jose</Text>
                    </View>

                  </View>
                  <View style={[styles.flexstyle, styles.timeAgo]}>

                    <FontAwesome
                      name="institution"
                      color="#71b85f"
                      size={15}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={styles.iconText}>Prefered :</Text><Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> Data Science</Text>
                    </View>
                  </View>
                  <View style={[styles.flexstyle, styles.timeAgo, { marginLeft: -5, }]}>
                    <Entypo
                      name="location-pin"
                      color="#71b85f"
                      size={25}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={styles.iconText}>Location :</Text><Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> Kolkata, India</Text>
                    </View>
                  </View>
                  <View style={styles.btnGrp}>
                    <TouchableOpacity style={styles.subBtn}>
                      <Text style={styles.btnText}>Python</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBtn}>
                      <Text style={styles.btnText}>Hive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBtn}>
                      <Text style={styles.btnText}>React</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default SearchClgStu;
