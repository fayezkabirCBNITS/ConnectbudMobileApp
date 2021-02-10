import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';

class NewWorkHistory extends Component {
  constructor() {
    super();
    this.state = {
      newOverview: [
        {
          name: 'John Doe',
          details: 'natit solved',
          website: 'https://www.connectbud.com',
        },
        {
          name: 'John Doe',
          details: 'natit solved',
          website: 'https://www.connectbud.com',
        },
        {
          name: 'John Doe',
          details: 'natit solved',
          website: 'https://www.connectbud.com',
        },
      ],
    };
  }
  render() {
    return (
      <View style={styles.portfolio}>
        <View style={[CommonStyles.newHdng, styles.padHz5]}>
          <Text style={CommonStyles.newHdngText}>Work History</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.newOverview.map((item, i) => (
            <View key={i} style={styles.newHistorySec}>
              <View style={styles.iconSec}>
                <SimpleLineIcons name="briefcase" color="#71b85f" size={25} />
                <View style={styles.lines} />
              </View>
              <View style={styles.deatilsSec}>
                <View>
                  <Text style={styles.historyHdng}>Project Name</Text>
                  <Text style={styles.historyProjectName}>ConnectBud</Text>
                  <Text style={styles.historyProjectSub}>ConnectBud</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default NewWorkHistory;
