import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './style';
import { Picker } from '@react-native-community/picker';
import ApiUrl from '../../config/ApiUrl';
import { makePostRequestMultipart } from '../../services/http-connectors';
import Spinner from 'react-native-loading-spinner-overlay';

class ViewWorkHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: [],
      selectedProject: "All",
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    let body = new FormData();
    body.append("hirer_id", "");
    body.append("freelancer_id", "");
    body.append("job_id", "");
    body.append("type", "");
    body.append("page_type", "ongoing");
    body.append("user_id", this.props.freeId);

    let response = await makePostRequestMultipart(ApiUrl.FetchMilestones, false, body);
    if (response) {
      this.setState({
        projectData: response,
      });
    }
  };

  selectType = async (type) => {
    await this.setState({
      selectedProject: type,
    });
    this.filterProject();
  };

  filterProject = async () => {
    this.setState({ showLoader: true })
    let body = new FormData();
    body.append("hirer_id", "");
    body.append("freelancer_id", "");
    body.append("job_id", "");
    body.append("type", "");
    body.append("page_type", "ongoing");
    body.append("user_id", this.props.freeId);

    let response = await makePostRequestMultipart(ApiUrl.FetchMilestones, false, body);
    if (response) {
      this.setState({ showLoader: false })
      if (response[0].message === "No data found") {
        this.setState({
          projectData: response
        })
      } else {
        if (this.state.selectedProject === "In Progress") {
          if (response.filter(data => data.contract_end === "false")) {
            this.setState({
              projectData: response.filter(data => data.contract_end === "false"),
            });
          } else {
            this.setState({
              projectData: [{ message: "No data found" }],
            });
          }
        } else if (this.state.selectedProject === "Completed") {
          if (response.filter(data => data.contract_end === "true")) {
            this.setState({
              projectData: response.filter(data => data.contract_end === "true"),
            });
          } else {
            this.setState({
              projectData: [{ message: "No data found" }],
            });
          }
        } else {
          this.setState({
            projectData: response,
          });
        }
      }
    } else {
      this.setState({ showLoader: false })
    }
  };

  render() {
    return (
      <View style={CommonStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <Text style={styles.portfolioHead}>Project Details</Text>
          <View style={styles.formGroup1}>
            <View style={[styles.formSubGroup2, { width: '100%', overflow: 'hidden', height: 50, }]}>
              <Picker
                style={{ width: '100%', height: 45, marginTop: -80 }}
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
                              <Text style={styles.itemTitle} key={index}>
                                Type : <Text style={styles.itemContent}>{item.project_type}</Text>
                              </Text>
                            )
                          }
                        })}
                        {value.details.map((item, index, arr) => {
                          if (arr.length - 1 === index) {
                            return (
                              <Text style={styles.itemTitle} key={index}>
                                Date : <Text style={styles.itemContent}>{item.start_date} - {item.end_date}</Text>
                              </Text>
                            )
                          }
                        })}
                        {value.details.map((item, index, arr) => {
                          if (arr.length - 1 === index) {
                            return (
                              <Text style={styles.itemTitle} key={index}>
                                Technologies :{' '}
                                {item.job_skills.map((obj, index) => {
                                  return (
                                    <Text style={styles.itemContent} key={index}>{obj.label}</Text>
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
