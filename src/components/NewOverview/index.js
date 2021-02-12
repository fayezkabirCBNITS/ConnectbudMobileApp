import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../../../CommonStyles';
import ApiUrl from '../../config/ApiUrl';
import { makePostRequestMultipart } from '../../services/http-connectors';
import base64 from 'base-64';
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      profiledataset: [],
      showLoader: false,
      newOverview: [
        { hdng: 'College', details: 'natit solved' },
        { hdng: 'Major', details: 'Computer Science' },
        { hdng: 'Enrolment', details: 'Under Graduate' },
        { hdng: 'Type', details: 'Part timer' },
        { hdng: 'Duration', details: '03 August 2015 - 21 June 2019' },
        { hdng: 'City', details: 'Kolkata' },
        { hdng: 'Categories', details: 'Software Development, Online Coding' },
        { hdng: 'Skills', details: 'C, React js,' },
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

    let body = new FormData();

    //mandatory for fetch
    body.append("id", this.props.userDeatailResponse.row_id);
    body.append("user_id", base64.decode(this.props.userDeatailResponse.user_id));

    //For Edit Intro
    body.append("first_name", "");
    body.append("last_name", "");
    body.append("category", "");
    body.append("skills", "");
    body.append("socialurls", "");

    //for Job
    body.append("experience_id", "");
    body.append("experience", "");
    body.append("description", "");
    body.append("projecturl", "");
    body.append("professionalurls", "");
    body.append("employment_type", "");
    body.append("willing_to_relocate", "");
    body.append("country", "");
    body.append("city", "");
    body.append("resumefile", "");
    body.append("videoresume", "");

    // For Education
    body.append("department", "");
    body.append("title", "");
    body.append("type", "");
    body.append("location", "");
    body.append("startDate", "");
    body.append("endDate", "");
    body.append("community", "");

    //For Portfolio
    body.append("portfolio_id", "")
    body.append("portfolio_name", "");
    body.append("portfolio_des", "");
    body.append("portfolio_category", "");
    body.append("portfolio_link", "");
    body.append("image", "");

    //For Availability
    body.append("date", "");

    let response = await makePostRequestMultipart(ApiUrl.ExpertProfile + base64.decode(this.props.userDeatailResponse.slug), false, body);
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

  gotoEditPage = data => {
    this.props.navigation.navigate('EditProfileScreen', { slugname: this.props.userDeatailResponse.slugname })
  }

  render() {
    return (
      <View style={styles.overview}>
        <View style={CommonStyles.newHdng}>
          <Text style={CommonStyles.newHdngText}>Overview</Text>
          <TouchableOpacity style={CommonStyles.newEditBtn} onPress={this.gotoEditPage}>
            <FontAwesome name="edit" color="#fff" size={16} />
            <Text style={CommonStyles.newEditText}>Edit</Text>
          </TouchableOpacity>
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

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps, null,)(withNavigation(Overview));