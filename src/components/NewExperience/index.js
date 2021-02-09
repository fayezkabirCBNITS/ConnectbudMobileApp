import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';

class NewExperience extends Component {
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
          <Text style={CommonStyles.newHdngText}>Experience</Text>
          <TouchableOpacity style={CommonStyles.newEditBtn}>
            <AntDesign name="plus" color="#fff" size={16} />
            <Text style={CommonStyles.newEditText}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.newOverview.map((item, i) => (
            <View key={i} style={styles.newexperienceSec}>
              <View style={styles.iconSec}>
                <SimpleLineIcons name="briefcase" color="#71b85f" size={25} />
                <View style={styles.lines} />
              </View>
              <View style={styles.deatilsSec}>
                <View>
                  <Text style={styles.experienceHdng}>Project Name</Text>
                  <Text style={styles.experienceDetails}>ConnectBud</Text>
                </View>
                <View>
                  <Text style={styles.experienceHdng}>Project URL</Text>
                  <Text style={styles.experienceDetails}>ConnectBud</Text>
                </View>
                <View>
                  <Text style={styles.experienceHdng}>Project Description</Text>
                  <Text style={styles.experienceDetails}>ConnectBud</Text>
                </View>
                <View>
                  <Text style={styles.experienceHdng}>Additional URL's</Text>
                  <Text style={styles.experienceDetails}>ConnectBud</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default NewExperience;
