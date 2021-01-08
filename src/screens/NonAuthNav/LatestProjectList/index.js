import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import StatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from "axios";
import { API_URL } from "../../../config/url";

import { updateJobId } from "../../../redux/actions/user-data";
import { connect } from "react-redux";
import { withNavigation } from 'react-navigation';

class LatestProjectList extends Component {
  constructor() {
    super();
    this.state = {
      projectList: [],
    };
  }
  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () =>{
    const {params} = this.props.navigation.state;
    let body = new FormData();
    body.append('user_id', '1222');
    body.append('type', params.tagName === 'Homework' ? 'tutor' : 'freelancer');
    body.append('relevant', '');
    body.append('search_type', 'filter');
    body.append('category', params.tagName);
    body.append('latest', '');
    body.append('low_price', '');
    body.append('high_price', '');
    body.append('country', '');
    body.append('offset', '30');

    await axios.post(API_URL + 'expert_jobsummary',body).then(async (res) => {
      console.log('resssss==>',res)
      this.setState({
        projectList: res.data,
      });
    });
  }

  viewProject = (Id) => {
    this.props.updateJobId(Id);
    this.props.navigation.navigate('ProjectDetailsFreelancerNA', { JobId: Id });
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar />
          {/* header section */}
          <View style={CommonStyles.header}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
            {/* <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NotificationScreen')
              }
              style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity> */}
          </View>
          {/* header section end */}
          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              {
                this.state.projectList.map((item, idx) => (
                  <View style={styles.card} key={idx}>
                    <View style={styles.timeSec}>
                      <Entypo
                        name="back-in-time"
                        color="rgba(0,0,0,0.4)"
                        size={15}
                      />
                      <Text style={styles.time}>{item.posted_date}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.hdng}>
                        {item.job_title}
                      </Text>
                      <TouchableOpacity style={styles.applyBtn} onPress={() => this.viewProject(item.id)}>
                        <Text style={styles.applyBtnText}>Apply</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.details}>
                      {item.description}
                    </Text>
                    <View style={[styles.flexstyle, styles.moneyContainer]}>
                      <Text style={styles.usdText}>{item.price_amount} {item.price_unit}</Text>
                      <Text style={styles.inrtxt}>{item.price_amount * 75} INR</Text>
                    </View>
                  </View>
                ))
              }
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
// export default LatestProjectList;

const mapDispatchToProps = (dispatch) => {
  return {
    updateJobId: (data) => dispatch(updateJobId(data)),
  };
};
export default connect(null, mapDispatchToProps)(withNavigation(LatestProjectList));
