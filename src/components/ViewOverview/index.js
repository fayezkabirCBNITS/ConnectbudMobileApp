import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { API_URL } from "../../config/url";

class ViewOverview extends Component {
  constructor() {
    super();
    this.state = {
      profiledataset: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    await axios({
      url: API_URL + "expertProfile/" + this.props.slugname,
      method: "GET",
    })
      .then((response) => {
        this.setState({
          profiledataset: response.data,
        });
      })
      .catch(() => { });
  };

  render() {
    return (
      <View style={CommonStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.editBtn} />

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

          {this.state.profiledataset.map((item, i) => (
            <>
              <Text style={styles.skillHead}>Skills</Text>
              <View style={styles.skillSec}>
                {item.skills.map((value, i) => (
                  <View key={i} style={styles.skillTab}>
                    <Text style={styles.skillText}>{value.label}</Text>
                  </View>
                ))}

              </View>
            </>
          ))}

          {this.state.profiledataset.map((item, i) => (
            <View key={i}>
              <Text style={styles.skillHead}>Info</Text>
              <Text style={styles.skillText}>{item.about}</Text>
            </View>
          ))}

        </ScrollView>
      </View>
    );
  }
}

export default ViewOverview;
