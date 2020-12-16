import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';

class HireTutor extends Component {
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
            <Text>Hire Tutor</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default HireTutor;
