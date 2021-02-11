import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './style';
import { Picker } from '@react-native-community/picker';
import ApiUrl from '../../config/ApiUrl';
import { makePostRequestMultipart } from '../../services/http-connectors';
import Spinner from 'react-native-loading-spinner-overlay';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

class ViewWorkHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: [],
      selectedProject: "All",
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    let body = new FormData();
    body.append("hirer_id", "");
    body.append("freelancer_id", "");
    body.append("job_id", "");
    body.append("type", "");
    body.append("page_type", "ongoing");
    body.append("user_id", this.props.freeId);

    let response = await makePostRequestMultipart(ApiUrl.FetchMilestones, false, body);
    if (response) {
      this.setState({
        projectData: response,
      });
    }
  };

  selectType = async (type) => {
    await this.setState({
      selectedProject: type,
    });
    this.filterProject();
  };

  // filterProject = async () => {
  //   this.setState({ showLoader: true })
  //   let body = new FormData();
  //   body.append("hirer_id", "");
  //   body.append("freelancer_id", "");
  //   body.append("job_id", "");
  //   body.append("type", "");
  //   body.append("page_type", "ongoing");
  //   body.append("user_id", this.props.freeId);

  //   let response = await makePostRequestMultipart(ApiUrl.FetchMilestones, false, body);
  //   if (response) {
  //     this.setState({ showLoader: false })
  //     if (response[0].message === "No data found") {
  //       this.setState({
  //         projectData: response
  //       })
  //     } else {
  //       if (this.state.selectedProject === "In Progress") {
  //         if (response.filter(data => data.contract_end === "false")) {
  //           this.setState({
  //             projectData: response.filter(data => data.contract_end === "false"),
  //           });
  //         } else {
  //           this.setState({
  //             projectData: [{ message: "No data found" }],
  //           });
  //         }
  //       } else if (this.state.selectedProject === "Completed") {
  //         if (response.filter(data => data.contract_end === "true")) {
  //           this.setState({
  //             projectData: response.filter(data => data.contract_end === "true"),
  //           });
  //         } else {
  //           this.setState({
  //             projectData: [{ message: "No data found" }],
  //           });
  //         }
  //       } else {
  //         this.setState({
  //           projectData: response,
  //         });
  //       }
  //     }
  //   } else {
  //     this.setState({ showLoader: false })
  //   }
  // };
  render() {
    return (
      <View style={styles.portfolio}>
        <View style={[CommonStyles.newHdng, styles.padHz5]}>
          <Text style={CommonStyles.newHdngText}>Work History</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.projectData.map((item, i) => (
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

export default ViewWorkHistory;
