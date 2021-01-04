import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../../components/Header';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';
import { updateJobId } from '../../../redux/actions/user-data';
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequestMultipart } from '../../../services/http-connectors';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

class ProjectDetailsFreelancerNA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobDetails: [],
      showLoader: false
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    const { params } = this.props.navigation.state;
    console.log(params);
    this.setState({ showLoader: true });

    let body = new FormData();

    body.append('job_id', params.JobId);
    body.append('user_id', '');
    body.append('type', 'freelancer');

    let response = await makePostRequestMultipart(ApiUrl.LandingProjectDetails, false, body);
    if (response) {
      this.setState({
        jobDetails: response,
        showLoader: false
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={[CommonStyles.safeAreaView, styles.bgColorWhite]}>
        <View style={[CommonStyles.main, styles.bgColorWhite]}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <StatusBar
            backgroundColor="#60a84e"
            barStyle="light-content"
            hidden={false}
            translucent={false}
          />
          <View style={CommonStyles.header}>
            <TouchableOpacity style={CommonStyles.hambarIcon} onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
          </View>

          {/* <Header /> */}
          <View style={[CommonStyles.container, styles.bgColorWhite]}>
            <ScrollView
              style={styles.scrolling}
              showsVerticalScrollIndicator={false}>
              {this.state.jobDetails.map((value, i) => (
                <View style={styles.boxWrapper}>
                  <Text style={styles.boxTitle}>{value.job_title}</Text>
                  <Text style={styles.daysAgo}>{value.posted_date}</Text>
                  <Text style={styles.courseDetails}>Project Details</Text>
                  <Text>
                    <Text style={styles.textSemibold}>Course Amount :</Text>{' '}
                    <Text> {value.price_amount} USD</Text>
                  </Text>
                  {/* <Text>
                  <Text style={styles.textSemibold}> Course Duration : </Text>{' '}
                  <Text></Text> month
                </Text>
                <Text>
                  <Text style={styles.textSemibold}> Course Date : </Text>{' '}
                  <Text>2020-12-16</Text>
                </Text> */}
                  <Text>
                    <Text style={styles.textSemibold}>Course Syllabus :</Text>{' '}
                    <Text style={styles.syllabusText}>{value.description}</Text>
                  </Text>
                  <TouchableOpacity style={styles.applyBtn}>
                    <Text style={styles.applyBtnText} onPress={() => this.props.navigation.navigate('SignInScreen', { userType: 'student'})}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateJobId: (data) => dispatch(updateJobId(data)),
  };
};

export default connect(mapStateToProps, mapDispatch)(ProjectDetailsFreelancerNA);
