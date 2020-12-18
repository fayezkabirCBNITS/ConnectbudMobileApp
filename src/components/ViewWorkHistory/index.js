import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Modal,
  Image,
  AsyncStorage
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './style';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';
import { API_URL } from "../../config/url";

class ViewWorkHistory extends Component {
  constructor(props) {
    super();
    this.state = {
      projectData: [],
      selectedProject: "All",
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    //console.log(await AsyncStorage.getItem("user_id"));
    let body = new FormData();
    body.append("hirer_id", "");
    body.append("freelancer_id", "");
    body.append("job_id", "");
    body.append("type", "");
    body.append("page_type", "ongoing");
    body.append("user_id", 2519);

    await axios({
      url: API_URL + "fetchmilestones",
      method: "POST",
      data: body,
    }).then((response) => {
      this.setState({
        projectData: response.data,
      });
    });
  };

  selectType = async (type) => {
    await this.setState({
      selectedProject: type,
    });
    this.filterProject();
  };

  filterProject = async () => {
    let body = new FormData();
    body.append("hirer_id", "");
    body.append("freelancer_id", "");
    body.append("job_id", "");
    body.append("type", "");
    body.append("page_type", "ongoing");
    body.append("user_id", 2519);

    await axios({
      url: API_URL + "fetchmilestones",
      method: "POST",
      data: body,
    }).then((response) => {
      if (response.data[0].message === "No data found") {
        this.setState({
          projectData: response.data
        })
      } else {
        if (this.state.selectedProject === "In Progress") {
          if (response.data.filter(data => data.contract_end === "false")) {
            this.setState({
              projectData: response.data.filter(data => data.contract_end === "false"),
            });
            console.log(this.state.projectData);
          } else {
            this.setState({
              projectData: [{ message: "No data found" }],
            });
            console.log(this.state.projectData);
          }
        } else if (this.state.selectedProject === "Completed") {
          if (response.data.filter(data => data.contract_end === "true")) {
            this.setState({
              projectData: response.data.filter(data => data.contract_end === "true"),
            });
            console.log(this.state.projectData);
          } else {
            this.setState({
              projectData: [{ message: "No data found" }],
            });
            console.log(this.state.projectData);
          }
        } else {
          this.setState({
            projectData: response.data,
          });
        }
      }
    });
  };

  render() {
    return (
      <View style={CommonStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.portfolioHead}>Project Details</Text>
          <View style={styles.formGroup1}>
            <View style={[styles.formSubGroup2, { width: '100%' }]}>
              <Picker
                style={{ width: '100%', height: 45 }}
                selectedValue={this.state.selectedProject}
                onValueChange={(itemValue) => this.selectType(itemValue)}
              >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="In Progress" value="In Progress" />
                <Picker.Item label="Completed" value="Completed" />
              </Picker>
            </View>
          </View>

          {this.state.projectData.length !== 0 ? (
            this.state.projectData.map((value, index) => {
              if (value.message !== "No data found") {
                return (
                  <View style={styles.cardContainer} key={index}>
                    <View style={styles.prodDetails}>
                      <View style={{ width: '85%' }}>
                        <Text style={styles.itemTitle}>
                          Name : <Text style={styles.itemContent}>{value.job_name}</Text>
                        </Text>
                        {value.details.map((item, index) => {
                          if (index < 1) {
                            return (
                              <Text style={styles.itemTitle}>
                                Type : <Text style={styles.itemContent}>{item.project_type}</Text>
                              </Text>
                            )
                          }
                        })}
                        {value.details.map((item, index, arr) => {
                          if (arr.length - 1 === index) {
                            return (
                              <Text style={styles.itemTitle}>
                                Date : <Text style={styles.itemContent}>{item.start_date} - {item.end_date}</Text>
                              </Text>
                            )
                          }
                        })}
                        {value.details.map((item, index, arr) => {
                          if (arr.length - 1 === index) {
                            return (
                              <Text style={styles.itemTitle}>
                                Technologies :{' '}
                                {item.job_skills.map((obj, index) => {
                                  return (
                                    <Text style={styles.itemContent}>{obj.label}</Text>
                                  )
                                })}
                              </Text>
                            )
                          }
                        })}
                        <Text style={styles.itemTitle}>
                          Order Status :{' '}
                          {value.contract_end !== "false" ? (
                            <Text
                              style={[
                                styles.itemContent,
                                { color: '#71b85f', fontFamily: 'Poppins-Regular', },
                              ]}>
                              Completed
                            </Text>
                          ) : (
                              <Text
                                style={[
                                  styles.itemContent,
                                  { color: '#ff9900', fontFamily: 'Poppins-Regular', },
                                ]}>
                                In Progress
                              </Text>
                            )}
                        </Text>
                      </View>
                      <Text style={styles.price}>
                        ${value.total_amount}
                      </Text>
                    </View>
                  </View>
                )
              } else {
                return (
                  <View style={styles.noData}>
                    <Image source={require('../../assets/images/noData.png')} />
                    <Text style={styles.noDataText}>No Data Found</Text>
                  </View>
                );
              }
            })
          ) : (
              <View style={styles.noData}>
                <Image source={require('../../assets/images/noData.png')} />
                <Text style={styles.noDataText}>No Data Found</Text>
              </View>
            )}
        </ScrollView>
      </View>
    );
  }
}

export default ViewWorkHistory;
