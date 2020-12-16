import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';

class StudentProject extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={CommonStyles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text>Projects</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default StudentProject;
