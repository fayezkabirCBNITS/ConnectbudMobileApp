import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../../../CommonStyles';
import CalendarPicker from 'react-native-calendar-picker';

class NewAvailability extends Component {
  constructor() {
    super();
    this.state = {
      selectedStartDate: null,
    };
  }

  onDateChange = (date) => {
    this.setState({
      selectedStartDate: date,
    });
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
        <CalendarPicker onDateChange={this.onDateChange} />
      </View>
    );
  }
}

export default NewAvailability;
