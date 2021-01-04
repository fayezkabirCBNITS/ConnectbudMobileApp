import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import axios from 'axios';
import {API_URL} from '../../../config/url';
import {connect} from 'react-redux';
import base64 from 'base-64';

import Spinner from 'react-native-loading-spinner-overlay';

class FreeContactScreen extends Component {
  constructor() {
    super();
    this.state = {
      projectData: [],
      showLoader: false,
      user_id: '',
      mileData: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    const {userDeatailResponse} = this.props;
    this.setState({
      showLoader: true,
      user_id: base64.decode(userDeatailResponse.userData.user_id),
    });
    let body = new FormData();
    body.append('hirer_id', '');
    body.append('freelancer_id', '');
    body.append('job_id', '');
    body.append('type', '');
    body.append('page_type', 'ongoing');
    body.append('user_id', base64.decode(userDeatailResponse.userData.user_id));

    await axios({
      url: API_URL + 'fetchmilestones',
      method: 'POST',
      data: body,
    }).then((response) => {
      console.log(response.data[0].message);
      this.setState({
        projectData: response.data,
        mileData: response.data[0].details,
      });
      console.log(this.state.mileData);
    });

    let taglist = new FormData();
    taglist.append(
      'user_id',
      base64.decode(userDeatailResponse.userData.user_id),
    );

    await axios({
      url: API_URL + 'freelancer_transaction',
      method: 'POST',
      data: taglist,
    }).then((res) => {
      console.log(res);
      // this.setState({
      //   amount: res.data,
      // });
    });
  };

  milestone = async () => {
    let body = new FormData();
    body.append('hirer_id', '');
    body.append('freelancer_id', '');
    body.append('job_id', '');
    body.append('type', '');
    body.append('page_type', 'ongoing');
    body.append('user_id', this.state.user_id);

    await axios({
      url: API_URL + 'fetchmilestones',
      method: 'POST',
      data: body,
    }).then((response) => {
      if (response.data[0].message === 'No data found') {
        this.setState({
          projectData: response.data,
          mileData: []
        });
      } else {
        this.setState({
          projectData: response.data,
          mileData: response.data[0].details,
        });
      }
      console.log("mileData",this.state.mileData);
    });
  };

  moneyRequest = async (mileId, Status) => {
    console.log(mileId);
    this.setState({
      btnStatus: true,
      SWAL: Status,
    });
    const obj = {
      milestone_id: mileId,
      type: 'freelancer',
    };

    await axios
      .post(API_URL + 'freelancer_redeem', obj, {
        header: {
          'content-Type': 'application/json',
        },
      })
      .then((response) => {
        this.milestone();
        // localStorage.setItem("acceptStatus", "true");
        if (this.state.SWAL === 'free') {
          console.log('if called');
          alert(
            'your request for confirmation has been submitted successfully',
          );
        } else {
          alert(
            'Successfully sent the request to release the money from escrow!',
          );
        }
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar />
          {/* header section */}
          <View style={CommonStyles.header}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NotificationScreen')
              }
              style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              <Text style={styles.heading}>Ongoing Projects</Text>
              {/* project 1 */}
              <Collapse style={styles.collapse}>
                {this.state.projectData.map((data, i) => {
                  if (data.message !== 'No data found') {
                    return (
                      <CollapseHeader>
                        <View style={styles.questions}>
                          <Text style={styles.questionsText}>
                            Project Name :
                          </Text>
                          <Text style={styles.questionsTextGreen}>
                            {data.job_name}
                          </Text>
                        </View>
                      </CollapseHeader>
                    );
                  } else {
                    return (
                      <CollapseHeader>
                        <View style={styles.noData}>
                          <Image
                            source={require('../../../assets/images/noData.png')}
                          />
                          <Text style={styles.noDataText}>No Data Found</Text>
                        </View>
                      </CollapseHeader>
                    );
                  }
                })}
                <CollapseBody>
                  {this.state.mileData !== undefined ? (
                    <>
                      {this.state.mileData.map((data, i) => (
                        <View style={styles.detailsSec}>
                          <View style={styles.detailsField}>
                            <Text style={styles.deatailsHdng}>
                              Type of Project
                            </Text>
                            <Text style={styles.deatailsInfo}>
                              {data.project_type}
                              {data.milestone_number}
                            </Text>
                          </View>
                          <View style={styles.detailsField}>
                            <Text style={styles.deatailsHdng}>
                              Project Timeline
                            </Text>
                            <Text style={styles.deatailsInfo}>
                              {data.end_date}
                            </Text>
                          </View>
                          <View style={styles.detailsField}>
                            <Text style={styles.deatailsHdng}>Description</Text>
                            <Text style={styles.deatailsInfo}>
                              {data.description}
                            </Text>
                          </View>
                          <View style={styles.detailsField}>
                            <Text style={styles.deatailsHdng}>Amount</Text>
                            <Text style={styles.deatailsInfo}>
                              ${data.amount}
                            </Text>
                          </View>
                          <View style={styles.detailsField}>
                            <Text style={styles.deatailsHdng}>Action</Text>

                            <TouchableOpacity style={styles.paidBtn}>
                              {data.payment_status === 'Not paid' && (
                                <Text style={styles.paidText}>Not paid</Text>
                              )}

                              {data.payment_status === 'Escrow' &&
                                data.class_status !== 'free' && (
                                  <Text
                                    style={styles.paidText}
                                    onPress={() => {
                                      this.moneyRequest(data.milestone_id);
                                    }}>
                                    Request to release money
                                  </Text>
                                )}

                              {data.payment_status === 'Escrow' &&
                                data.class_status === 'free' && (
                                  <Text style={styles.paidText}>
                                    Request after completion
                                  </Text>
                                )}

                              {data.payment_status === 'Pending' && (
                                <Text style={styles.paidText}>Pending</Text>
                              )}

                              {data.payment_status === 'Redeem' && (
                                <Text style={styles.paidText}>Pending</Text>
                              )}

                              {data.payment_status === 'Paid' && (
                                <Text style={styles.paidText}>Paid</Text>
                              )}
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </CollapseBody>
              </Collapse>

              {/* project 2 */}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// export default FreeContactScreen;

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    //storeAccessToken: (token) => dispatch(storeAccessToken(token)),
    //updateUserStatus: (status) => dispatch(updateUserStatus(status)),
    // updateJobId: (data) => dispatch(updateJobId(data)),
    //updateUserPaymentMethod: (data) => dispatch(updateUserPaymentMethod(data)),
  };
};

export default connect(mapStateToProps, mapDispatch)(FreeContactScreen);
