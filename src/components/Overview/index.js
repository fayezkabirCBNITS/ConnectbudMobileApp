import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      profiledataset: [],

      skill: [
        {name: 'Concentration'},
        {name: 'Fast Typing Speed'},
        {name: 'Microsoft Word'},
        {name: 'Microsoft Excel'},
        {name: 'Blockchain'},
        {name: 'Data Science'},
        {name: 'Mathematics'},
      ],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    await axios({
      url: 'https://api.connectbud.com/expertProfile/Utkarsh-Sarkar-15',
      method: "GET",
    })
      .then((response) => {
        this.setState({
          profiledataset: response.data,
        });
      })
      .catch(() => {});
  };

  render() {
    return (
      <View style={CommonStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.editBtn}>
            <MaterialIcons name="mode-edit" color="#fff" size={18} />
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>College</Text>
              <Text style={styles.userInfoDetails}>{item.college}</Text>
            </View>
          ))}

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>Major</Text>
              <Text style={styles.userInfoDetails}>{item.department}</Text>
            </View>
          ))}

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>Enrollment</Text>
              <Text style={styles.userInfoDetails}>{item.title}</Text>
            </View>
          ))}

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>Type</Text>
              <Text style={styles.userInfoDetails}>{item.type}</Text>
            </View>
          ))}

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>Duration</Text>
              <Text style={styles.userInfoDetails}>
                {item.startDateFormat} - {item.endDateFormat}
              </Text>
            </View>
          ))}

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>City</Text>
              <Text style={styles.userInfoDetails}>{item.location}</Text>
            </View>
          ))}

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>Categories</Text>
              {item.category.map((item) => (
                <Text style={styles.userInfoDetails}>{item.label}</Text>
              ))}
            </View>
          ))}

          <Text style={styles.skillHead}>Skills</Text>
          <View style={styles.skillSec}>
            {this.state.profiledataset.map((item, i) => (
              <>
                {item.skills.map((value, i) => (
                  <View key={i} style={styles.skillTab}>
                    <Text style={styles.skillText}>{value.label}</Text>
                  </View>
                ))}
              </>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Overview;
