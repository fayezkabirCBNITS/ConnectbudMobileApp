import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../../../CommonStyles';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      newOverview: [
        {hdng: 'College', details: 'natit solved'},
        {hdng: 'Major', details: 'Computer Science'},
        {hdng: 'Enrolment', details: 'Under Graduate'},
        {hdng: 'Type', details: 'Part timer'},
        {hdng: 'Duration', details: '03 August 2015 - 21 June 2019'},
        {hdng: 'City', details: 'Kolkata'},
        {hdng: 'Categories', details: 'Software Development, Online Coding'},
        {hdng: 'Skills', details: 'C, React js,'},
      ],
    };
  }
  render() {
    return (
      <View style={styles.overview}>
        <View style={CommonStyles.newHdng}>
          <Text style={CommonStyles.newHdngText}>Overview</Text>
          <TouchableOpacity style={CommonStyles.newEditBtn}>
            <FontAwesome name="edit" color="#fff" size={16} />
            <Text style={CommonStyles.newEditText}>Edit</Text>
          </TouchableOpacity>
        </View>
        {this.state.newOverview.map((item, i) => (
          <View key={i} style={styles.newOverviewSec}>
            <Text style={styles.overviewHdng}>{item.hdng}</Text>
            <Text style={styles.overviewDetails}>{item.details}</Text>
          </View>
        ))}
      </View>
    );
  }
}

export default Overview;
