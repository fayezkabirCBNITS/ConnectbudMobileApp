import React, {Component} from 'react';
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
  Modal,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {Picker} from '@react-native-community/picker';
import ApiUrl from '../../config/ApiUrl';
import {
  makePostRequestMultipart,
  makeAuthGetRequest,
  makePostRequest,
} from '../../services/http-connectors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ErrorMsg from '../../components/ErrorMsg';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import base64 from 'base-64';

class OnlineCodingClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      four: [],
      ten: [],
      fourCourse: false,
      tenCourse: false,
      tenSyllabus: '',
      fourSyllabus: '',
      FoursyllabusTab: false,
      TensyllabusTab: false,
      ConnectBud: false,
      ChooseByOwn: false,
      startTime: '',
      startDate: '',
      HireBy: '',
      errStartDate: false,
      errStartTime: false,
      errHireBy: false,
      ActiveId: '',
      isModalVisible: false,
    };
  }

  fetchFour = async (check) => {
    let response = await makeAuthGetRequest(ApiUrl.Four, false, '');
    console.log(response, 'fourrespp==>');
    this.setState({
      four: response,
    });
    if (check == 'four') {
      this.setState({
        fourCourse: true,
        tenCourse: false,
        TensyllabusTab: false,
      });
    }
  };

  fetchTen = async (check) => {
    let response = await makeAuthGetRequest(ApiUrl.Ten, false, '');
    console.log(response, 'tenrespp==>');
    this.setState({
      ten: response,
    });
    if (check == 'ten') {
      this.setState({
        tenCourse: true,
        fourCourse: false,
        FoursyllabusTab: false,
      });
    }
  };

  fetchSyllabus = async (Id, cNum) => {
    let body = new FormData();
    body.append('id', Id);
    if (cNum == 'four') {
      let response = await makePostRequestMultipart(ApiUrl.Four, false, body);
      console.log(response, 'fourSyllabus==>');
      this.setState({
        fourSyllabus: response,
        FoursyllabusTab: true,
        ActiveId: Id,
      });
    } else if (cNum == 'ten') {
      let response = await makePostRequestMultipart(ApiUrl.Ten, false, body);
      console.log(response, 'TenSyllabus==>');
      this.setState({
        tenSyllabus: response,
        TensyllabusTab: true,
        ActiveId: Id,
      });
    }
  };

  handlehireBy = (selectedHireby) => {
    if (selectedHireby == 'connectBud') {
      this.setState({
        ConnectBud: true,
        ChooseByOwn: false,
        HireBy: 'connectbud',
      });
    } else if (selectedHireby == 'ChooseOwn') {
      this.setState({
        ChooseByOwn: true,
        ConnectBud: false,
        HireBy: 'me',
      });
    }
  };

  hideDatePicker = () => {
    this.setState({showDatePicker: false});
  };

  handleConfirm = (date) => {
    this.setState({startDate: date});
    this.hideDatePicker();
  };

  clearForm = () => {
    this.setState({
      HireBy: '',
      startDate: '',
      startTime: '',
    });
  };

  handleTenSubmit = async () => {
    if (this.state.startDate == '') {
      this.setState({
        errStartDate: true,
      });
      return;
    } else if (this.state.startTime == '') {
      this.setState({
        errstartTime: true,
      });
      return;
    } else if (this.state.HireBy == '') {
      this.setState({
        errHireBy: true,
      });
      return;
    } else {
      this.setState({
        errStartDate: false,
        errStartTime: false,
        errHireBy: false,
      });
      let body = new FormData();
      body.append('user_id', base64.decode(this.props.userID));
      body.append('hire_by', this.state.HireBy);
      body.append('job_name', this.state.tenSyllabus[0].course_name);
      body.append('overview', this.state.tenSyllabus[0].overview);
      body.append('syllabus', this.state.tenSyllabus[0].syllabus);
      body.append('projects_for', 'all');
      body.append('amount', this.state.tenSyllabus[0].amount);
      body.append('date', moment(this.state.startDate).format('MM/DD/YYYY'));
      body.append('start_time', this.state.startTime);
      body.append('skills', this.state.tenSyllabus[0].skills);
      body.append(
        'Number_of_classes',
        this.state.tenSyllabus[0].Number_of_classes,
      );
      body.append('free_class', 0);

      console.log(body);

      let response = await makePostRequestMultipart(
        ApiUrl.CourseSubmit,
        false,
        body,
      );
      console.log('CourseSubmit-----', response);

      if (response[0].hire_by == 'me') {
        this.setState({
          isModalVisible: true,
          HireBy: '',
          startDate: '',
          startTime: '',
          course_name: '',
          overview: '',
        });
        this.props.navigation.navigate('PostedProjectByEmployee');
      } else if (response[0].hire_by == 'connectbud') {
        this.setState({
          // isModalVisible: true,
          HireBy: '',
          startDate: '',
          startTime: '',
          course_name: '',
          overview: '',
          showLoader: false,
        });
        alert(
          'Thank you for your submission!Please pay the money to complete your submission process.',
        );
        this.props.navigation.navigate('CheckoutScreen', {
          page_status: 'tutor',
          job_id: response[0].job_id,
          user_id: base64.decode(this.props.userID),
        });
      }
      this.clearForm();
    }
  };

  handleFourSubmit = async () => {
    if (this.state.startDate == '') {
      this.setState({
        errStartDate: true,
      });
      return;
    } else if (this.state.startTime == '') {
      this.setState({
        errstartTime: true,
      });
      return;
    } else if (this.state.HireBy == '') {
      this.setState({
        errHireBy: true,
      });
      return;
    } else {
      this.setState({
        errStartDate: false,
        errStartTime: false,
        errHireBy: false,
      });

      let body = new FormData();
      body.append('user_id', base64.decode(this.props.userID));
      body.append('hire_by', this.state.HireBy);
      body.append('job_name', this.state.fourSyllabus[0].course_name);
      body.append('overview', this.state.fourSyllabus[0].overview);
      body.append('syllabus', this.state.fourSyllabus[0].syllabus);
      body.append('projects_for', 'all');
      body.append('amount', this.state.fourSyllabus[0].amount);
      body.append('date', moment(this.state.startDate).format('MM/DD/YYYY'));
      body.append('start_time', this.state.startTime);
      body.append('skills', this.state.fourSyllabus[0].skills);
      body.append(
        'Number_of_classes',
        this.state.fourSyllabus[0].Number_of_classes,
      );
      body.append('free_class', 0);

      let response = await makePostRequestMultipart(
        ApiUrl.CourseSubmit,
        false,
        body,
      );
      console.log('CourseSubmit-----', response);

      if (response[0].hire_by == 'me') {
        alert('Successfully Posted ');
        this.props.navigation.navigate('PostedProjectByEmployee');
      } else if (response[0].hire_by == 'connectbud') {
        alert(
          'Thank you for your submission!Please pay the money to complete your submission process.',
        );
        this.props.navigation.navigate('CheckoutScreen', {
          page_status: 'tutor',
          user_id: base64.decode(this.props.userID),
          job_id: response[0].job_id,
        });
      }
      this.clearForm();
    }
  };

  render() {
    return (
      <View style={CommonStyles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            {/* Choose Class Tab */}
            <Text style={styles.classText}>Choose number of classes</Text>
            <View style={styles.selectBtnDiv}>
              <TouchableOpacity
                style={
                  this.state.fourCourse
                    ? styles.ActiveSelectBtn
                    : styles.selectBtn
                }
                onPress={() => this.fetchFour('four')}>
                <Text
                  style={
                    this.state.fourCourse
                      ? styles.ActiveSelectBtnText
                      : styles.selectBtnText
                  }>
                  4 Classes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  this.state.tenCourse
                    ? styles.ActiveSelectBtn
                    : styles.selectBtn
                }
                onPress={() => this.fetchTen('ten')}>
                <Text
                  style={
                    this.state.tenCourse
                      ? styles.ActiveSelectBtnText
                      : styles.selectBtnText
                  }>
                  10 Classes
                </Text>
              </TouchableOpacity>
            </View>
            {/* End Choose Class Tab */}

            {/* Start Choose a course Tab */}
            {this.state.fourCourse && (
              <View>
                <Text style={[styles.classText, {marginLeft: 5}]}>
                  Choose a course
                </Text>
                <View style={styles.selectCourseDiv}>
                  {this.state.four.length > 0 &&
                    this.state.four.map((item, idx) => (
                      <TouchableOpacity
                        onPress={() => this.fetchSyllabus(item.id, 'four')}
                        // style={styles.courseBtn}
                        style={
                          this.state.ActiveId == item.id
                            ? styles.AcourseBtn
                            : styles.courseBtn
                        }
                        key={idx}>
                        <Text
                          style={
                            this.state.ActiveId == item.id
                              ? styles.AselectBtnText
                              : styles.selectBtnText
                          }
                          // style={styles.selectBtnText}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            )}

            {this.state.tenCourse && (
              <View>
                <Text style={[styles.classText, {marginLeft: 5}]}>
                  Choose a course
                </Text>
                <View style={styles.selectCourseDiv}>
                  {this.state.ten.length > 0 &&
                    this.state.ten.map((item, idx) => (
                      <TouchableOpacity
                        // style={styles.courseBtn}
                        style={
                          this.state.ActiveId == item.id
                            ? styles.AcourseBtn
                            : styles.courseBtn
                        }
                        key={idx}
                        onPress={() => this.fetchSyllabus(item.id, 'ten')}>
                        <Text
                          style={
                            this.state.ActiveId == item.id
                              ? styles.AselectBtnText
                              : styles.selectBtnText
                          }
                          // style={styles.selectBtnText}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            )}
            {/* End Choose a course Tab */}

            {/* Start 10 Class syllabus */}
            {this.state.TensyllabusTab && (
              <View>
                <Text style={styles.syllabusHeader}>Syllabus</Text>
                <View style={styles.syllabus}>
                  <Text style={styles.syllabusText}>
                    {this.state.tenSyllabus[0].syllabus}
                  </Text>
                </View>
                <View style={{marginTop: 10}}>
                  <Text style={styles.syllabusHeader}>Hire by</Text>
                  <View style={styles.selectBtnDiv}>
                    <TouchableOpacity
                      style={
                        this.state.ConnectBud
                          ? styles.ActiveSelectBtn
                          : styles.selectBtn
                      }
                      onPress={() => this.handlehireBy('connectBud')}>
                      <Text
                        style={
                          this.state.ConnectBud
                            ? styles.ActiveSelectBtnText
                            : styles.selectBtnText
                        }>
                        ConnectBud
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        this.state.ChooseByOwn
                          ? styles.ActiveSelectBtn
                          : styles.selectBtn
                      }
                      onPress={() => this.handlehireBy('ChooseOwn')}>
                      <Text
                        style={
                          this.state.ChooseByOwn
                            ? styles.ActiveSelectBtnText
                            : styles.selectBtnText
                        }>
                        Choose your own tutor
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {this.state.errHireBy === true ? (
                    <ErrorMsg errorMsg="Please select one" />
                  ) : (
                    <></>
                  )}
                </View>

                <View>
                  <Text style={styles.syllabusHeader}>
                    Course Details of {this.state.tenSyllabus[0].course_name}
                  </Text>
                  <View style={styles.syllabus}>
                    <Text style={styles.syllabusText}>
                      Class duration :{' '}
                      <Text style={styles.boldText}>
                        {this.state.tenSyllabus[0].course_duration} hrs.
                      </Text>
                    </Text>
                    <Text style={styles.syllabusText}>
                      Course amount :{' '}
                      <Text style={styles.boldText}>
                        ${this.state.tenSyllabus[0].total_amount}
                      </Text>
                    </Text>
                    <Text>*Charges = $8/class/hr.</Text>

                    <Text style={styles.syllabusText}>
                      Number of classes :{' '}
                      <Text style={styles.boldText}>
                        {this.state.tenSyllabus[0].Number_of_classes}
                      </Text>
                    </Text>

                    <DateTimePickerModal
                      isVisible={this.state.showDatePicker}
                      mode="date"
                      onConfirm={this.handleConfirm}
                      onCancel={this.hideDatePicker}
                      minimumDate={new Date()}
                    />

                    <Text style={styles.syllabusText}>Start date:</Text>
                    <View style={styles.formGroup1}>
                      <View style={[styles.formSubGroup2, {height: 45}]}>
                        <Text style={styles.inputHead2}>
                          {this.state.startDate
                            ? moment(this.state.startDate).format('MM/DD/YYYY')
                            : 'Select Date'}
                        </Text>
                      </View>
                      <View style={styles.formSubGroup1}>
                        <TouchableOpacity
                          onPress={() => this.setState({showDatePicker: true})}>
                          <FontAwesome
                            name="calendar"
                            size={25}
                            color="#d7d7d8"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {this.state.errStartDate === true ? (
                      <ErrorMsg errorMsg="Please select Date" />
                    ) : (
                      <></>
                    )}

                    <Text style={styles.syllabusText}>Timing:</Text>
                    <View style={styles.formGroup1}>
                      <View style={[styles.formSubGroup2, {width: '100%', height: 50, overflow: 'hidden'}]}>
                        <Picker
                          style={{width: '100%', height: 45, marginTop: -80}}
                          selectedValue={this.state.startTime}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({startTime: itemValue})
                          }>
                          <Picker.Item label="Select Time" value="TH" />
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
                    {this.state.errStartTime === true ? (
                      <ErrorMsg errorMsg="Please select Time" />
                    ) : (
                      <></>
                    )}

                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => this.handleTenSubmit()}
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
                </View>
              </View>
            )}
            {/* End 10 Class syllabus */}

            {/* Start 4 Class syllabus */}
            {this.state.FoursyllabusTab && (
              <View>
                <Text style={styles.syllabusHeader}>Syllabus</Text>
                <View style={styles.syllabus}>
                  <Text style={styles.syllabusText}>
                    {this.state.fourSyllabus[0].syllabus}
                  </Text>
                </View>

                <View style={{marginTop: 10}}>
                  <Text style={styles.syllabusHeader}>Hire by</Text>
                  <View style={styles.selectBtnDiv}>
                    <TouchableOpacity
                      style={
                        this.state.ConnectBud
                          ? styles.ActiveSelectBtn
                          : styles.selectBtn
                      }
                      onPress={() => this.handlehireBy('connectBud')}>
                      <Text
                        style={
                          this.state.ConnectBud
                            ? styles.ActiveSelectBtnText
                            : styles.selectBtnText
                        }>
                        ConnectBud
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        this.state.ChooseByOwn
                          ? styles.ActiveSelectBtn
                          : styles.selectBtn
                      }
                      onPress={() => this.handlehireBy('ChooseOwn')}>
                      <Text
                        style={
                          this.state.ChooseByOwn
                            ? styles.ActiveSelectBtnText
                            : styles.selectBtnText
                        }>
                        Choose your own tutor
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {this.state.errHireBy === true ? (
                    <ErrorMsg errorMsg="Please select one" />
                  ) : (
                    <></>
                  )}
                </View>

                <View>
                  <Text style={styles.syllabusHeader}>
                    Course Details of{' '}
                    {this.state.fourSyllabus
                      ? this.state.fourSyllabus[0].course_name
                      : ''}
                  </Text>
                  <View style={styles.syllabus}>
                    <Text style={styles.syllabusText}>
                      Class duration :{' '}
                      <Text style={styles.boldText}>
                        {this.state.fourSyllabus
                          ? this.state.fourSyllabus[0].course_duration
                          : ''}{' '}
                        hrs.
                      </Text>
                    </Text>
                    <Text style={styles.syllabusText}>
                      Course amount: :{' '}
                      <Text style={styles.boldText}>
                        $
                        {this.state.fourSyllabus
                          ? this.state.fourSyllabus[0].total_amount
                          : ''}
                      </Text>
                    </Text>
                    <Text>*Charges = $5/class/hr.</Text>

                    <Text style={styles.syllabusText}>
                      Number of classes :{' '}
                      <Text style={styles.boldText}>
                        {this.state.fourSyllabus
                          ? this.state.fourSyllabus[0].Number_of_classes
                          : ''}
                      </Text>
                    </Text>

                    <DateTimePickerModal
                      isVisible={this.state.showDatePicker}
                      mode="date"
                      onConfirm={this.handleConfirm}
                      onCancel={this.hideDatePicker}
                      minimumDate={new Date()}
                    />

                    <Text style={styles.syllabusText}>Start date:</Text>
                    <View style={styles.formGroup1}>
                      <View style={[styles.formSubGroup2, {height: 45}]}>
                        <Text style={styles.inputHead2}>
                          {this.state.startDate
                            ? moment(this.state.startDate).format('MM/DD/YYYY')
                            : 'Select Date'}
                        </Text>
                      </View>
                      <View style={styles.formSubGroup1}>
                        <TouchableOpacity
                          onPress={() => this.setState({showDatePicker: true})}>
                          <FontAwesome
                            name="calendar"
                            size={25}
                            color="#d7d7d8"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {this.state.errStartDate === true ? (
                      <ErrorMsg errorMsg="Please select Date" />
                    ) : (
                      <></>
                    )}

                    <Text style={styles.syllabusText}>Timing:</Text>
                    <View style={styles.formGroup1}>
                      <View style={[styles.formSubGroup2, {width: '100%', height: 50, overflow: 'hidden'}]}>
                        <Picker
                          style={{width: '100%', height: 45, marginTop: -80}}
                          selectedValue={this.state.startTime}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({startTime: itemValue})
                          }>
                          <Picker.Item label="Select Time" value="TH" />
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
                    {this.state.errStartTime === true ? (
                      <ErrorMsg errorMsg="Please select Time" />
                    ) : (
                      <></>
                    )}

                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => this.handleFourSubmit()}
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
                </View>
              </View>
            )}
            {/* End 4 Class syllabus */}
            <Modal transparent={true} visible={this.state.isModalVisible}>
              <View style={CommonStyles.modalBg}>
                <View style={CommonStyles.modalContent}>
                  <Antdesign name="checkcircle" size={60} color="#71b85f" />
                  <Text style={CommonStyles.modalText}>
                    Successfully Posted
                  </Text>
                  <TouchableOpacity
                    style={CommonStyles.modalCross}
                    onPress={() => this.setState({isModalVisible: false})}>
                    <Entypo
                      name="circle-with-cross"
                      color="#71b85f"
                      size={35}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
)(withNavigation(OnlineCodingClasses));
