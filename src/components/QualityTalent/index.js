import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Button, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import ApiUrl from '../../config/ApiUrl';
import { makePostRequestMultipart } from '../../services/http-connectors';
import { updateViewProfile } from "../../redux/actions/user-data";
import { connect } from "react-redux";
import { withNavigation } from 'react-navigation';
// const screenWidth = Dimensions.get('window').width;
import Swiper from 'react-native-swiper'
class QualityTalent extends Component {
  constructor() {
    super();
    this.state = {
      expertset: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {

    let body = new FormData();
    body.append("user_id", "");

    let response = await makePostRequestMultipart(ApiUrl.FeedExpertlist, false, body);
    if (response) {
      this.setState({
        expertset: response,
      });
    }
  };

  viewProfile = async (slug, user_id) => {
    this.props.updateViewProfile(slug, user_id);
    this.props.navigation.navigate('ViewUserProfileScreen', { username: slug, user_id: user_id });
  };

//   onPress = (index) => {
//     this.scroll.scrollTo({x: index * screenWidth, y: 0, animated: true})
//  }
 


  render() {
    return (
      <>
      <View style={styles.wrap}>
        <Swiper
          loop={true}
          showsPagination={false}
          showsButtons
        >
          {this.state.expertset.map((value, i) => (
            
            <View key={i} style={styles.swiperWrap}>
            <TouchableOpacity  style={styles.main} onPress={() => this.viewProfile(value.slug, value.user_id)}>
              <View style={styles.image}>
                <Image
                  source={{ uri: value.user_image }}
                  style={CommonStyles.image}
                />
              </View>
              <View style={styles.des}>
                <Text style={styles.name}>{value.expert_Name}</Text>
                <Text style={styles.designation}>{value.collegeName}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))}
        </Swiper>
      </View>


      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateViewProfile: (slug, user_id) => dispatch(updateViewProfile(slug, user_id)),
  };
};
export default connect(null, mapDispatchToProps)(withNavigation(QualityTalent));
