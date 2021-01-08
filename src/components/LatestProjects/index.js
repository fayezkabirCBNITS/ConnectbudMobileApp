import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { Item } from 'native-base';
import ApiUrl from '../../config/ApiUrl';
import { makePostRequestMultipart } from '../../services/http-connectors';
import { updateJobId } from "../../redux/actions/user-data";
import { connect } from "react-redux";
import { withNavigation } from 'react-navigation';
import Swiper from 'react-native-swiper'

class LatestProjects extends Component {
  constructor() {
    super();
    this.state = {
      projectSet: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {

    let body = new FormData();
    body.append("type", "freelancer");

    let response = await makePostRequestMultipart(ApiUrl.LandingProjects, false, body);
    if (response) {
      this.setState({
        projectSet: response,
      });
    }
  };

  viewProject = (Id) => {
    this.props.updateJobId(Id);
    this.props.navigation.navigate('ProjectDetailsFreelancerNA', { JobId: Id });
  };

  render() {
    return (
      <View style={styles.wrap2}>
        <Swiper
          loop={true}
          showsPagination={false}
          showsButtons
        >
        {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal> */}
          {this.state.projectSet.map((item, i) => (
             <View key={i} style={styles.swiperWrap}>
              <View style={styles.wrap}>
                <View style={styles.imgSec}>
                  <Image
                    source={require('../../assets/images/bnr.jpg')}
                    style={CommonStyles.image}
                  />
                  <View style={styles.priceCircle}>
                    <Text style={styles.priceCircleText}>${item.price_amount}</Text>
                  </View>
                </View>
                <View style={styles.content}>
                  <Text style={styles.hdng}>{item.name}</Text>
                  <Text style={styles.boldText}>{item.category}</Text>
                  <TouchableOpacity style={styles.knowMoreBtn} onPress={() => this.viewProject(item.id)}>
                    <Text style={styles.knowMoreBtnText}>KNOW MORE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        {/* </ScrollView> */}
        </Swiper>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateJobId: (data) => dispatch(updateJobId(data)),
  };
};
export default connect(null, mapDispatchToProps)(withNavigation(LatestProjects));