import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { Picker } from '@react-native-community/picker';
import ApiUrl from '../../config/ApiUrl';
import { makePostRequestMultipart, makeAuthGetRequest } from '../../services/http-connectors'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ErrorMsg from '../../components/ErrorMsg';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import base64 from 'base-64';
import OnlineCodingClasses from '../OnlinCodingClasses/onlineClasses'

class HireTutor extends Component {
  constructor() {
    super();
    this.state = {
      startDate: '',
      startTime: '',
      endTime: '',
      totalCost: '',
      subjectValue: '',
      gradeValue: '',
      showActiveTabBtn: false,
      homeworkTab: false,
      OnlineTab: false,
      selectedSkills: [],
      subjectSkills: [],
      showDatePicker: false,
      showTimePicker: false,
      showEndTimePicker: false,
      errTotalCost: false,
      errstartDate: false,
      errstartTime: false,
      errendTime: false,
      errsubjectValue: false,
      errgradeValue: false,
      ConnectBud: '',
      errConnectBud: false,
    };
  }

  onActive = (Tab) => {
    if (Tab == 'online') {
      this.setState({
        OnlineTab: true,
        homeworkTab: false,
      })
    } else if (Tab == 'homework') {
      this.setState({
        homeworkTab: true,
        OnlineTab: false,
      })
    }
  }

  onActiveBtn = (test) => {
    if (test == 'cb') {
      this.setState({ ConnectBud: 'connectbud' })
    } else if (test == 'he') {
      this.setState({ ConnectBud: 'me' })
    }
    this.setState({
      showActiveTabBtn: !this.state.showActiveTabBtn,
    })
  }

  static navigationOptions = {
    headerShown: false,
  };

  hideDatePicker = () => {
    this.setState({ showDatePicker: false })
  };

  handleConfirm = (date) => {
    this.setState({ startDate: date })
    this.hideDatePicker();
  };

  hideTimePicker = () => {
    this.setState({ showTimePicker: false })
  };

  handleTimeConfirm = (time) => {
    this.setState({ startTime: time })
    this.hideTimePicker();
  };

  hideEndTimePicker = () => {
    this.setState({ showTimePicker: false })
  };

  handleEndTimeConfirm = (time) => {
    this.setState({ endTime: time })
    this.hideEndTimePicker();
  };

  componentDidMount() {
    this.fetchSkills();
  }

  async fetchSkills() {
    let response = await makeAuthGetRequest(ApiUrl.FetchSkills, false, '');
    this.setState({
      subjectSkills: response
    })
  }

  handleSubmit = async () => {
    if (!this.state.subjectValue) {
      this.setState({ errsubjectValue: true });
      return;
    } else if (!this.state.gradeValue) {
      this.setState({ errgradeValue: true });
      return;
    } else if (!this.state.startDate) {
      this.setState({ errstartDate: true });
      return;
    }
    else if (!this.state.startTime) {
      this.setState({ errstartTime: true });
      return;
    }
    else if (!this.state.endTime) {
      this.setState({ errendTime: true });
      return;
    } else if (!this.state.totalCost) {
      this.setState({ errTotalCost: true });
      return;
    } else if (this.state.ConnectBud == '') {
      this.setState({ errConnectBud: true });
      return;
    }

    let body = new FormData();
    body.append('user_id', base64.decode(this.props.userID));
    body.append('hire_by', this.state.ConnectBud);
    body.append('job_name', this.state.subjectValue);
    body.append('total_amount', this.state.totalCost);
    body.append('Number_of_classes', 1);
    body.append('date', moment(this.state.startDate).format("MM/DD/YYYY"));
    body.append('start_time', this.state.startTime);
    body.append('end_time', this.state.endTime);
    body.append('grade', this.state.gradeValue);
    body.append('free_class', 0);

    let response = await makePostRequestMultipart(
      ApiUrl.tutorhomework,
      false,
      body,
    );
    console.log('Homeork details-----', response[0].hire_by);

    if (response[0].hire_by == 'me') {
      alert('Successfully Posted ');
      this.props.navigation.navigate('PostedProjectByEmployee')
    } else if (response[0].hire_by == 'connectbud') {
      alert('Successfully Posted ');
      this.props.navigation.navigate('BankDetailScreen')
    }
  }

  render() {
    return (
      <View style={CommonStyles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <Text style={styles.inputHead}>What type of session is it</Text>

            <View
              style={[
                styles.formSubGroup2,
                { flexDirection: 'row' },
              ]}>
              <View
                style={this.state.OnlineTab == true ? styles.ActiveskillTab : styles.skillTab}
              >
                <Text
                  style={this.state.OnlineTab == true ? styles.ActiveSkillText : styles.skillText}
                  // style={[styles.skillText]} 
                  onPress={() => this.onActive('online')}
                >
                  Online class & Tutorial
                </Text>
              </View>

              <View
                style={this.state.homeworkTab == true ? styles.ActiveskillTab : styles.skillTab}
              >
                <Text
                  // style={styles.skillText} 
                  style={this.state.homeworkTab == true ? styles.ActiveSkillText : styles.skillText}
                  onPress={() => this.onActive('homework')}
                >
                  HomeWork Help</Text>
              </View>
            </View>

            {this.state.OnlineTab && <OnlineCodingClasses />}

            {this.state.homeworkTab && <View>
              <Text style={styles.inputHead}>Select a subject</Text>
              <View style={styles.formGroup1}>
                <View style={[styles.formSubGroup2, { width: '100%' }]}>
                  <Picker
                    style={{ width: '100%', height: 45 }}
                    selectedValue={this.state.subjectValue}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ subjectValue: itemValue })
                    }>
                    {this.state.subjectSkills.length > 0 ? (
                      this.state?.subjectSkills?.map((data, idx) => {
                        return (
                          <Picker.Item label={data.label} value={data.value} key={idx} />
                        );
                      })
                    ) : (
                        <></>
                      )}
                  </Picker>
                </View>
              </View>
              {this.state.errsubjectValue === true ? (<ErrorMsg errorMsg="Please select subject" />) : (<></>)}

              <Text style={styles.inputHead}>What is your grade level</Text>

              <View style={styles.formGroup1}>
                <View style={[styles.formSubGroup2, { width: '100%' }]}>
                  <Picker
                    style={{ width: '100%', height: 45 }}
                    selectedValue={this.state.gradeValue}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ gradeValue: itemValue })
                    }>
                    <Picker.Item label="Select Grade" value="TH" />
                    <Picker.Item label="Kindergaten" value="Kindergaten" />
                    <Picker.Item label="1st Grade" value="1st Grade" />
                    <Picker.Item label="2nd Grade" value="2nd Grade" />
                  </Picker>
                </View>
              </View>
              {this.state.errgradeValue === true ? (<ErrorMsg errorMsg="Please select grade" />) : (<></>)}

              <Text style={styles.inputHead}>Hire By</Text>

              <View style={[styles.formSubGroup2, { flexWrap: 'wrap', flexDirection: 'row' }]}>
                <View
                  style={this.state.showActiveTabBtn == true ? styles.skillTab : styles.ActiveskillTab}
                >
                  <Text
                    style={this.state.showActiveTabBtn == true ? styles.skillText : styles.ActiveSkillText}
                    onPress={() => this.onActiveBtn('cb')}
                  >
                    ConnectBud
                  </Text>
                </View>
                <View
                  style={!this.state.showActiveTabBtn == true ? styles.skillTab : styles.ActiveskillTab}
                >
                  <Text
                    style={!this.state.showActiveTabBtn == true ? styles.skillText : styles.ActiveSkillText}
                    onPress={() => this.onActiveBtn('he')}
                  >
                    Choose your own
                </Text>
                </View>
              </View>
              {this.state.errConnectBud === true ? (<ErrorMsg errorMsg="Please select one" />) : (<></>)}

              <Text style={styles.inputHead}>When is it :</Text>
              <Text style={styles.inputHead}>Date</Text>
              <DateTimePickerModal
                isVisible={this.state.showDatePicker}
                mode="date"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
                minimumDate={new Date()}
              />

              <View style={styles.formGroup1}>
                <View style={[styles.formSubGroup2, { height: 45 }]}>
                  <Text style={styles.inputHead2}>{this.state.startDate ? moment(this.state.startDate).format("MM/DD/YYYY") : 'Select Date'}</Text>
                </View>
                <View style={styles.formSubGroup1} >
                  <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                    <FontAwesome name="calendar" size={25} color="#d7d7d8" />
                  </TouchableOpacity>
                </View>
              </View>
              {this.state.errstartDate === true ? <ErrorMsg errorMsg="Please select date" /> : (<></>)}

              <Text style={styles.inputHead}>Time</Text>
              {/* <DateTimePickerModal
                isVisible={this.state.showTimePicker}
                mode="time"
                onConfirm={this.handleTimeConfirm}
                onCancel={this.hideTimePicker}
              /> */}
              {/* <View style={styles.formGroup1}>
                <View style={[styles.formSubGroup2, { height: 45 }]}>
                  <Text style={styles.inputHead2}>{this.state.startTime ? moment(this.state.startTime).format("LT") : 'Select Start time'}</Text>
                </View>
                <View style={styles.formSubGroup1} >
                  <TouchableOpacity onPress={() => this.setState({ showTimePicker: true })}>
                    <FontAwesome name="clock-o" size={25} color="#d7d7d8" />
                  </TouchableOpacity>
                </View>
              </View> */}
              <View style={styles.formGroup1}>
                <View style={[styles.formSubGroup2, { width: '100%' }]}>
                  <Picker
                    style={{ width: '100%', height: 45 }}
                    selectedValue={this.state.startTime}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ startTime: itemValue })
                    }>
                    <Picker.Item label="Select Start Time" value="TH" />
                    <Picker.Item label="12:00 AM" value="12:00 AM" />
                    <Picker.Item label="12:30 AM" value="12:30 AM" />
                    <Picker.Item label="1:00 AM" value="1:00 AM" />
                    <Picker.Item label="1:30 AM" value="1:30 AM" />
                    <Picker.Item label="2:00 AM" value="2:00 AM" />
                    <Picker.Item label="2:30 AM" value="2:30 AM" />
                    <Picker.Item label="3:00 AM" value="3:00 AM" />
                    <Picker.Item label="3:30 AM" value="3:30 AM" />
                    <Picker.Item label="4:00 AM" value="4:00 AM" />
                    <Picker.Item label="4:30 AM" value="4:30 AM" />
                    <Picker.Item label="5:00 AM" value="5:00 AM" />
                    <Picker.Item label="5:30 AM" value="5:30 AM" />
                    <Picker.Item label="6:00 AM" value="6:00 AM" />
                    <Picker.Item label="6:30 AM" value="6:30 AM" />
                    <Picker.Item label="7:00 AM" value="7:00 AM" />
                    <Picker.Item label="7:30 AM" value="7:30 AM" />
                    <Picker.Item label="8:00 AM" value="8:00 AM" />
                    <Picker.Item label="8:30 AM" value="8:30 AM" />
                    <Picker.Item label="9:00 AM" value="9:00 AM" />
                    <Picker.Item label="9:30 AM" value="9:30 AM" />
                    <Picker.Item label="10:00 AM" value="10:00 AM" />
                    <Picker.Item label="10:30 AM" value="10:30 AM" />
                    <Picker.Item label="11:00 AM" value="11:00 AM" />
                    <Picker.Item label="11:30 AM" value="11:30 AM" />
                    <Picker.Item label="12:00 PM" value="12:00 PM" />
                    <Picker.Item label="12:30 PM" value="12:30 PM" />
                    <Picker.Item label="1:00 PM" value="1:00 PM" />
                    <Picker.Item label="1:30 PM" value="1:30 PM" />
                    <Picker.Item label="2:00 PM" value="2:00 PM" />
                    <Picker.Item label="2:30 PM" value="2:30 PM" />
                    <Picker.Item label="3:00 PM" value="3:00 PM" />
                    <Picker.Item label="3:30 PM" value="3:30 PM" />
                    <Picker.Item label="4:00 PM" value="4:00 PM" />
                    <Picker.Item label="4:30 PM" value="4:30 PM" />
                    <Picker.Item label="5:00 PM" value="5:00 PM" />
                    <Picker.Item label="5:30 PM" value="5:30 PM" />
                    <Picker.Item label="6:00 PM" value="6:00 PM" />
                    <Picker.Item label="6:30 PM" value="6:30 PM" />
                    <Picker.Item label="7:00 PM" value="7:00 PM" />
                    <Picker.Item label="7:30 PM" value="7:30 PM" />
                    <Picker.Item label="8:00 PM" value="8:00 PM" />
                    <Picker.Item label="8:30 PM" value="8:30 PM" />
                    <Picker.Item label="9:00 PM" value="9:00 PM" />
                    <Picker.Item label="9:30 PM" value="9:30 PM" />
                    <Picker.Item label="10:00 PM" value="10:00 PM" />
                    <Picker.Item label="10:30 PM" value="10:30 PM" />
                    <Picker.Item label="11:00 PM" value="11:00 PM" />
                    <Picker.Item label="11:30 PM" value="11:30 PM" />
                  </Picker>
                </View>
              </View>
              {this.state.errstartTime === true ? (<ErrorMsg errorMsg="Please select start time" />) : (<></>)}

              {/* <DateTimePickerModal
                isVisible={this.state.showEndTimePicker}
                mode="time"
                onConfirm={this.handleEndTimeConfirm}
                onCancel={this.hideEndTimePicker}
              />
              <View style={styles.formGroup1}>
                <View style={[styles.formSubGroup2, { height: 45 }]}>
                  <Text style={styles.inputHead2}>{this.state.endTime ? moment(this.state.endTime).format("LT") : 'Select End time'}</Text>
                </View>
                <View style={styles.formSubGroup1} >
                  <TouchableOpacity onPress={() => this.setState({ showEndTimePicker: true })}>
                    <FontAwesome name="clock-o" size={25} color="#d7d7d8" />
                  </TouchableOpacity>
                </View>
              </View> */}

              <View style={styles.formGroup1}>
                <View style={[styles.formSubGroup2, { width: '100%' }]}>
                  <Picker
                    style={{ width: '100%', height: 45 }}
                    selectedValue={this.state.endTime}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ endTime: itemValue })
                    }>
                    <Picker.Item label="Select End Time" value="TH" />
                    <Picker.Item label="12:00 AM" value="12:00 AM" />
                    <Picker.Item label="12:30 AM" value="12:30 AM" />
                    <Picker.Item label="1:00 AM" value="1:00 AM" />
                    <Picker.Item label="1:30 AM" value="1:30 AM" />
                    <Picker.Item label="2:00 AM" value="2:00 AM" />
                    <Picker.Item label="2:30 AM" value="2:30 AM" />
                    <Picker.Item label="3:00 AM" value="3:00 AM" />
                    <Picker.Item label="3:30 AM" value="3:30 AM" />
                    <Picker.Item label="4:00 AM" value="4:00 AM" />
                    <Picker.Item label="4:30 AM" value="4:30 AM" />
                    <Picker.Item label="5:00 AM" value="5:00 AM" />
                    <Picker.Item label="5:30 AM" value="5:30 AM" />
                    <Picker.Item label="6:00 AM" value="6:00 AM" />
                    <Picker.Item label="6:30 AM" value="6:30 AM" />
                    <Picker.Item label="7:00 AM" value="7:00 AM" />
                    <Picker.Item label="7:30 AM" value="7:30 AM" />
                    <Picker.Item label="8:00 AM" value="8:00 AM" />
                    <Picker.Item label="8:30 AM" value="8:30 AM" />
                    <Picker.Item label="9:00 AM" value="9:00 AM" />
                    <Picker.Item label="9:30 AM" value="9:30 AM" />
                    <Picker.Item label="10:00 AM" value="10:00 AM" />
                    <Picker.Item label="10:30 AM" value="10:30 AM" />
                    <Picker.Item label="11:00 AM" value="11:00 AM" />
                    <Picker.Item label="11:30 AM" value="11:30 AM" />
                    <Picker.Item label="12:00 PM" value="12:00 PM" />
                    <Picker.Item label="12:30 PM" value="12:30 PM" />
                    <Picker.Item label="1:00 PM" value="1:00 PM" />
                    <Picker.Item label="1:30 PM" value="1:30 PM" />
                    <Picker.Item label="2:00 PM" value="2:00 PM" />
                    <Picker.Item label="2:30 PM" value="2:30 PM" />
                    <Picker.Item label="3:00 PM" value="3:00 PM" />
                    <Picker.Item label="3:30 PM" value="3:30 PM" />
                    <Picker.Item label="4:00 PM" value="4:00 PM" />
                    <Picker.Item label="4:30 PM" value="4:30 PM" />
                    <Picker.Item label="5:00 PM" value="5:00 PM" />
                    <Picker.Item label="5:30 PM" value="5:30 PM" />
                    <Picker.Item label="6:00 PM" value="6:00 PM" />
                    <Picker.Item label="6:30 PM" value="6:30 PM" />
                    <Picker.Item label="7:00 PM" value="7:00 PM" />
                    <Picker.Item label="7:30 PM" value="7:30 PM" />
                    <Picker.Item label="8:00 PM" value="8:00 PM" />
                    <Picker.Item label="8:30 PM" value="8:30 PM" />
                    <Picker.Item label="9:00 PM" value="9:00 PM" />
                    <Picker.Item label="9:30 PM" value="9:30 PM" />
                    <Picker.Item label="10:00 PM" value="10:00 PM" />
                    <Picker.Item label="10:30 PM" value="10:30 PM" />
                    <Picker.Item label="11:00 PM" value="11:00 PM" />
                    <Picker.Item label="11:30 PM" value="11:30 PM" />
                  </Picker>
                </View>
              </View>
              {this.state.errendTime === true ? (<ErrorMsg errorMsg="Please select end time" />) : (<></>)}

              <Text style={styles.inputHead}>Total Cost</Text>
              <View style={styles.formGroup1}>
                <View style={styles.formSubGroup2}>
                  <TextInput
                    returnKeyType="done"
                    placeholder="180.00"
                    style={styles.inputGroup}
                    keyboardType="number-pad"
                    value={this.state.totalCost}
                    onChange={(e) => this.setState({ totalCost: e.nativeEvent.text })}
                  />
                </View>
                <View style={styles.formSubGroup1}>
                  <FontAwesome name="dollar" size={25} color="#d7d7d8" />
                </View>
              </View>
              {this.state.errTotalCost === true ? (<ErrorMsg errorMsg="Please enter total cost" />) : (<></>)}

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.handleSubmit()}
                style={[styles.authBtn]}>
                <Text style={styles.authBtnText}>Submit</Text>
                {this.state.showLoader && (
                  <ActivityIndicator
                    size="large"
                    color="#fff"
                    style={CommonStyles.loader}
                  />
                )}
              </TouchableOpacity>
            </View>}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
    userID: state.userData.user_id,
  };
};


export default connect(
  mapStateToProps,
  null,
)(withNavigation(HireTutor));
