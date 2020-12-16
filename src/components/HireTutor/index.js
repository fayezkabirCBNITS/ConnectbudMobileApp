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
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {Picker} from '@react-native-community/picker';


class HireTutor extends Component {
  constructor() {
    super();
    this.state = {
      startDate: '',
      subjectValue: '',
      gradeValue: '',
      showDatePicker:false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={CommonStyles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <Text style={styles.inputHead}>What type of session is it</Text>

            <View
              style={[
                styles.formSubGroup2,
                {flexWrap: 'wrap', flexDirection: 'row'},
              ]}>
              <View style={[styles.skillTab, {backgroundColor: '#71b85f'}]}>
                <Text style={[styles.skillText, {color: '#fff'}]}>
                  Online class & Tutorial
                </Text>
              </View>
              <View style={styles.skillTab}>
                <Text style={styles.skillText}>HomeWork Help</Text>
              </View>
            </View>

            <Text style={styles.inputHead}>Select a subject</Text>
            <View style={styles.formGroup1}>
              <View style={[styles.formSubGroup2, {width: '100%'}]}>
                <Picker
                  style={{width: '100%', height: 45}}
                  selectedValue={this.state.subjectValue}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({subjectValue: itemValue})
                  }>
                  <Picker.Item label="Select Subject" value="TH" />
                  <Picker.Item label="Subject 1" value="PT" />
                  <Picker.Item label="Subject 2" value="PT" />
                  <Picker.Item label="Subject 3" value="PT" />
                </Picker>
              </View>
            </View>

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
                  <Picker.Item label="A+" value="TH" />
                  <Picker.Item label="A" value="PT" />
                  <Picker.Item label="B+" value="TH" />
                  <Picker.Item label="B" value="PT" />
                </Picker>
              </View>
            </View>

            <Text style={styles.inputHead}>Hire By</Text>

            <View
              style={[
                styles.formSubGroup2,
                {flexWrap: 'wrap', flexDirection: 'row'},
              ]}>
              <View style={styles.skillTab}>
                <Text style={styles.skillText}>ConnectBud</Text>
              </View>
              <View style={[styles.skillTab, {backgroundColor: '#71b85f'}]}>
                <Text style={[styles.skillText, {color: '#fff'}]}>
                  Choose your own
                </Text>
              </View>
            </View>

            <Text style={styles.inputHead}>When is it</Text>

            <Text style={styles.inputHead2}>Date</Text>
            {this.state.showDatePicker === true ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                placeholder='Select Date'
                mode={'date'}
                is24Hour={true}
                display="default"
              />
            ) : (
              <></>
            )}

            <View style={styles.formGroup1}>
              <View style={[styles.formSubGroup2,{height:45}]}>
              <Text style={styles.inputHead2}>{this.state.startDate}</Text>
              </View>
              <View style={styles.formSubGroup1} >
               <TouchableOpacity onPress={() =>this.setState({showDatePicker:!this.state.showDatePicker})}>
               <FontAwesome name="calendar" size={25} color="#d7d7d8"  />
               </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.inputHead2}>Time</Text>

            <View style={styles.formGroup1}>
              <View style={[styles.formSubGroup2, {width: '100%'}]}>
                <Picker
                  style={{width: '100%', height: 45}}
                  selectedValue={this.state.typeValue}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({typeValue: itemValue})
                  }>
                  <Picker.Item label="Start Time" value="ST" />
                  <Picker.Item label="End Time" value="PT" />
                </Picker>
              </View>
            </View>
            <View style={styles.formGroup1}>
              <View style={[styles.formSubGroup2, {width: '100%'}]}>
                <Picker
                  style={{width: '100%', height: 45}}
                  selectedValue={this.state.typeValue}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({typeValue: itemValue})
                  }>
                  <Picker.Item label="End Time" value="PT" />
                  <Picker.Item label="Start Time" value="ST" />
                </Picker>
              </View>
            </View>
            <Text style={styles.inputHead2}>Total Cost</Text>

            <View style={styles.formGroup1}>
              <View style={styles.formSubGroup2}>
                <TextInput
                  returnKeyType="done"
                  placeholder="180.00"
                  style={styles.inputGroup}
                  keyboardType="default"
                />
              </View>
              <View style={styles.formSubGroup1}>
                <FontAwesome name="dollar" size={25} color="#d7d7d8" />
              </View>
            </View>

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
        </ScrollView>
      </View>
    );
  }
}

export default HireTutor;
