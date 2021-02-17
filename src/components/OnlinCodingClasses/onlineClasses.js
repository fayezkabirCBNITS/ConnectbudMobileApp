import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import { Picker } from '@react-native-community/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import base64 from 'base-64';
import axios from "axios";
import { API_URL } from "../../config/url";
import { timeZone } from "../../config/timezone";

class OnlineCodingClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: [],
      courseId: '',
      courseDetails: [],
      hireBy: '',
      courseName: '',
      overview: '',
      syllabus: '',
      courseAmount: '',
      courseSkill: '',
      classNumber: '',
      startDate: '',
      startTime: '',
      btnDisable: false,
      errors: '',
      clsName: '',
      showClass: false,
      timezone: '',
      ActiveId: '',
      isModalVisible: false,
      fourCourse: false,
      tenCourse: false,
      showLoader: false
    };
  }

  componentDidMount = async () => {
    if (this.props.hireType === true) {
      this.FetchSubject();
    }
  }

  FetchSubject = async () => {
    await axios({
      url: API_URL + "course",
      method: "GET",
    })
      .then((response) => {
        this.setState({
          courseList: response.data,
        });
      })
      .catch((error) => { });
  };

  SelectedCourse = async (id, name) => {
    await this.setState({
      courseId: id,
      clsName: name,
      courseDetails: [],
      hireBy: "connectbud",
      classNumber: 4,
      showClass: false,
      errors: ''
    });

    let body = new FormData();
    body.append("name", this.state.clsName);
    body.append("classes", this.state.classNumber);

    await axios({
      url: API_URL + "course",
      method: "POST",
      data: body,
    })
      .then((response) => {
        this.setState({
          courseDetails: response.data,
          courseName: response.data[0].course_name,
          overview: response.data[0].overview,
          syllabus: response.data[0].syllabus,
          courseAmount: response.data[0].amount,
          courseSkill: response.data[0].skills,
          classNumber: "",
          ActiveId: id
        });
      })
      .catch((error) => { });
  };

  selectClass = async (number) => {
    await this.setState({
      classNumber: number === 'four' ? 4 : 10,
    })
    if (this.state.classNumber === 4) {
      this.setState({
        fourCourse: true,
        tenCourse: false
      })
    } else {
      this.setState({
        tenCourse: true,
        fourCourse: false
      })
    }
    let body = new FormData();
    body.append("name", this.state.clsName);
    body.append("classes", this.state.classNumber);

    await axios({
      url: API_URL + "course",
      method: "POST",
      data: body,
    })
      .then((response) => {
        this.setState({
          syllabus: response.data[0].syllabus
        });
      })
      .catch((error) => { });
  }

  hideDatePicker = () => {
    this.setState({ showDatePicker: false });
  };

  handleConfirm = (date) => {
    this.setState({ startDate: date });
    this.hideDatePicker();
  };

  clearForm = () => {
    this.setState({
      hireBy: '',
      startDate: '',
      startTime: '',
      timezone: ''
    });
  };

  CourseSubmit = async () => {
    let dataSet = this.validateCourseForm();
    if (dataSet === true) {
      this.PostCourse();
    }
  };

  validateCourseForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.startDate) {
      formIsValid = false;
      errors["start"] = "*Please select the date";
    }
    if (!this.state.startTime) {
      formIsValid = false;
      errors["time"] = "*Please select the time";
    }
    if (!this.state.classNumber) {
      formIsValid = false;
      errors["class"] = "*Please select number of classes";
    }
    if (!this.state.timezone) {
      formIsValid = false;
      errors["zone"] = "*Please select the timezone";
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  PostCourse = async () => {
    this.setState({ showLoader: true });
    let body = new FormData();
    body.append('user_id', base64.decode(this.props.userID));
    body.append('hire_by', this.state.hireBy);
    body.append('job_name', this.state.courseName);
    body.append('overview', this.state.overview);
    body.append('syllabus', this.state.syllabus);
    body.append('projects_for', 'all');
    body.append('amount', this.state.courseAmount);
    body.append('date', moment(this.state.startDate).format('MM/DD/YYYY'));
    body.append('start_time', this.state.startTime);
    body.append('skills', this.state.courseSkill);
    body.append('Number_of_classes', this.state.classNumber);
    body.append('free_class', 0);
    body.append("time_zone", this.state.timezone);

    await axios({
      url: API_URL + "course_submit",
      method: "POST",
      data: body,
    }).then((response) => {

      // if (response.data[0].hire_by == 'me') {
      //   this.setState({
      //     isModalVisible: true,
      //     hireBy: '',
      //     startDate: '',
      //     startTime: '',
      //     course_name: '',
      //     overview: '',
      //     timezone: ''
      //   });
      //   this.props.navigation.navigate('PostedProjectByEmployee');
      // } else 
      if (response.data[0].message === "Success") {
        this.setState({
          // isModalVisible: true,
          hireBy: '',
          startDate: '',
          startTime: '',
          course_name: '',
          overview: '',
          timezone: '',
          showLoader: false,
        });
        alert(
          'Thank you for your submission!Please pay the money to complete your submission process.',
        );
        this.props.navigation.navigate('CheckoutScreen', {
          page_status: 'tutor',
          job_id: response.data[0].job_id,
          user_id: base64.decode(this.props.userID),
        });
      }
    })
      .catch((error) => {
        this.setState({
          showLoader: false,
        });
      });
    this.clearForm();
  }

  render() {
    return (
      <View style={CommonStyles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>

            {/* Start Choose a course Tab */}
            {this.props.hireType === true && (
              <View>
                <Text style={[styles.classText, { marginLeft: 5 }]}>
                  Choose a course
                </Text>
                <View style={styles.selectCourseDiv}>
                  {this.state.courseList.length > 0 &&
                    this.state.courseList.map((item, idx) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.SelectedCourse(item.id, item.name)
                        }
                        // style={styles.courseBtn}
                        style={
                          this.state.ActiveId == item.id
                            ? styles.AcourseBtn
                            : styles.courseBtn
                        }
                        key={idx}>
                        <View style={styles.imgBg}>
                          <Image
                            source={{ uri: item.image }}
                            style={CommonStyles.image}
                          />
                        </View>
                        <View
                          style={
                            this.state.ActiveId == item.id
                              ? styles.hdngBgSelect
                              : styles.hdngBg
                          }>
                          {this.state.ActiveId == item.id ? (
                            <View style={styles.tickPosition}>
                              <Antdesign
                                name="check"
                                color="rgba(255,255,255,1)"
                                size={60}
                              />
                            </View>
                          ) : null}
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
                        </View>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            )}
            {/* End Choose a course Tab */}

            {/* Start 10 Class syllabus */}
            {this.state.courseDetails.map((value) => (
              <View>
                <Text style={styles.classText}>{value.course_name.replace('Classes', '')}</Text>
                <View style={styles.imgBgSec}>
                  <Image
                    source={{ uri: value.image }}
                    style={CommonStyles.image}
                  />
                </View>

                <Text style={styles.classText}>BOOK YOUR CLASS</Text>
                <View style={styles.selectBtnDiv}>
                  <TouchableOpacity
                    style={
                      this.state.fourCourse
                        ? styles.ActiveSelectBtn
                        : styles.selectBtn
                    }
                    onPress={() => this.selectClass('four')}>
                    {this.state.fourCourse ? (
                      <View style={styles.tickPosition}>
                        <Antdesign
                          name="check"
                          color="rgba(255,255,255,1)"
                          size={60}
                        />
                      </View>
                    ) : null}
                    <Text
                      style={
                        this.state.fourCourse
                          ? styles.ActiveSelectBtnText
                          : styles.selectBtnText
                      }>
                      Book 4 Classes at $20 1Hr/Per Class
                </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      this.state.tenCourse
                        ? styles.ActiveSelectBtn
                        : styles.selectBtn
                    }
                    onPress={() => this.selectClass('ten')}>
                    {this.state.tenCourse ? (
                      <View style={styles.tickPosition}>
                        <Antdesign
                          name="check"
                          color="rgba(255,255,255,1)"
                          size={60}
                        />
                      </View>
                    ) : null}
                    <Text
                      style={
                        this.state.tenCourse
                          ? styles.ActiveSelectBtnText
                          : styles.selectBtnText
                      }>
                      Book 10 Classes at $50 1 Hr/Per Class
                </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.errorText}>
                  {this.state.errors.class}
                </Text>

                <Text style={styles.syllabusHeader}>Syllabus</Text>
                <View style={styles.syllabus}>
                  <Text style={styles.syllabusText}>
                    {this.state.syllabus}
                  </Text>
                </View>

                <View style={{ marginTop: 10, marginBottom: 50 }}>
                  <Text style={styles.syllabusHeader}>
                  Select start time of the class
                  </Text>
                  <View style={styles.syllabus}>
                    <DateTimePickerModal
                      isVisible={this.state.showDatePicker}
                      mode="date"
                      onConfirm={this.handleConfirm}
                      onCancel={this.hideDatePicker}
                      minimumDate={new Date()}
                    />

                    <Text style={styles.syllabusText}>Start date:</Text>
                    <View style={styles.formGroup1}>
                      <View style={[styles.formSubGroup2, { height: 45 }]}>
                        <Text style={styles.inputHead2}>
                          {this.state.startDate
                            ? moment(this.state.startDate).format('MM/DD/YYYY')
                            : 'Select date'}
                        </Text>
                      </View>
                      <View style={styles.formSubGroup1}>
                        <TouchableOpacity
                          onPress={() => this.setState({ showDatePicker: true })}>
                          <FontAwesome
                            name="calendar"
                            size={25}
                            color="#d7d7d8"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={styles.errorText}>
                      {this.state.errors.start}
                    </Text>

                    <Text style={styles.syllabusText}>Timezone:</Text>
                    <View style={[styles.formGroup1, { paddingLeft: 0 }]}>
                      <View style={[styles.formSubGroup2, { width: '100%' }]}>
                        <Picker
                          style={{ width: '100%', height: 45 }}
                          selectedValue={this.state.timezone}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({ timezone: itemValue })
                          }>
                          {timeZone.map((data) => {
                            return (
                              <Picker.Item label={data.zonevalue} value={data.zonevalue} />
                            )
                          })}
                        </Picker>
                      </View>
                    </View>
                    <Text style={styles.errorText}>
                      {this.state.errors.zone}
                    </Text>

                    <Text style={styles.syllabusText}>Timing:</Text>
                    <View style={[styles.formGroup1, { paddingLeft: 0 }]}>
                      <View style={[styles.formSubGroup2, { width: '100%' }]}>
                        <Picker
                          style={{ width: '100%', height: 45 }}
                          selectedValue={this.state.startTime}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({ startTime: itemValue })
                          }>
                          <Picker.Item label="Select time" value="TH" />
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
                    <Text style={styles.errorText}>
                      {this.state.errors.time}
                    </Text>

                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => this.CourseSubmit()}
                      style={[styles.authBtn]}>
                      {this.state.showLoader == false ? (
                        <Text style={styles.authBtnText}>Submit</Text>
                      ) : (
                          <Text style={styles.authBtnText}>
                            <ActivityIndicator
                              size="large"
                              color="#fff"
                              style={CommonStyles.loader}
                            />
                          </Text>
                        )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
            {/* End 10 Class syllabus */}
            <Modal transparent={true} visible={this.state.isModalVisible}>
              <View style={CommonStyles.modalBg}>
                <View style={CommonStyles.modalContent}>
                  <Antdesign name="checkcircle" size={60} color="#71b85f" />
                  <Text style={CommonStyles.modalText}>
                    Successfully Posted
                  </Text>
                  <TouchableOpacity
                    style={CommonStyles.modalCross}
                    onPress={() => this.setState({ isModalVisible: false })}>
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
