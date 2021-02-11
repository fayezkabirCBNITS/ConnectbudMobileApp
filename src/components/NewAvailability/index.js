import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../../../CommonStyles';
// import CalendarPicker from 'react-native-calendar-picker';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import ApiUrl from '../../config/ApiUrl';
import {makePostRequestMultipart} from '../../services/http-connectors';
import base64 from 'base-64';
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import WeeklyCalendar from 'react-native-weekly-calendar';


class NewAvailability extends Component {
  
  constructor() {
    super();
    this.state = {
      selectedStartDate: null,
      profiledataset: [],
      showLoader: false,
      myEventsList: []
    };
  }
  

  onDateChange = (date) => {
    this.setState({
      selectedStartDate: date,
      dates: [{
        '2021-02-12': {selected: true, marked: true, selectedColor: 'blue'},
        '2021-02-17': {marked: true},
        '2021-02-18': {marked: true, dotColor: 'red', activeOpacity: 0},
        '2021-02-19': {disabled: true, disableTouchEvent: true},
      }]
    });
  };

  componentDidMount = () => {
    // const { navigation } = this.props;
    // this.focusListener = navigation.addListener('didFocus', () => {
    //   this.FetchOverview();
    // });
    this.FetchOverview();
  };

  FetchOverview = async () => {
    console.log("called");

    this.setState({ showLoader: true });

    let body = new FormData();

    //mandatory for fetch
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
    body.append("portfolio_id", "")
    body.append("portfolio_name", "");
    body.append("portfolio_des", "");
    body.append("portfolio_category", "");
    body.append("portfolio_link", "");
    body.append("image", "");

    //For Availability
    body.append("date", "");

    let response = await makePostRequestMultipart(ApiUrl.ExpertProfile + base64.decode(this.props.userDeatailResponse.slug), false, body);
    if (response) {
     await this.setState({
        profiledataset: response[0].dates_availability.map((obj)=> (obj.date)),
        // urlsocialset: response.map((item) => item.socialurls.map((obj) => obj.socialurl)),
        showLoader: false
      });
     await this.setState({
      sampleEvents : [
        { 'start': '2021-02-23 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
        { 'start': '2020-03-24 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
        { 'start': '2020-03-25 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
        { 'start': '2020-03-25 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
        { 'start': '2020-03-25 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
        { 'start': '2020-03-26 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 1' },
        { 'start': '2020-03-26 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
        { 'start': '2020-03-26 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 3' },
        { 'start': '2020-03-26 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
        { 'start': '2020-03-26 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' }
      ]
      });
      console.log(this.state.myEventsList,"goNiYO");
    }
  };

  render() {
    return (
      <View style={{width: '100%'}}>
        <View style={[CommonStyles.newHdng, styles.padHz5]}>
          <Text style={CommonStyles.newHdngText}>Availability</Text>
          <TouchableOpacity style={CommonStyles.newEditBtn}>
            <AntDesign name="plus" color="#fff" size={16} />
            <Text style={CommonStyles.newEditText}>Add</Text>
          </TouchableOpacity>
        </View>
        {/* <CalendarPicker onDateChange={this.onDateChange} 
         selectedDayColor= "2021-02-10"
         selectedDayColor="#71b85f"
         selectedStartDate= "14/02/2021" 
         selectedEndDate = "20/02/2021"/> */}
        {/* <Calendar
          // Collection of dates that have to be marked. Default = {}
          markedDates= {this.state.dates}
          
        /> */}
        <WeeklyCalendar
        events={this.state.sampleEvents} 
        style={{ height: 400 }} />
      </View>
    );
  }
}

// export default NewAvailability;

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps, null,)(withNavigation(NewAvailability));
