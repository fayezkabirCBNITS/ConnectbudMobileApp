import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../../../CommonStyles';
// import CalendarPicker from 'react-native-calendar-picker';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import ApiUrl from '../../config/ApiUrl';
import { makePostRequestMultipart } from '../../services/http-connectors';
import base64 from 'base-64';
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import WeeklyCalendar from 'react-native-weekly-calendar';
import axios from 'axios';
import { API_URL } from "../../config/url";


class NewAvailability extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      profiledataset: [],
      showLoader: false,
      myEventsList: [],
      sampleEvents: []
    };
  }


  // componentWillReceiveProps = () => {
  //   this.setState({
  //     AvailableDates: this.props.dates
  //   })
  // };

  gotoAddAvailibility = () => {
    this.props.navigation.navigate('EditAvailabilityScreen')
  }

  render() {
    return (
      <View style={{ width: '100%' }}>
        <View style={[CommonStyles.newHdng, styles.padHz5]}>
          <Text style={CommonStyles.newHdngText}>Availability</Text>
          <TouchableOpacity style={CommonStyles.newEditBtn} onPress={this.gotoAddAvailibility}>
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
        <View>
          <WeeklyCalendar
            events={this.props.dates}
            // style={{ height: 600 }}
             />
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
export default connect(mapStateToProps, null,)(withNavigation(NewAvailability));
