import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../../../CommonStyles';
import ApiUrl from '../../config/ApiUrl';
import {makeGetRequest} from '../../services/http-connectors';
import base64 from 'base-64';
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

class ViewOverview extends Component {
  constructor() {
    super();
    this.state = {
      profiledataset: [],
      showLoader: false,
      newOverview: [
        {hdng: 'College', details: 'natit solved'},
        {hdng: 'Major', details: 'Computer Science'},
        {hdng: 'Enrolment', details: 'Under Graduate'},
        {hdng: 'Type', details: 'Part timer'},
        {hdng: 'Duration', details: '03 August 2015 - 21 June 2019'},
        {hdng: 'City', details: 'Kolkata'},
        {hdng: 'Categories', details: 'Software Development, Online Coding'},
        {hdng: 'Skills', details: 'C, React js,'},
      ],
    };
  }
  componentDidMount = () => {
    // const { navigation } = this.props;
    // this.focusListener = navigation.addListener('didFocus', () => {
    //   this.FetchOverview();
    // });
    this.FetchOverview();
  };

  FetchOverview = async () => {
    console.log("called");

    this.setState({ showLoader: true });


    let response = await makeGetRequest(ApiUrl.ExpertProfile + base64.decode(this.props.userDeatailResponse.slug), false, body);
    if (response) {
      console.log(response)
      this.setState({
        profiledataset: response,
        urlsocialset: response.map((item) => item.socialurls.map((obj) => obj.socialurl)),
        showLoader: false
      });
      console.log(this.state.profiledataset);
      this.setState({
        urlsocial: this.state.urlsocialset.toString().split(" ,").join(", "),
      });
    }
  };

  gotoEditPage = data => {
    this.props.navigation.navigate('EditProfileScreen', { slugname: this.props.userDeatailResponse.slugname })
  }

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
              {item.category.map((value, i) => (
                <Text style={styles.overviewDetails}>{value.label}</Text>
              ))}
            </View>
            <View key={i} style={styles.newOverviewSec}>
              <Text style={styles.overviewHdng}>Skills</Text>
              {item.skills.map((value, i) => (
                <Text style={styles.overviewDetails}>{value.label}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps, null,)(withNavigation(ViewOverview));
