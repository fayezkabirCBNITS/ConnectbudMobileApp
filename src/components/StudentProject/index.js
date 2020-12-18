import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Picker } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import SearchableDropdown from 'react-native-searchable-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from "react-native-vector-icons/Entypo";

import axios from 'axios';
import { API_URL } from '../../config/url';

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
      selectedItems: [
        {
          id: 7,
          name: 'Go',
        },
        {
          id: 8,
          name: 'Swift',
        }
      ],
      expertset : [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = () => {
    this.feedProjects();
  }


  feedProjects = async () => {
    let taglistbody = new FormData();
    taglistbody.append("user_id", "2519");
    taglistbody.append("type", "freelancer");
    taglistbody.append("skills", "");
    taglistbody.append("search_type", "all");
    taglistbody.append("offset", "0");

    await axios({
      url: API_URL + "expert_jobsummary",
      method: "POST",
      data: taglistbody,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          // lodarStatus: false,
          expertset: response.data,
        });
        this.setState({ isLoading: true });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };


  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <View>
            <SearchableDropdown
              onItemSelect={(item) => {
                alert(item)
                const items = this.state.selectedItems;
                items.push(item)
                this.setState({ selectedItems: items });
              }}
              containerStyle={{ padding: 5 , marginVertical : 15 , width : "90%" , marginHorizontal : "5%" }}
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
              itemsContainerStyle={{ maxHeight: 140  }}
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
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              this.state.expertset.map((item, idx) => (

                <TouchableOpacity key={idx}>
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
                            color="#000"
                            size={15}
                          />
                          <Text style={styles.iconText}>{item.posted_date}</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <FontAwesome
                            name="tag"
                            color="#000"
                            size={15}
                          />
                          <Text style={styles.iconText}>{item.key_skill}</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <FontAwesome
                            name="user"
                            color="#000"
                            size={15}
                          />
                          <Text style={styles.iconText}>{item.match_number}</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <FontAwesome
                            name="search-plus"
                            color="#000"
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
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default StudentProject;
