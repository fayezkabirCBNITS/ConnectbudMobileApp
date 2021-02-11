import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import ApiUrl from '../../config/ApiUrl';
import {makePostRequestMultipart} from '../../services/http-connectors';
import base64 from 'base-64';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

class NewWorkHistory extends Component {
  constructor() {
    super();
    this.state = {
      profiledataset: [],
      showLoader: false,
    };
  }
  componentDidMount = async () => {
    let body = new FormData();
    body.append('hirer_id', '');
    body.append('freelancer_id', '');
    body.append('job_id', '');
    body.append('type', '');
    body.append('page_type', 'ongoing');
    body.append(
      'user_id',
      base64.decode(this.props.userDeatailResponse.user_id),
    );

    let response = await makePostRequestMultipart(
      ApiUrl.FetchMilestones,
      false,
      body,
    );
    if (response) {
      this.setState({
        profiledataset: response,
      });
      console.log(response);
    }
  };
  render() {
    return (
      <View style={styles.portfolio}>
        <View style={[CommonStyles.newHdng, styles.padHz5]}>
          <Text style={CommonStyles.newHdngText}>Work History</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.newHistorySec}>
              <View style={styles.iconSec}>
                <SimpleLineIcons name="briefcase" color="#71b85f" size={25} />
                <View style={styles.lines} />
              </View>
              <View style={styles.deatilsSec}>
                <View>
                  <Text style={styles.historyHdng}>Project Name</Text>
                  <Text style={styles.historyProjectName}>{item.job_name}</Text>
                  <Text style={styles.historyProjectName}>
                    {item.job_description}
                  </Text>
                  {item.details.map((value, i) => {
                    if (i < 1){
                      return(
                      <Text style={styles.historyProjectSub}>
                        {value.start_date} - {value.end_date}
                      </Text>);
                    }
                  })}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

// export default NewWorkHistory;

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps, null)(withNavigation(NewWorkHistory));
