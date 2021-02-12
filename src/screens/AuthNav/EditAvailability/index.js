import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ErrorMsg from '../../../components/ErrorMsg';
import moment from 'moment';
import axios from "axios";
import { API_URL } from "../../../config/url";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import base64 from 'base-64';

class EditAvailabilityScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      selectedDate: [],
      errselectedDate: false,
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = async (date) => {
    if (this.state.selectedDate.includes(moment(date).format('MM/DD/YYYY')) == false) {
      await this.setState({
        selectedDate: [
          ...this.state.selectedDate,
          moment(date).format('MM/DD/YYYY'),
        ],
      });
    } else { }
    this.hideDateTimePicker();
  };

  handleSubmit = async () => {
    if (this.state.selectedDate === '') {
      this.setState({ errselectedDate: true });
      return;
    } else {
      this.setState({
        errselectedDate: false
      });
      const date = JSON.stringify(this.state.selectedDate).replace(
        /[\[\]']+/g,
        '',
      );

      let body = new FormData();
      body.append("id", this.props.userDeatailResponse.row_id);
      body.append("user_id", base64.decode(this.props.userDeatailResponse.user_id));

      //For Edit Intro
      body.append("first_name", "");
      body.append("last_name", "");
      body.append("category", "");
      body.append("skills", "");
      body.append("socialurls", "");

      //for Job
      body.append("experience_id", "");
      body.append("experience", "");
      body.append("description", "");
      body.append("projecturl", "");
      body.append("professionalurls", "");
      body.append("employment_type", "");
      body.append("willing_to_relocate", "");
      body.append("country", "");
      body.append("city", "");
      body.append("resumefile", "");
      body.append("device", "web");
      body.append("videoresume", "");

      // For Education
      body.append("department", "");
      body.append("title", "");
      body.append("type", "");
      body.append("location", "");
      body.append("startDate", "");
      body.append("endDate", "");
      body.append("community", "");

      //For Portfolio
      body.append("portfolio_id", "");
      body.append("portfolio_name", "");
      body.append("portfolio_des", "");
      body.append("portfolio_category", "");
      body.append("portfolio_link", "");
      body.append("image", "");

      //For Availability
      body.append("date", date.replace(/['"]+/g, ''));
      
      await axios
        .post(
          API_URL +
          "expertProfile/" +
          base64.decode(this.props.userDeatailResponse.slug),
          body
        )
        .then((res) => {
          this.props.navigation.navigate('ProfileScreen')
        });
    }
  };

  render() {
    return (
      <View style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar
            backgroundColor="#60a84e"
            barStyle="light-content"
            hidden={false}
            translucent={false}
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={40}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.headerText}>Edit Availability</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <Text style={styles.hdng}>Select your available dates</Text>

              <DateTimePickerModal
                mode="date"
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                minimumDate={new Date()}
              />

              <View style={styles.fieldHead}>
                <View style={styles.dateField}>
                  {this.state.selectedDate.length > 0 &&
                    this.state.selectedDate ? (
                      this.state.selectedDate.map((dt, i) => (
                        <Text style={styles.dateText} key={i}>
                          {JSON.stringify(dt).replace(/[\[\]']+/g, '')}
                        </Text>
                      ))
                    ) : (
                      <Text style={styles.dateText}>Select Date</Text>
                    )}
                </View>
                <View style={styles.calenderIcon}>
                  <TouchableOpacity onPress={this.showDateTimePicker}>
                    <FontAwesome
                      name="calendar"
                      size={25}
                      color="rgba(0,0,0,0.5)"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {this.state.errstartDate === true ? (
                <ErrorMsg errorMsg="*Please select the dates" />
              ) : (
                  <></>
                )}

              <View style={styles.buttonSec}>
                {/* <TouchableOpacity style={styles.cancelBtn}>
                  <Text style={styles.btnText}>CANCEL</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.updateBtn} onPress={() => this.handleSubmit()}>
                  <Text style={styles.btnText}>UPDATE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps)(withNavigation(EditAvailabilityScreen));
