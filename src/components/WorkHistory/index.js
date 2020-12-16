import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './style'

class WorkHistory extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={CommonStyles.container}>
          <Text style={styles.portfolioHead}>Project Details</Text>
        </View>

        <View style={styles.noData}>
          <Image source={require('../../assets/images/noData.png')} />
          <Text style={styles.noDataText}>No Data Found</Text>
        </View>

      </ScrollView>
    );
  }
}

export default WorkHistory;
