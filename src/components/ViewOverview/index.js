import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';
import ApiUrl from '../../config/ApiUrl';
import { makeGetRequest } from '../../services/http-connectors';

class ViewOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiledataset: [],
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
      });
    }
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
            <>
              <Text style={styles.userInfoHead}>Categories</Text>
              <View style={styles.details}>
                {item.category.map((value, i) => (
                  <Text style={styles.userInfoDetails}>{value.label},{"  "}</Text>
                ))}
              </View>
            </>
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
