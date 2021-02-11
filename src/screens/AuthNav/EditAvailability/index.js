import React, {Component} from 'react';
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

class EditAvailabilityScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
    };
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.hideDateTimePicker();
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
              />

              <View style={styles.fieldHead}>
                <View style={styles.dateField}>
                  <Text style={styles.dateText}>Select Date</Text>
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

              <View style={styles.buttonSec}>
                <TouchableOpacity style={styles.cancelBtn}>
                  <Text style={styles.btnText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.updateBtn}>
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

export default EditAvailabilityScreen;
