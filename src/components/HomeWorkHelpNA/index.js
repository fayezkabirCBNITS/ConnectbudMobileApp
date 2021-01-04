import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Antdesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {Picker} from '@react-native-community/picker';
import ApiUrl from '../../config/ApiUrl';
import {
  makePostRequestMultipart,
  makeAuthGetRequest,
} from '../../services/http-connectors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ErrorMsg from '../../components/ErrorMsg';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import base64 from 'base-64';
import {updateTmpPostJob} from '../../redux/actions/user-data';

class HomeWorkHelp extends Component {
  constructor(props) {
    super(props);
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
      subjectSkills: [],
      showDatePicker: false,
      showTimePicker: false,
      showEndTimePicker: false,
      errTotalCost: false,
      errselectedDate: false,
      errstartTime: false,
      errendTime: false,
      errSelectedSkills: false,
      errgradeValue: false,
      ConnectBud: '',
      errConnectBud: false,
      selectedSkills: [],
      selectedSkillIndex: null,
      skills: [],
      filteredSkills: [],
      skillValuePlaceHolder: [{value: 'Select Skill', label: 'Select skill'}],
      datePlaceHolder: [{value: 'Select Date', label: 'Select date'}],
      selectedDate: [],
      selectedDateIndex: null,
      isModalVisible: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  onActiveBtn = (test) => {
    if (test == 'cb') {
      this.setState({ConnectBud: 'connectbud'});
    } else if (test == 'he') {
      this.setState({ConnectBud: 'me'});
    }
    this.setState({
      showActiveTabBtn: !this.state.showActiveTabBtn,
    });
  };

  static navigationOptions = {
    headerShown: false,
  };

  hideDatePicker = () => {
    this.setState({showDatePicker: false});
  };

  handleConfirm = (date) => {
    this.setState({
      selectedDate: [
        ...this.state.selectedDate,
        moment(date).format('MM/DD/YYYY'),
      ],
    });
    this.hideDatePicker();
  };

  componentDidMount() {
    this.fetchSkills();
  }

  async fetchSkills() {
    let response = await makeAuthGetRequest(ApiUrl.FetchSkills, false, '');
    // this.setState({subjectSkills: response});
    this.setState({skills: this.state.skillValuePlaceHolder.concat(response)});
  }

  reverseAddSkills = async (index) => {
    // this.setState({})
    this.setState({
      selectedSkills: this.state.selectedSkills.filter((_, i) => i !== index),
    });
    let data = this.state.selectedSkills[index];
    await this.setState({
      skills: this.state.skills.concat({value: data, label: data}).sort(),
    });
    this.setState({skills: this.state.skills.sort()});
  };

  handleSubmit = async () => {
    if (this.state.selectedSkills === '') {
      this.setState({errSelectedSkills: true});
      return;
    } else if (this.state.gradeValue === '') {
      this.setState({errgradeValue: true});
      return;
    } else if (this.state.selectedDate === '') {
      this.setState({errselectedDate: true});
      return;
    } else if (this.state.startTime === '') {
      this.setState({errstartTime: true});
      return;
    } else if (this.state.endTime === '') {
      this.setState({errendTime: true});
      return;
    } else if (this.state.totalCost === '') {
      this.setState({errTotalCost: true});
      return;
    } else if (this.state.ConnectBud === '') {
      this.setState({errConnectBud: true});
      return;
    } else {
      this.setState({
        errTotalCost: false,
        errselectedDate: false,
        errstartTime: false,
        errendTime: false,
        errSelectedSkills: false,
        errgradeValue: false,
        errConnectBud: false,
      });

      const date = JSON.stringify(this.state.selectedDate).replace(
        /[\[\]']+/g,
        '',
      );
      let body = new FormData();
      body.append('user_id', base64.decode(this.props.userID));
      body.append('hire_by', this.state.ConnectBud);
      body.append(
        'skills',
        JSON.stringify(this.state.selectedSkills).replace(/[\[\]']+/g, ''),
      );
      body.append(
        'job_name',
        JSON.stringify(this.state.selectedSkills).replace(/[\[\]']+/g, ''),
      );
      body.append('total_amount', this.state.totalCost);
      body.append('Number_of_classes', 1);
      body.append('date', date.replace(/['"]+/g, ''));
      body.append('start_time', this.state.startTime);
      body.append('end_time', this.state.endTime);
      body.append('page_type', 'landing');
      body.append('grade', this.state.gradeValue);
      body.append('free_class', 0);

      let response = await makePostRequestMultipart(
        ApiUrl.tutorhomework,
        false,
        body,
      );
      console.log('Homeork details-----', response);
      /*
            if (response[0].hire_by == 'me') {
                this.setState({ isModalVisible: true })
                // this.props.navigation.navigate('PostedProjectByEmployee');
            } else if (response[0].hire_by == 'connectbud') {
                this.setState({ isModalVisible: true })
                // this.props.navigation.navigate('BankDetailScreen');
            }*/
      if (response[0].message === 'Success' && response[0]?.job_id) {
        let tmpJobObj = {
          tmpJobID: response[0]?.job_id,
          tmpSkillSet: '',
          hire_by: response[0]?.hire_by,
        };
        console.log('tmp post redux data========', tmpJobObj);
        this.props.updateTmpPostJob(tmpJobObj);
        //this.props.navigation.navigate('SignInScreen');

        //  modal dismiss navigate login
        this.setState({isModalVisible: true});
      }
    }
   
  };
 onDismissModel = () => {
      this.setState({isModalVisible: false});
      this.props.navigation.navigate('SignInScreen', {userType: 'employee'});
    };
  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar />
          {/* {/ header section /} */}
          <View style={CommonStyles.header}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
          </View>
          {/* {/ header section end /} */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              <View>
                <Text style={[styles.inputHead, {marginTop: 20}]}>
                  Select a subject
                </Text>
                {this.state.selectedSkills.length > 0 ? (
                  this.state.selectedSkills?.map((data, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.reverseAddSkills(index)}
                        key={index}>
                        <View
                          style={[
                            styles.formSubGroup22,
                            {flexWrap: 'wrap', flexDirection: 'row'},
                          ]}>
                          <View
                            style={[
                              styles.skillTab,
                              {
                                backgroundColor: '#71b85f',
                                flexDirection: 'row',
                              },
                            ]}>
                            <Text style={[styles.skillText, {color: '#fff'}]}>
                              {data}
                            </Text>
                            <FontAwesome name="close" size={20} color="#fff" />
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <></>
                )}
                <View style={styles.formGroup1}>
                  <View style={[styles.formSubGroup2, {width: '100%'}]}>
                    <Picker
                      style={{
                        width: '100%',
                        height: 45,
                        fontFamily: 'Poppins-Regular',
                      }}
                      selectedValue={this.state.skills}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          selectedSkills: [
                            ...this.state.selectedSkills,
                            itemValue,
                          ],
                          skills: this.state.skills.filter(
                            (_, i) => i !== itemIndex,
                          ),
                        })
                      }>
                      {this.state.skills.length > 0 ? (
                        this.state?.skills?.map((data, idx) => {
                          return (
                            <Picker.Item
                              label={data.label}
                              value={data.value}
                              key={idx}
                            />
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </Picker>
                  </View>
                </View>
                {this.state.errSelectedSkills === true ? (
                  <ErrorMsg errorMsg="Please select subject" />
                ) : (
                  <></>
                )}

                <Text style={styles.inputHead}>What is your grade level</Text>

                <View style={styles.formGroup1}>
                  <View style={[styles.formSubGroup2, {width: '100%'}]}>
                    <Picker
                      style={{width: '100%', height: 45}}
                      selectedValue={this.state.gradeValue}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({gradeValue: itemValue})
                      }>
                      <Picker.Item label="Select Grade" value="TH" />
                      <Picker.Item label="Kindergaten" value="Kindergaten" />
                      <Picker.Item label="1st Grade" value="1st Grade" />
                      <Picker.Item label="2nd Grade" value="2nd Grade" />
                      <Picker.Item label="3rd Grade" value="3rd Grade" />
                      <Picker.Item label="4th Grade" value="4th Grade" />
                      <Picker.Item label="5th Grade" value="5th Grade" />
                      <Picker.Item label="6th Grade" value="6th Grade" />
                      <Picker.Item label="7th Grade" value="7th Grade" />
                      <Picker.Item label="8th Grade" value="8th Grade" />
                      <Picker.Item label="9th Grade" value="9th Grade" />
                      <Picker.Item label="10th Grade" value="10th Grade" />
                      <Picker.Item label="11th Grade" value="11th Grade" />
                      <Picker.Item label="12th Grade" value="12th Grade" />
                      <Picker.Item label="1st yr./Freshman" value="1st yr./Freshman" />
                      <Picker.Item label="2nd yr./Sophomore" value="2nd yr./Sophomore" />
                      <Picker.Item label="3rd yr./Junior" value="3rd yr./Junior" />
                      <Picker.Item label="4th yr./Senior" value="4th yr./Senior" />



                    </Picker>
                  </View>
                </View>
                {this.state.errgradeValue === true ? (
                  <ErrorMsg errorMsg="Please select grade" />
                ) : (
                  <></>
                )}

                <Text style={styles.inputHead}>Hire By</Text>

                <View style={[styles.formSubGroup2, {flexDirection: 'row'}]}>
                  <View
                    style={
                      this.state.showActiveTabBtn == true
                        ? styles.skillTab
                        : styles.ActiveskillTab
                    }>
                    <Text
                      style={
                        this.state.showActiveTabBtn == true
                          ? styles.skillText
                          : styles.ActiveSkillText
                      }
                      onPress={() => this.onActiveBtn('cb')}>
                      ConnectBud
                    </Text>
                  </View>
                  <View
                    style={
                      !this.state.showActiveTabBtn == true
                        ? styles.skillTab
                        : styles.ActiveskillTab
                    }>
                    <Text
                      style={
                        !this.state.showActiveTabBtn == true
                          ? styles.skillText
                          : styles.ActiveSkillText
                      }
                      onPress={() => this.onActiveBtn('he')}>
                      Choose your own tutor
                    </Text>
                  </View>
                </View>
                {this.state.errConnectBud === true ? (
                  <ErrorMsg errorMsg="Please select one" />
                ) : (
                  <></>
                )}

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
                  <View
                    style={[
                      styles.formSubGroup2,
                      {flexDirection: 'row', flexWrap: 'wrap'},
                    ]}>
                    {this.state.selectedDate.length > 0 &&
                    this.state.selectedDate ? (
                      this.state.selectedDate.map((dt, i) => (
                        <Text style={styles.inputHead2} key={i}>
                          {JSON.stringify(dt).replace(/[\[\]']+/g, '')}
                        </Text>
                      ))
                    ) : (
                      <Text style={styles.dateField}>Select Date</Text>
                    )}
                  </View>
                  <View style={styles.formSubGroup1}>
                    <TouchableOpacity
                      onPress={() => this.setState({showDatePicker: true})}>
                      <FontAwesome name="calendar" size={25} color="#d7d7d8" />
                    </TouchableOpacity>
                  </View>
                </View>
                {this.state.errstartDate === true ? (
                  <ErrorMsg errorMsg="Please select date" />
                ) : (
                  <></>
                )}

                <Text style={styles.inputHead}>Time</Text>
                <View style={styles.formGroup1}>
                  <View style={[styles.formSubGroup2, {width: '100%'}]}>
                    <Picker
                      style={{width: '100%', height: 45}}
                      selectedValue={this.state.startTime}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({startTime: itemValue})
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
                {this.state.errstartTime === true ? (
                  <ErrorMsg errorMsg="Please select start time" />
                ) : (
                  <></>
                )}

                <View style={styles.formGroup1}>
                  <View style={[styles.formSubGroup2, {width: '100%'}]}>
                    <Picker
                      style={{width: '100%', height: 45}}
                      selectedValue={this.state.endTime}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({endTime: itemValue})
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
                {this.state.errendTime === true ? (
                  <ErrorMsg errorMsg="Please select end time" />
                ) : (
                  <></>
                )}

                <Text style={styles.inputHead}>Total Cost</Text>
                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="180.00"
                      style={styles.inputGroup}
                      keyboardType="number-pad"
                      value={this.state.totalCost}
                      onChange={(e) =>
                        this.setState({totalCost: e.nativeEvent.text})
                      }
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="dollar" size={25} color="#d7d7d8" />
                  </View>
                </View>
                {this.state.errTotalCost === true ? (
                  <ErrorMsg errorMsg="Please enter total cost" />
                ) : (
                  <></>
                )}
                  <Text>*Charges = $5/class/hr.</Text>


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
              </View>

              <Modal transparent={true} visible={this.state.isModalVisible}>
                <View style={CommonStyles.modalBg}>
                  <View style={CommonStyles.modalContent}>
                    <Antdesign name="checkcircle" size={60} color="#71b85f" />
                    <Text style={CommonStyles.modalText}>
                      Successfully Posted
                    </Text>
                    <TouchableOpacity
                      style={CommonStyles.modalCross}
                      onPress={()=>this.onDismissModel()}>
                      <Entypo
                        name="circle-with-cross"
                        color="#71b85f"
                        size={35}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
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
    userID: state.userData.user_id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateTmpPostJob: (data) => dispatch(updateTmpPostJob(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(HomeWorkHelp));
