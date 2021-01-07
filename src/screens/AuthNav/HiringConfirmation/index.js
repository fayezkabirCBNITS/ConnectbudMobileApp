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
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';

import axios from 'axios';
import {API_URL} from '../../../config/url';

import Spinner from 'react-native-loading-spinner-overlay';

class HiringConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.job_id
        : '',
      receiver_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.receiver_id
        : '',
      sender_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.sender_id
        : '',
      name: this.props.navigation.state.params
        ? this.props.navigation.state.params.name
        : '',
      user_image: this.props.navigation.state.params
        ? this.props.navigation.state.params.user_image
        : '',
      user_type: this.props.navigation.state.params
        ? this.props.navigation.state.params.user_type
        : '',
      paymentData: [],
      milestone_id: '',
      StatusType: '',
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    this.setState({
      showLoader: true,
    });
    let body = new FormData();
    body.append('hirer_id', this.state.receiver_id);
    body.append('freelancer_id', this.state.sender_id);
    body.append('job_id', this.state.job_id);
    body.append('type', 'freelancer');
    body.append('page_type', 'form');
    body.append('user_id', '');

    console.log(body);

    await axios({
      url: API_URL + 'fetchmilestones',
      method: 'POST',
      data: body,
    }).then((response) => {
      // if (response.data[0].message != 'No data found') {
      this.setState({
        paymentData: response.data,
        milestone_id: response.data[0].details.map((obj) => obj.id),
        StatusType: response.data[0].details[0].milestone_status,
        showLoader: false,
      });
      console.log(this.state.milestone_id);
      // } else {
      //   this.props.history.push('/no-record');
      // }
    });
  };

  handleVerified = async () => {
    this.setState({
      showLoader: true,
    });
    const body = {
      status: 'yes',
      sender_id: this.state.sender_id,
      receiver_id: this.state.receiver_id,
      job_type: 'freelancer',
      job_id: this.state.job_id,
      milestone_id: this.state.milestone_id.toString(),
      confirmation_type: 'invitation',
    };
    console.log(body);

    await axios
      .post(API_URL + 'confirmation', body)
      .then(async (res) => {
        this.setState({
          showLoader: false,
        });
        if (res.data[0].message == 'data inserted') {
          alert(
            'Thanks!',
            "You have accepted the employer's request!",
            'success',
          );
          this.props.navigation.navigate('ChatScreen');
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          showLoader: false
        })
      });
  };

  handleUnverified = async () => {
    this.setState({
      showLoader: true,
    });
    const body = {
      status: 'no',
      sender_id: this.state.sender_id,
      receiver_id: this.state.receiver_id,
      job_type: 'freelancer',
      job_id: this.state.job_id,
      milestone_id: this.state.milestone_id.toString(),
      confirmation_type: 'invitation',
    };

    await axios.post(API_URL + 'confirmation', body).then(async (res) => {
      this.setState({
        showLoader: false,
      });
      if (res.data[0].message == 'data inserted') {
        alert("You have rejected the employer's request!");
        this.props.navigation.navigate("StudentInner");
      }
    });
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
            <TouchableOpacity style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              <View>
                {this.state.paymentData.map((value, index) => (
                  <View style={styles.heading}>
                    <Text style={styles.projHead}>Project Name : </Text>
                    <Text style={styles.projName}>{value.job_name}</Text>
                  </View>
                ))}

                {this.state.paymentData.map((value, index) => (
                  <>
                    {value.details.map((item, index) => (
                      <View style={styles.detailsSec}>
                        <View style={styles.detailsField}>
                          <Text style={styles.deatailsHdng}>
                            Type of Project
                          </Text>
                          <Text style={styles.deatailsInfo}>
                            {item.project_type} {index + 1}
                          </Text>
                        </View>
                        <View style={styles.detailsField}>
                          <Text style={styles.deatailsHdng}>
                            Project Timeline
                          </Text>
                          <Text style={styles.deatailsInfo}>
                            {item.end_date}
                          </Text>
                        </View>
                        <View style={styles.detailsField}>
                          <Text style={styles.deatailsHdng}>Description</Text>
                          <Text style={styles.deatailsInfo}>
                            {item.description}
                          </Text>
                        </View>
                        <View style={styles.detailsField}>
                          <Text style={styles.deatailsHdng}>
                            Proposed Amount
                          </Text>
                          <Text style={styles.deatailsInfo}>
                            ${item.received_amount}
                          </Text>
                        </View>
                        <View style={styles.detailsField}>
                          <Text style={styles.deatailsHdng}>Service Fee</Text>
                          <Text style={styles.deatailsInfo}>12%</Text>
                        </View>
                        <View style={styles.detailsField}>
                          <Text style={styles.deatailsHdng}>
                            Received Amount
                          </Text>
                          <Text style={styles.deatailsInfo}>
                            ${item.milestone_amount}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </>
                ))}

                <View style={styles.btnSec}>
                  <TouchableOpacity style={styles.btn}>
                    <Text
                      style={styles.btnText}
                      onPress={this.handleUnverified}>
                      Ignore
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={this.handleVerified}>
                    <Text style={styles.btnText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default HiringConfirmation;
