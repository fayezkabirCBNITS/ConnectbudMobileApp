import React, { Component } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import CommonStyle from '../../../../CommonStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, ProgressBar, Colors } from 'react-native-paper';
import Header from '../../../components/Header'
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequestMultipart } from '../../../services/http-connectors';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';

class SearchProjectStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expertSet: [],
      count: 10,
      btnStatus: false,
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = () => {
    this.Employee();
  };

  Employee = async () => {
    this.setState({
      showLoader: true,
    });
    let body = new FormData();
    body.append("job_id", this.props.navigation.state.params.jobId);
    body.append("type", this.props.navigation.state.params.type);
    body.append("offset", this.state.count);

    let response = await makePostRequestMultipart(ApiUrl.JobRelatedCandidates, false, body);
    if (response) {
      this.setState({
        expertSet: response,
        showLoader: false,
      });
    }
  };

  mailSent = async (user_id, jobID) => {
    this.setState({
      btnStatus: true,
    });
    //localStorage.setItem("notificationId", ID);
    let body = new FormData();
    body.append("user_id", user_id);
    body.append("job_id", jobID);
    body.append("type", this.props.navigation.state.params.type);

    let response = await makePostRequestMultipart(ApiUrl.InvitationMail, false, body);
    if (response) {
      this.Employee();
      this.setState({
        btnStatus: false,
      });
      Toast.show("Invitation sent successfully! Find this candidate in chat section.", Toast.LONG, Toast.CENTER);
    }
  };

  render() {
    return (
      <SafeAreaView style={CommonStyle.safeAreaView}>
        <View style={CommonStyle.main}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <Header />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.Heading} ><Text style={{ color: '#000' }}>Project :</Text> {this.props.navigation.state.params.jobName}</Text>
              <Divider style={styles.divider} />

              {this.state.expertSet.map((value, index) => {
                if (value.message !== "No data found") {
                  return (
                    <View style={CommonStyle.container} key={index}>
                      <View style={styles.subContainer}>
                        <View style={styles.subjectWrapper}>
                          <View style={[styles.leftSection]}>
                            <Image
                              source={{ uri: value.user_image }}
                              style={styles.userImg}
                            />
                          </View>
                          <View style={[styles.rightSection]}>
                            <Text style={styles.boxTitle}>{value.name}</Text>
                            <Text style={styles.subTitle}>{value.department ? value.department : "NA"}</Text>

                            <View style={{ marginBottom: 20 }}>
                              <Text style={{ marginVertical: 5, fontFamily: 'Poppins-Rgular', }}>{value.match_percentage}% matched</Text>
                              <ProgressBar progress={value.match_percentage / 100} color={'#71b85f'} />
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ width: '40%', flexDirection: 'row' }}>
                                <FontAwesome
                                  name="graduation-cap"
                                  color="#71b85f"
                                  size={15}
                                />
                                <Text style={styles.iconText}>Institute :</Text>
                              </View>
                              <View style={{ width: '60%' }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> {value.institute ? value.institute : "NA"} </Text>
                              </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ width: '40%', flexDirection: 'row' }}>
                                <FontAwesome
                                  name="institution"
                                  color="#71b85f"
                                  size={15}
                                />
                                <Text style={styles.iconText}>Prefered :</Text>
                              </View>
                              {value.string_skills.map((item, key) => {
                                if (item.key_skill !== "") {
                                  return (
                                    <View style={{ width: '60%' }}>
                                      <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> {item.key_skill}</Text>
                                    </View>
                                  );
                                } else {
                                  return (
                                    <View style={{ width: '60%' }}>
                                      <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> NA</Text>
                                    </View>
                                  );
                                }
                              }
                              )}
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ width: '40%', flexDirection: 'row', marginLeft: -5, }}>
                                <Entypo
                                  name="location-pin"
                                  color="#71b85f"
                                  size={25}
                                />
                                <Text style={styles.iconText}>Location : </Text>
                              </View>
                              <View style={{ width: '60%' }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> {value.location ? value.location : "NA"}</Text>
                              </View>
                            </View>

                            <View style={styles.btnGrp}>
                              <Text style={[styles.subBtn1, styles.iconText]}>Skills :</Text>
                              {value.job_skills && value.job_skills.length > 0
                                ? value.job_skills.map((skill, index) => {
                                  if (skill.status === "true") {
                                    return (
                                      <View style={styles.checkIcon}>
                                        <FontAwesome
                                          name="check-circle"
                                          color="#71b85f"
                                          size={15}
                                        />
                                        <Text style={styles.subBtn}>{skill.key_skill}</Text>
                                      </View>
                                    );
                                  } else {
                                    return (
                                      <View style={styles.checkIcon}>
                                        <Text style={styles.subBtn2}>{skill.key_skill}</Text>
                                      </View>
                                    );
                                  }
                                }
                                )
                                : "NA"}
                            </View>
                          </View>
                        </View>
                        {value.pending_status === "pending" ||
                          value.pending_status === "accept" ||
                          value.pending_status === "applied" ? (
                            <>
                              {value.pending_status === "pending" ? (
                                <View>
                                  <TouchableOpacity
                                    disabled
                                    style={[styles.authBtn]}>
                                    <Text style={styles.authBtnText}>Invitation sent</Text>
                                  </TouchableOpacity>
                                </View>
                              ) : (
                                  <>
                                    {value.pending_status === "accept" ? (
                                      <View>
                                        <TouchableOpacity
                                          disabled
                                          style={[styles.authBtn]}>
                                          <Text style={styles.authBtnText}>Accepted</Text>
                                        </TouchableOpacity>
                                      </View>
                                    ) : (
                                        <View>
                                          <TouchableOpacity
                                            disabled
                                            style={[styles.authBtn]}>
                                            <Text style={styles.authBtnText}>Applied</Text>
                                          </TouchableOpacity>
                                        </View>
                                      )}
                                  </>
                                )}
                            </>
                          ) : (
                            <>
                              {value.pending_status === "ignored" ? (
                                <View>
                                  <TouchableOpacity
                                    disabled
                                    style={[styles.authBtn]}>
                                    <Text style={styles.authBtnText}>Ignored</Text>
                                  </TouchableOpacity>
                                </View>
                              ) : (
                                  <View>
                                    <TouchableOpacity
                                      activeOpacity={0.8}
                                      onPress={() => this.mailSent(value.user_id, value.job_id)}
                                      disabled={this.state.btnStatus}
                                      style={[styles.authBtn]}>
                                      <Text style={styles.authBtnText}>Invite</Text>
                                    </TouchableOpacity>
                                  </View>
                                )}
                            </>
                          )}
                      </View>
                    </View>
                  );
                }
              })
              }
            </View>
          </ScrollView>
        </View>
      </SafeAreaView >
    )
  }
}

export default SearchProjectStudents
