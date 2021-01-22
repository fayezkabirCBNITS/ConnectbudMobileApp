import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {connect} from 'react-redux';
import {
  makePostRequest,
  makePostRequestMultipart,
} from '../../../services/http-connectors';
import base64 from 'base-64';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

import {API_URL} from '../../../config/url';

class HomeworkHireStudentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      proposed_amount: this.props.navigation.state.params
        ? this.props.navigation.state.params.proposed_amount
        : '0',
      job_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.job_id
        : '',
      token: this.props.navigation.state.params
        ? this.props.navigation.state.params.token
        : '',
      receiver_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.receiver_id
        : '',
      projectDetails: '',
      hireType: 'milestone',
      addMilestone: [],
      count: 0,
      allAmount: [],
      amount: '',
      projectAmount: '',
      TotalprojectAmount: 0,
      projecttimeline: '',
      allDescription: [],
      description: '',
      ProjectExpiry: '',
      timeline: '',
      showLoader: false,
      showStartDatePicker: false,
      projecttimeline: '',
      JobExpiry: new Date(),
      activeIndex: '',
      allTime: [],
      Date: [],
      StartDate: ''
    };
    let webSocketConnection = `wss://kt9fns6g34.execute-api.us-west-1.amazonaws.com/Prod?user=${base64.decode(
      this.props.userDeatailResponse.user_id,
    )}`;
    this.socket = new WebSocket(webSocketConnection);
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    this.getProject();
    // start

    let body = new FormData();

    body.append(
      'hirer_id',
      parseInt(base64.decode(this.props.userDeatailResponse.user_id)),
    );
    body.append('freelancer_id', this.state.receiver_id);
    body.append('job_id', this.state.job_id);
    body.append('proposed_amount', parseInt(this.state.proposed_amount));
    await axios({
      url: API_URL + 'get_milestones',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        this.setState({
          addMilestone: response.data[0].details,
          mileDate: response.data[0].details.map((item) => item.end_date)
          // apiDate: response.data.map((obj) =>
          //   obj.details.map((item) => item.end_date),
          // ),
          // count: response.data[0].details.length,
          // category: response.data[0].category,
        });
      })
      .catch((error) => {
      });
  };

  getProject = async () => {
    let body = {
      user_id: this.state.receiver_id,
      job_id: this.state.job_id,
      token: this.state.token,
      type: 'freelancer',
      device_type: 'mobile',
    };
    let response = await makePostRequest('imageGet', false, body);
    this.setState({
      projectDetails: response[0],
    });
  };
  showDateTimePicker = () => {
    this.setState({showStartDatePicker: true});
  };
  showDateTimePickerMilestone = (index) => {
    this.setState({activeIndex: index});
  };

  hideDateTimePicker = () => {
    this.setState({showStartDatePicker: false});
  };

  handleProjectDate = (date) => {
  };
  // addSection = () => {
  //   this.setState({
  //     addMilestone: [...this.state.addMilestone, ''],
  //     count: this.state.count + 1,
  //   });
  // };

  handleCTC = async (e) => {
    const re = /^[0-9\b]+$/;
    if (e === '' || re.test(e)) {
      await this.setState({amount: e});
      this.setState({
        TotalprojectAmount: this.state.amount,
      });
    }
    //this.validateProjectForm();
  };
  projecthandleChange = async (e) => {
    this.state.allDescription = e;
    await this.setState({
      description: this.state.allDescription,
    });
    //this.validateProjectForm();
  };

  projectsendRequest = async () => {
  
    this.setState({
      showLoader: true,
    });
    let body = new FormData();
    body.append('job_id', this.state.job_id);
    body.append('room_id', this.state.job_id + '_' + this.state.receiver_id);
    body.append('type', 'freelancer');
    body.append(
      'hirer_id',
      base64.decode(this.props.userDeatailResponse.user_id),
    );
    body.append('freelancer_id', this.state.receiver_id);
    body.append('amount', this.state.amount);
    body.append('milestone_amount', this.state.amount);
    body.append('currency', 'USD');
    body.append('description', this.state.description.toString());
    body.append('project_type', this.state.hireType);
    body.append('expiry_date', this.state.projecttimeline);
    let response = await makePostRequestMultipart('hirerform', false, body);
    if (response) {
      this.setState({
        showLoader: false,
      });
      Toast.show('Hiring request sent successfully', Toast.LONG);
      this.props.navigation.navigate('ChatScreen');
    }
    //if(response)
    //  this.props.history.push("/hirerchat");
    var payload = {
      action: 'sendmessage',
      data: 'notification',
      to_user: this.state.receiver_id,
    };
    this.socket.send(JSON.stringify(payload));
  };

  handleChange = async (e, index) => {
    this.state.allDescription[index] = e;
    await this.setState({
      description: this.state.allDescription,
    });
    //this.validateJobForm();
  };
  handleAmount = async (e, index) => {
    const re = /^[0-9\b]+$/;
    if (e === '' || re.test(e)) {
      this.state.allAmount[index] = e;
      await this.setState({amount: this.state.allAmount});
      await this.setState({
        projectAmount: this.state.amount.toString().split(','),
      });
      var sum = 0;
      for (var i = 0; i < this.state.projectAmount.length; i++) {
        sum += parseInt(this.state.projectAmount[i].toString().match(/(\d+)/));
      }
      await this.setState({
        TotalprojectAmount: sum,
      });
    }
  };
  sendRequest = async () => {
    this.setState({
      showLoader: true,
    });
    let body = new FormData();
    body.append('job_id', this.state.job_id);
    body.append('room_id', parseInt(this.state.job_id) + '_' + parseInt(this.state.receiver_id));
    body.append('type', 'freelancer');
    body.append(
      'hirer_id',
      parseInt(base64.decode(this.props.userDeatailResponse.user_id)),
    );
    body.append('freelancer_id', this.state.receiver_id);
    body.append('amount', '');
    body.append('milestone_amount', '');
    body.append('currency', '');
    body.append('description', '');
    body.append('project_type', '');
    body.append('expiry_date', '');

    let response = await makePostRequestMultipart('hirerform', false, body);
    this.setState({
      showLoader: false,
    });
    Toast.show('Hiring request sent successfully', Toast.LONG);
    this.props.navigation.navigate('ChatScreen');
    var payload = {
      action: 'sendmessage',
      data: 'notification',
      to_user: this.state.receiver_id,
    };
    this.socket.send(JSON.stringify(payload));
  };

  handleDate = async (date, index) => {

    this.state.allTime[index] = moment(date).format('DD-MM-yyyy');
    this.state.Date[index] = moment(date).format('DD/MM/yyyy');
    await this.setState({
      JobExpiry: this.state.allTime,
    });
    await this.setState({
      timeline: this.state.Date,
    });
    this.setState({showStartDatePicker: false});
    //this.validateJobForm();
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
            {/* <TouchableOpacity style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity> */}
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              <View style={styles.projectTab}>
                <View>
                  <Text style={styles.projectName}>
                    Project Name : {this.state.projectDetails.project_name}
                  </Text>
                  <Text style={styles.budget}>
                    Budget :{' '}
                    <Text style={styles.bold}>
                      ${this.state.proposed_amount}
                    </Text>{' '}
                    USD
                  </Text>
                </View>
                <View style={styles.userImg}>
                  <View style={styles.imgSec}>
                    <Image
                      source={{uri: this.state.projectDetails.user_image}}
                      style={CommonStyles.image}
                    />
                  </View>
                  <Text style={styles.userName}>
                    {this.state.projectDetails.user_name}
                  </Text>
                </View>
              </View>
              <View style={styles.collapseCntn}>
                <View style={styles.questionHead}>
                  <View style={styles.number}>
                    <Text style={styles.numberText}>1</Text>
                  </View>
                  <Text style={styles.questionText}>How you want to pay?</Text>
                </View>

                <TouchableOpacity
                  onPress={() => this.setState({hireType: 'milestone'})}
                  style={styles.radioSec}>
                  {this.state.hireType == 'milestone' ? (
                    <Fontisto
                      name="radio-btn-active"
                      size={18}
                      color="#71b85f"
                    />
                  ) : (
                    <Fontisto name="radio-btn-passive" size={18} color="#000" />
                  )}
                  <Text
                    style={
                      this.state.hireType == 'milestone'
                        ? styles.radioTextGreen
                        : styles.radioText
                    }>
                    Milestone Payment
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({hireType: 'project', count: ''})
                  }
                  style={styles.radioSec}>
                  {this.state.hireType == 'project' ? (
                    <Fontisto
                      name="radio-btn-active"
                      size={18}
                      color="#71b85f"
                    />
                  ) : (
                    // <Fontisto name="radio-btn-passive" size={18} color="#000" />
                    <></>
                  )}
                  {/* <Text
                    style={
                      this.state.hireType == 'project'
                        ? styles.radioTextGreen
                        : styles.radioText
                    }>
                    One-off Payment
                  </Text> */}
                </TouchableOpacity>
                {this.state.hireType == 'milestone' ? (
                  <>
                    <View style={[styles.questionHead, styles.marTop20]}>
                      <View style={styles.number}>
                        <Text style={styles.numberText}>2</Text>
                      </View>
                      <Text style={styles.questionText}>
                        Please review the milestones :
                      </Text>
                    </View>

                    {/* <TouchableOpacity
                      style={styles.button}
                      onPress={this.addSection}>
                      <Text style={styles.buttonText}>+ Add Milestone</Text>
                    </TouchableOpacity> */}
                    {this.state.addMilestone.map((item, index) => {
                      return (
                        <View style={styles.inputCard}>
                          <View style={styles.wrap}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                              style={styles.des}
                              // onChangeText={(e) => this.handleChange(e, index)}
                              value={item.description}
                              editable={false}
                            />
                          </View>
                          <View style={styles.wrap}>
                            <Text style={styles.label}>Due Date</Text>

                            <TouchableOpacity
                              style={styles.date}
                              onPress={this.showDateTimePicker}
                              disabled = {true}
                              >
                              {/* <Text>{this.state.StartDate === "" ? item.end_date : this.state.JobExpiry[index]}</Text> */}
                              <Text>{item.end_date}</Text>
                              <View style={{position: 'absolute', right: 15}}>

                                <FontAwesome
                                  name="calendar"
                                  size={30}
                                  color="#71b85f"
                                />
                              </View>
                            </TouchableOpacity>
                            <DateTimePicker
                              minimumDate={new Date()}
                              isVisible={this.state.showStartDatePicker}
                              onConfirm={(date) => this.handleDate(date,index)}
                              onCancel={this.hideDateTimePicker}
                              
                            />
                          </View>
                          <View style={styles.wrap}>
                            <Text style={styles.label}>Start Time</Text>
                            <TextInput
                              style={styles.des}
                              // onChangeText={(e) => this.handleChange(e, index)}
                              value={item.start_time}
                              editable={false}
                            />
                          </View>
                          <View style={styles.wrap}>
                            <Text style={styles.label}>End Time</Text>
                            <TextInput
                              style={styles.des}
                              // onChangeText={(e) => this.handleChange(e, index)}
                              value={item.end_time}
                              editable={false}
                            />
                          </View>
                          <View style={styles.wrap}>
                            <Text style={styles.label}>Amount</Text>
                            <TextInput
                              keyboardType={'number-pad'}
                              // onChangeText={(e) => this.handleAmount(e, index)}
                              value={item.received_amount}
                              maxLength={7}
                              style={[styles.des, {paddingRight: 50}]}
                              editable={false}
                            />
                            <FontAwesome
                              name="dollar"
                              color="#71b85f"
                              size={30}
                              style={{
                                position: 'absolute',
                                right: 15,
                                bottom: 10,
                              }}
                            />
                          </View>
                        </View>
                      );
                    })}
                    {this.state.addMilestone.length > 0 ? (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={this.sendRequest}>
                        <Text style={styles.buttonText}>Send Contract</Text>
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </>
                ) : this.state.hireType == 'project' ? (
                  <>
                    <View style={[styles.questionHead, styles.marTop20]}>
                      <View style={styles.number}>
                        <Text style={styles.numberText}>2</Text>
                      </View>
                      <Text style={styles.questionText}>
                        Please Fill in the details
                      </Text>
                    </View>
                    <View style={styles.inputCard}>
                      <View style={styles.wrap}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                          onChangeText={(e) => this.projecthandleChange(e)}
                          style={styles.des}
                        />
                      </View>
                      <View style={styles.wrap}>
                        <Text style={styles.label}>Due Date</Text>
                        <TouchableOpacity
                          style={styles.date}
                          onPress={this.showDateTimePicker}>
                          <Text>{this.state.projecttimeline}</Text>
                          <View style={{position: 'absolute', right: 15}}>
                            <FontAwesome
                              name="calendar"
                              size={30}
                              color="#71b85f"
                            />
                          </View>
                        </TouchableOpacity>
                        <DateTimePicker
                          isVisible={this.state.showStartDatePicker}
                          mode="date"
                          onConfirm={(date) =>
                            this.setState({
                              projecttimeline: moment(date).format(
                                'DD/MM/yyyy',
                              ),
                            })
                          }
                          onCancel={() =>
                            this.setState({showStartDatePicker: false})
                          }
                          minimumDate={
                            this.state.projecttimeline === ''
                              ? new Date()
                              : new Date(this.state.projecttimeline)
                          }
                        />
                      </View>
                      <View style={styles.wrap}>
                        <Text style={styles.label}>Amount</Text>
                        <TextInput
                          keyboardType={'number-pad'}
                          onChangeText={(e) => this.handleCTC(e)}
                          value={this.state.amount}
                          maxLength={7}
                          style={[styles.des, {paddingRight: 50}]}
                        />
                        <FontAwesome
                          name="dollar"
                          color="#71b85f"
                          size={30}
                          style={{position: 'absolute', right: 15, bottom: 10}}
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.projectsendRequest}>
                      <Text style={styles.buttonText}>Send Contract</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <></>
                )}
              </View>

              <View style={styles.tab}>
                <View style={styles.summaryTab}>
                  <Text style={styles.projectName}>Summary</Text>
                </View>
                <View style={styles.summaryDetails}>
                  <View style={[styles.row, styles.bdrBtm]}>
                    <Text style={styles.head}>Total price of project :</Text>
                    <Text style={styles.price}>
                      $ {this.state.TotalprojectAmount} USD
                    </Text>
                  </View>
                  <View style={[styles.row, styles.bdrBtm]}>
                    <Text style={styles.head}>Connectbud service fee :</Text>
                    <Text style={styles.price}>
                      $ {(this.state.TotalprojectAmount * 0.03).toFixed(2)} USD
                    </Text>
                  </View>
                  <View style={[styles.row, styles.bdrBtm]}>
                    <Text style={styles.head}>
                      How many milestone you have :
                    </Text>
                    <Text style={styles.price}>{this.state.count}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.head}>Total payable :</Text>
                    <Text style={styles.price}>
                      ${' '}
                      {+this.state.TotalprojectAmount +
                        this.state.TotalprojectAmount * 0.03}{' '}
                      USD
                    </Text>
                  </View>
                </View>
              </View>
              {this.state.hireType ? (
                this.state.hireType === 'milestone' ? (
                  <View style={[styles.tab, styles.marBtm20]}>
                    <View style={styles.summaryTab}>
                      <Text style={styles.projectName}>
                        What is a Milestone Payment?
                      </Text>
                    </View>
                    <View style={styles.summaryDetails}>
                      <Text style={styles.milePayText}>
                        A system where an employer can split the project into a
                        list of objectives and allocate certain percentage of
                        the fee to each deliverable. At the end of every target,
                        the employer can acknowledge and release the amount to
                        the student. This type of payment is usually recommended
                        when project spans several weeks to several months.
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={[styles.tab, styles.marBtm20]}>
                    <View style={styles.summaryTab}>
                      <Text style={styles.projectName}>
                        What is One-Off Payment?
                      </Text>
                    </View>
                    <View style={styles.summaryDetails}>
                      <Text style={styles.milePayText}>
                        A system where an employer pays the student 100% of the
                        fee at the end of the project. The college student will
                        be paid as one-off payments on completion of the work by
                        the employers.
                      </Text>
                    </View>
                  </View>
                )
              ) : (
                <></>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps, null)(HomeworkHireStudentsScreen);
