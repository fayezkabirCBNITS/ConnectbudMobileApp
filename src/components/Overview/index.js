import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      overview: [
        {name: 'College', details: 'Techno'},
        {name: 'Mejor', details: 'Computer Science'},
        {name: 'Enrolment', details: ''},
        {name: 'Type', details: 'Full timer'},
        {name: 'Duration', details: '28-10-2015 - 17-11-2020'},
        {name: 'City', details: 'Kolkata, India'},
        {name: 'Categories', details: 'Data Entry, Sale and Marketing,'},
      ],
      skill: [
        {name: 'Concentration'},
        {name: 'Fost Typing Speed'},
        {name: 'Microsoft Word'},
        {name: 'Microsoft Excel'},
        {name: 'Blackchain'},
        {name: 'Dta Science'},
        {name: 'Mathematics'},
      ],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={CommonStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.editBtn}>
            <MaterialIcons name="mode-edit" color="#fff" size={18} />
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>

          {this.state.overview.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>{item.name}</Text>
              <Text style={styles.userInfoDetails}>{item.details}</Text>
            </View>
          ))}

          <Text style={styles.skillHead}>Skills</Text>
          <View style={styles.skillSec}>
            {this.state.skill.map((item, i) => (
              <View key={i} style={styles.skillTab}>
                <Text style={styles.skillText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Overview;
