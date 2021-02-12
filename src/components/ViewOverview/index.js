import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';
import ApiUrl from '../../config/ApiUrl';
import { makeGetRequest } from '../../services/http-connectors';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class ViewOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiledataset: [],
      showLoader: false,
      urlsocialset: "",
      urlsocial: ""
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    let response = await makeGetRequest(ApiUrl.ExpertProfile + this.props.slugname, false, "");
    if (response) {
      this.setState({
        profiledataset: response,
        urlsocialset: response.map((item) => item.socialurls.map((obj) => obj.socialurl)),
        showLoader: false
      });
      this.setState({
        urlsocial: this.state.urlsocialset.toString().split(" ,").join(", "),
      });
    }
  };

  render() {
    return (
      <View style={styles.overview}>
        <View style={CommonStyles.newHdng}>
          <Text style={CommonStyles.newHdngText}>Overview</Text>
        </View>
        {this.state.profiledataset.map((item, i) => (
          <View>
            <View key={i} style={styles.newOverviewSec}>
              <Text style={styles.overviewHdng}>College</Text>
              <Text style={styles.overviewDetails}>{item.college}</Text>
            </View>
            <View key={i} style={styles.newOverviewSec}>
              <Text style={styles.overviewHdng}>Major</Text>
              <Text style={styles.overviewDetails}>{item.department}</Text>
            </View>
            <View key={i} style={styles.newOverviewSec}>
              <Text style={styles.overviewHdng}>Enrolment</Text>
              <Text style={styles.overviewDetails}>{item.title}</Text>
            </View>
            <View key={i} style={styles.newOverviewSec}>
              <Text style={styles.overviewHdng}>Type</Text>
              <Text style={styles.overviewDetails}>{item.type}</Text>
            </View>
            <View key={i} style={styles.newOverviewSec}>
              <Text style={styles.overviewHdng}>Duration</Text>
              <Text style={styles.overviewDetails}>{item.startDateFormat} - {item.endDateFormat}</Text>
            </View>
            <View key={i} style={styles.newOverviewSec}>
              <Text style={styles.overviewHdng}>City</Text>
              <Text style={styles.overviewDetails}>{item.location}</Text>
            </View>
            <View key={i} style={styles.newOverviewSec}>
              <Text style={styles.overviewHdng}>Categories</Text>
              <View style={styles.wid65}>
              {item.category.map((value, i) => (
                <Text style={styles.overviewDetails2}>{value.label}</Text>
              ))}
            </View>
            </View>
            <View key={i} style={styles.newOverviewSec}>
              <Text style={styles.overviewHdng}>Skills</Text>
              <View style={styles.wid65}>
              {item.skills.map((value, i) => (
                <Text style={styles.overviewDetails2}>{value.label}</Text>
              ))}
            </View>
          </View>
          </View>
        ))}
      </View>
    );
  }
}

export default ViewOverview;
