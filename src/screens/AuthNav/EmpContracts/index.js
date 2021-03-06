import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Header from '../../../components/Header';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import axios from 'axios';
import {API_URL} from '../../../config/url';
import {connect} from 'react-redux';

import base64 from 'base-64';

class EmpContactScreen extends Component {
  constructor() {
    super();
    this.state = {
      projectData: [],
      user_id: '',
      milestone_id: '',
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  newFunction = async () => {
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
      this.setState({
        projectData: response.data,
        showLoader: false,
      });
    });
  };

  componentDidMount = async () => {
    this.newFunction();
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', async () => {
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
      body.append(
        'user_id',
        base64.decode(userDeatailResponse.userData.user_id),
      );

      await axios({
        url: API_URL + 'fetchmilestones',
        method: 'POST',
        data: body,
      }).then((response) => {
        this.setState({
          projectData: response.data,
          showLoader: false,
        });
      })
      .catch((error) => {
        this.setState({
          showLoader: false
        })
        
      })
    });
  };

  moneyRequest = async (mileId, Status) => {
    this.setState({
      btnStatus: true,
      showLoader: true,
    });
    const obj = {
      milestone_id: mileId,
      type: 'employer',
    };

    await axios
      .post(API_URL + 'freelancer_redeem', obj, {
        header: {
          'content-Type': 'application/json',
        },
      })
      .then(async (response) => {
        // this.props.history.push("/hirerchat");
        if (Status === 'free') {
          alert('You have successfully confirmed the request');
        } else {
          alert('You have successfully released the money to the student!');
        }
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
          this.setState({
            projectData: response.data,
            showLoader: false,
          });
        });

        this.setState({isLoading: false});
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <Spinner
          visible={this.state.showLoader}
          animation="fade"
          textContent={'Loading...'}
        />
        <View style={CommonStyles.main}>
          <StatusBar />
          {/* header section */}
          <Header />
          {/* header section end */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              <Text style={styles.heading}>Ongoing Projects</Text>
              {/* project 1 */}

              {/* project 2 */}
              {this.state.projectData.map((item, i) => {
                if (item.message !== 'No data found') {
                  return (
                    <>
                      <Collapse isCollapsed={true} style={styles.collapse}>
                        <CollapseHeader>
                          <View style={styles.projOptn}>
                            <View style={styles.questions}>
                              <Text style={styles.questionsText}>
                                Project Name :
                              </Text>
                              <Text style={styles.questionsTextGreen}>
                                {item.job_name}
                              </Text>
                            </View>
                            {/* <View style={styles.milestoneSec}>
                            <TouchableOpacity style={styles.milestoneBtn}>
                              <Text style={styles.contractText}>
                                Add Milestones
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contractBtn}>
                              <Text style={styles.contractText}>
                                End Contract
                              </Text>
                            </TouchableOpacity>
                          </View> */}
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          {/* {this.state.projectData.map((item, index) => (
                    <> */}
                          {item.details.map((value, index) => (
                            <View style={styles.detailsSec}>
                              <View style={styles.detailsField}>
                                <Text style={styles.deatailsHdng}>
                                  Type of Project
                                </Text>
                                <Text style={styles.deatailsInfo}>
                                  {' '}
                                  {value.project_type} {index + 1}
                                </Text>
                              </View>
                              <View style={styles.detailsField}>
                                <Text style={styles.deatailsHdng}>
                                  Project Timeline
                                </Text>
                                <Text style={styles.deatailsInfo}>
                                  {value.end_date}
                                </Text>
                              </View>
                              <View style={styles.detailsField}>
                                <Text style={styles.deatailsHdng}>
                                  Description
                                </Text>
                                <Text style={styles.deatailsInfo}>
                                  {value.description}
                                </Text>
                              </View>
                              <View style={styles.detailsField}>
                                <Text style={styles.deatailsHdng}>Amount</Text>
                                <Text style={styles.deatailsInfo}>
                                  ${value.received_amount}
                                </Text>
                              </View>
                              <View style={styles.detailsField}>
                                <Text style={styles.deatailsHdng}>Action</Text>
                                <TouchableOpacity style={styles.notPaidBtn}>
                                  {value.payment_status === 'Not paid' && (
                                    <Text
                                      // style={styles.notPaidBtn}
                                      onPress={() =>
                                        this.props.navigation.navigate(
                                          'CheckoutScreen',
                                          {
                                            mile_id: value.milestone_id,
                                            user_id: item.freelancer_id,
                                            rec_id: item.hirer_id,
                                          },
                                        )
                                      }>
                                      $ Pay
                                    </Text>
                                  )}
                                  {value.payment_status === 'Redeem' &&
                                    value.class_status !== 'free' && (
                                      <Text
                                        style={styles.paidText}
                                        onPress={() => {
                                          this.moneyRequest(value.milestone_id);
                                        }}>
                                        Release
                                      </Text>
                                    )}
                                  {value.payment_status === 'Redeem' &&
                                    value.class_status === 'free' && (
                                      <Text style={styles.paidText}>
                                        Click after completion
                                      </Text>
                                    )}
                                  {value.payment_status === 'Escrow' &&
                                    value.class_status !== 'free' && (
                                      <Text style={styles.paidText}>
                                        Escrowed
                                      </Text>
                                    )}
                                  {value.payment_status === 'Escrow' &&
                                    value.class_status === 'free' && (
                                      <Text style={styles.paidText}>
                                        Click after completion
                                      </Text>
                                    )}
                                  {value.payment_status === 'Paid' &&
                                    value.class_status !== 'free' && (
                                      <Text style={styles.paidText}>$Paid</Text>
                                    )}
                                  {value.payment_status === 'Paid' &&
                                    value.class_status === 'free' && (
                                      <Text style={styles.paidText}>
                                        Confirmed
                                      </Text>
                                    )}
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={styles.notPaidBtn}>
                        <Text style={styles.paidText}>$ Pay</Text>
                      </TouchableOpacity> */}
                              </View>
                            </View>
                          ))}
                          {/* </>
                  ))} */}
                        </CollapseBody>
                      </Collapse>
                    </>
                  );
                } else {
                  return (
                    <View style={styles.noData}>
                      <Text style={styles.noDataText}>
                        No ongoing project found
                      </Text>
                    </View>
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// export default EmpContactScreen;

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

export default connect(
  mapStateToProps,
  mapDispatch,
)(withNavigation(EmpContactScreen));
